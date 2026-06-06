#!/usr/bin/env node
/**
 * convertAttendance.js
 *
 * Converts a Whetstone-format attendance .xlsx (or .csv) file into structured JSON.
 *
 * Usage:
 *   node convertAttendance.js <input-file> [output-file] [--months "January 2026,February 2026,..."]
 *
 * Examples:
 *   node convertAttendance.js "Whetstone Attendance Report.xlsx"
 *   node convertAttendance.js "Whetstone Attendance Report.xlsx" output.json
 *   node convertAttendance.js "Whetstone Attendance Report.xlsx" output.json --months "January 2026,March 2026"
 *
 * Dependencies:
 *   npm install xlsx
 */

// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
import XLSX from "xlsx"
import fs from "fs"
import path from "path"

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
if (!args.length || args[0] === "--help" || args[0] === "-h") {
  console.log(
    "Usage: node convertAttendance.js <input-file> [output-file] [--months \"Jan 2026,Feb 2026\"]"
  );
  process.exit(0);
}

const inputFile = args[0];
let outputFile = null;
let targetMonths = null; // null = all sheets that look like "Month YYYY"

for (let i = 1; i < args.length; i++) {
  if (args[i] === "--months" && args[i + 1]) {
    targetMonths = args[i + 1].split(",").map((s) => s.trim());
    i++;
  } else if (!args[i].startsWith("--")) {
    outputFile = args[i];
  }
}

if (!fs.existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Load workbook
// ---------------------------------------------------------------------------
const ext = path.extname(inputFile).toLowerCase();
let workbook;

if (ext === ".csv") {
  // For CSV, wrap in a single-sheet workbook
  workbook = XLSX.readFile(inputFile, { type: "file", raw: false });
} else {
  workbook = XLSX.readFile(inputFile, { type: "file", cellDates: true, raw: false });
}

// ---------------------------------------------------------------------------
// Determine which sheets to process
// ---------------------------------------------------------------------------
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const MONTH_RE = new RegExp(`^(${MONTH_NAMES.join("|")})\\s+\\d{4}$`, "i");

const sheetsToProcess = targetMonths
  ? targetMonths
  : workbook.SheetNames.filter((n) => MONTH_RE.test(n));

if (!sheetsToProcess.length) {
  console.error("No matching sheets found. Use --months to specify sheet names.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helper: get cell value by address, returning null if empty
// ---------------------------------------------------------------------------
function cellVal(sheet, address) {
  const cell = sheet[address];
  if (!cell) return null;
  // For dates, return the JS Date object
  if (cell.t === "d") return cell.v;
  return cell.v ?? null;
}

// ---------------------------------------------------------------------------
// Helper: scan a row for the first cell whose value matches a string,
// then return the value offset columns to the right.
// ---------------------------------------------------------------------------
function findValueAfterLabel(sheet, rowNum, label, maxCols = 30) {
  for (let col = 1; col <= maxCols; col++) {
    const addr = XLSX.utils.encode_cell({ r: rowNum - 1, c: col - 1 });
    const v = cellVal(sheet, addr);
    if (typeof v === "string" && v.trim() === label) {
      // Look right for a non-empty value
      for (let offset = 1; offset <= 6; offset++) {
        const nAddr = XLSX.utils.encode_cell({ r: rowNum - 1, c: col - 1 + offset });
        const nv = cellVal(sheet, nAddr);
        if (nv !== null && nv !== "") return nv;
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Helper: parse "City, ST 12345" → { city, state, zip }
// ---------------------------------------------------------------------------
function parseCityState(raw) {
  if (!raw) return { city: null, state: null, zip: null };
  const str = String(raw).trim();
  const commaIdx = str.indexOf(",");
  if (commaIdx === -1) return { city: str, state: null, zip: null };
  const city = str.slice(0, commaIdx).trim();
  const rest = str.slice(commaIdx + 1).trim().split(/\s+/);
  return {
    city,
    state: rest[0] || null,
    zip: rest[1] || null,
  };
}

// ---------------------------------------------------------------------------
// Helper: format a JS Date or Excel date serial → "YYYY-MM-DD"
// ---------------------------------------------------------------------------
function formatDate(d) {
  if (!d) return null;
  if (d instanceof Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  // Numeric serial (shouldn't happen with cellDates:true, but just in case)
  if (typeof d === "number") {
    const parsed = XLSX.SSF.parse_date_code(d);
    if (parsed) {
      return `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
    }
  }
  return String(d);
}

// ---------------------------------------------------------------------------
// Helper: title-case a string
// ---------------------------------------------------------------------------
function toTitleCase(str) {
  if (!str) return str;
  return String(str)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Core sheet parser
// ---------------------------------------------------------------------------
function parseSheet(sheet) {
  // -- Metadata rows 2-5 --
  const instructor  = cellVal(sheet, "B2");
  const ta          = cellVal(sheet, "B3");
  const ss          = cellVal(sheet, "B4");
  const crc         = cellVal(sheet, "B5");
  const address     = cellVal(sheet, "D4");
  const cityStateRaw= cellVal(sheet, "D5");
  const location    = parseCityState(cityStateRaw);

  const classDays  = findValueAfterLabel(sheet, 2, "Class Days");
  const classHours = findValueAfterLabel(sheet, 3, "Class Hours");

  // Enrollment values: find "Students" label in row 2, value is 2-4 cols right
  const nStudents     = findValueAfterLabel(sheet, 2, "Students");
  const nAides        = findValueAfterLabel(sheet, 3, "Student Aides");
  const nAdded        = findValueAfterLabel(sheet, 4, "Students Added");
  const nDropped      = findValueAfterLabel(sheet, 5, "Students Dropped");

  // Attendance totals: find "Total Attendees" label in row 2
  const totalAttendees = findValueAfterLabel(sheet, 2, "Total Attendees");
  const totalAbsentees = findValueAfterLabel(sheet, 3, "Total Absentees");
  const totalPossible  = findValueAfterLabel(sheet, 4, "Total Possible");
  let   attendanceRate = findValueAfterLabel(sheet, 5, "Attendance Rate");
  if (typeof attendanceRate === "string") attendanceRate = null; // catch "#DIV/0!"

  const metadata = {
    site: null,
    siteId: null,
    instructor: instructor || null,
    teachingAssistant: ta || null,
    supportSpecialist: ss || null,
    crc: crc || null,
    classDays: classDays || null,
    classHours: classHours || null,
    address: address || null,
    cityState: cityStateRaw || null,
    students: nStudents ?? null,
    studentAides: nAides ?? null,
    studentsAdded: nAdded ?? null,
    studentsDropped: nDropped ?? null,
    totalAttendees: totalAttendees ?? null,
    totalAbsentees: totalAbsentees ?? null,
    totalPossible: totalPossible ?? null,
    attendanceRate: attendanceRate ?? null,
  };

  // -- Row 7: date headers --
  // Scan row 7 for Date cells; record column index → ISO date string
  const dateCols = {}; // colIndex (1-based) → "YYYY-MM-DD"
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");

  for (let col = range.s.c; col <= range.e.c; col++) {
    const addr = XLSX.utils.encode_cell({ r: 6, c: col }); // row 7 = index 6
    const cell = sheet[addr];
    if (!cell) continue;
    if (cell.t === "d" && cell.v instanceof Date) {
      dateCols[col + 1] = formatDate(cell.v); // store as 1-based col
    }
  }

  const dateColKeys = Object.keys(dateCols)
    .map(Number)
    .sort((a, b) => a - b);

  if (!dateColKeys.length) {
    return { metadata, students: [], classDays: [] };
  }

  // -- Find stats rows (search from row 8 downward) --
  let statsRow = null;
  for (let r = 7; r <= range.e.r; r++) {
    const addr = XLSX.utils.encode_cell({ r, c: 3 }); // col D (index 3)
    const v = cellVal(sheet, addr);
    if (typeof v === "string" && v.trim() === "Number of students present") {
      statsRow = r + 1; // 1-based
      break;
    }
  }

  // -- Parse students (rows 8 → statsRow-1) --
  const students = [];
  const studentRowEnd = statsRow ? statsRow - 1 : range.e.r + 1;

  for (let r = 7; r < studentRowEnd; r++) { // r is 0-based
    const lastNameAddr  = XLSX.utils.encode_cell({ r, c: 0 });
    const firstNameAddr = XLSX.utils.encode_cell({ r, c: 1 });
    const docAddr       = XLSX.utils.encode_cell({ r, c: 2 });
    const statusAddr    = XLSX.utils.encode_cell({ r, c: 3 });

    const lastName  = cellVal(sheet, lastNameAddr);
    const firstName = cellVal(sheet, firstNameAddr);
    if (!lastName || !firstName) continue;

    const docRaw = cellVal(sheet, docAddr);
    const docStr = docRaw !== null
      ? String(typeof docRaw === "number" ? Math.round(docRaw) : docRaw)
      : null;

    const status = cellVal(sheet, statusAddr);

    const attendance = {};
    for (const col of dateColKeys) {
      const addr = XLSX.utils.encode_cell({ r, c: col - 1 });
      const v = cellVal(sheet, addr);
      if (v !== null && v !== "") {
        attendance[dateCols[col]] = String(v).trim();
      }
    }

    students.push({
      lastName: toTitleCase(String(lastName)),
      firstName: toTitleCase(String(firstName)),
      docNumber: docStr,
      status: status ? String(status).trim() : null,
      attendance,
    });
  }

  // -- Parse per-day stats and build classDays records --
  const classdayRecords = [];

  if (statsRow) {
    // statsRow is 1-based; convert to 0-based for cell lookup
    const presentR  = statsRow - 1;      // 0-based row for "Number of students present"
    const possibleR = statsRow + 1;       // 0-based row for "Total Possible"

    for (const col of dateColKeys) {
      const c = col - 1; // 0-based column
      const presentAddr  = XLSX.utils.encode_cell({ r: presentR,  c });
      const possibleAddr = XLSX.utils.encode_cell({ r: possibleR, c });

      const present  = Number(cellVal(sheet, presentAddr))  || 0;
      const possible = Number(cellVal(sheet, possibleAddr)) || 0;

      const isSession    = possible > 0;
      const sessionReason = !isSession ? "Holiday" : null;
      const rate = possible > 0 ? parseFloat((present / possible).toFixed(4)) : 0;

      classdayRecords.push({
        className: null,
        classType: null,
        location: {
          city:  location.city,
          state: location.state,
          zip:   location.zip,
        },
        cohort: null,
        classDate: dateCols[col],
        session: isSession,
        sessionReason,
        attendanceTotal: present,
        totalStudents: nStudents ?? 0,
        totalPossibleDaily: possible,
        attendanceRateDaily: rate,
      });
    }
  }

  return { metadata, students, classDays: classdayRecords };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const result = [];

for (const sheetName of sheetsToProcess) {
  if (!workbook.Sheets[sheetName]) {
    console.warn(`Warning: sheet "${sheetName}" not found — skipping.`);
    continue;
  }
  const sheet = workbook.Sheets[sheetName];
  const parsed = parseSheet(sheet);
  result.push({ month: sheetName, ...parsed });
  console.log(
    `Parsed "${sheetName}": ${parsed.students.length} students, ${parsed.classDays.length} class days`
  );
}

const jsonOutput = JSON.stringify(result, null, 2);

if (outputFile) {
  fs.writeFileSync(outputFile, jsonOutput, "utf8");
  console.log(`\nOutput written to: ${outputFile}`);
} else {
  // Default output filename next to the input
  const defaultOut = path.join(
    path.dirname(inputFile),
    path.basename(inputFile, ext) + ".json"
  );
  fs.writeFileSync(defaultOut, jsonOutput, "utf8");
  console.log(`\nOutput written to: ${defaultOut}`);
}