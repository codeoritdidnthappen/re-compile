import report from "./data/weekly.data.json"

const COLS = [
  { key: "state",                  label: "State" },
  { key: "attendanceRate",         label: "Att%" },
  { key: "modulesCompleted",       label: "Mods" },
  { key: "frontEndCertificates",   label: "FE" },
  { key: "fullStackCertificates",  label: "FS" },
  { key: "jobsStarted",            label: "Jobs" },
]

const WeeklyMiniCard = () => {
  const latestWeek = report[report.length - 1]?.week
  const rows = latestWeek?.data ?? []
  const dateLabel = latestWeek ? `${latestWeek.startDate} – ${latestWeek.endDate}` : ""

  return (
    <div className="card bg-secondary text-secondary-content border-2 border-secondary hover:border-accent">
      <div className="card-body pt-3">
        <h2 className="card-title mx-auto">Weekly Report</h2>
        <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden px-3 pt-2 pb-3 w-68 h-59.5">
          <p className="text-[10px] text-base-content/50 text-center mb-1">{dateLabel}</p>
          <table className="table table-xs w-full">
            <thead>
              <tr>
                {COLS.map(c => (
                  <th key={c.key} className="text-[10px] px-1 py-0.5 text-base-content/70">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {COLS.map(c => (
                    <td key={c.key} className="text-[10px] px-1 py-0.5 text-base-content text-primary">
                      {c.key === "attendanceRate" ? `${row[c.key]}%` : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WeeklyMiniCard
