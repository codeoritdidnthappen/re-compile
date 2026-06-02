import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getAttendanceSite } from "../attendance/attendanceSlice"
// import perryville from "./data/perryville-attendance-report-2026.data.json"
// import cibola from "./data/cibola-attendance-report.data.json"
// import whetstone from "./data/whetstone-attendance-report.data.json"
// import redRock from "./data/red-rock-attendance-report.data.json"
// import fsp from "./data/fsp-attendance-report.data.json"
// import lowell from "./data/lowell-attendance-report.data.json"
// import wakulla from "./data/wakulla-attendance-report.data.json"
// import ncci from "./data/ncci-attendance-report.data.json"
// import leath from "./data/leath-attendance-report.data.json"

const ProgramSite = () => {
  const dispatch = useDispatch()
  const { site } = useParams()
  // const [ selectedMonth, setSelectedMonth ] = useState(Object.keys(attendanceData)[0])
  const [ selectedMonth, setSelectedMonth ] = useState("May 2026")

  const { attendance } = useSelector((state) => state.attendance)

  // const attendance = useMemo(() => {
  //   if (!attendanceData) return null
  //   return attendanceData.find((item) => item.month === selectedMonth) ?? attendanceData[0] ?? null
  // }, [attendanceData, selectedMonth])

  const attendanceDates = useMemo(() => {
    if (!attendance?.students || attendance.students.length === 0) return []
    const firstStudent = attendance.students[0]
    return Object.keys(firstStudent.attendance).sort()
  }, [attendance])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (site) dispatch(getAttendanceSite({ token, site, month: selectedMonth }))
  }, [site, selectedMonth])

  const setHeaderDate = (date) => {
    const headerDate = new Date(date)
    headerDate.setHours(headerDate.getHours() + 7)
    return headerDate
  }

  useEffect(() => {
    console.log("attendance", attendance)
    console.log("bruh why isn't this null")
  }, [attendance])
  

  return (
    <>
      {attendance ? (
        <div className="p-6 bg-base-100">
          <div className="mb-6">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="January 2026">January 2026</option>
              <option value="February 2026">February 2026</option>
              <option value="March 2026">March 2026</option>
              <option value="April 2026">April 2026</option>
              <option value="May 2026">May 2026</option>
            </select>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">{selectedMonth}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="grid grid-cols-2 max-w-4xl stat bg-base-200 rounded-lg p-2 gap-2">

                <div className="text-right space-y-2 text-lg">
                  <p className="">Instructor:</p>
                  <p className="">Teaching Assistant:</p>
                  <p className="">Support Specialist:</p>
                  <p className="">CRC:</p>
                </div>
                <div className="text-left space-y-2 text-lg font-bold">
                  <p className="text-secondary">{attendance.metadata.instructor}</p>
                  <p className="text-secondary">{attendance.metadata.teachingAssistant}</p>
                  <p className="text-secondary">{attendance.metadata.supportSpecialist}</p>
                  <p className="text-secondary">{attendance.metadata.crc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 max-w-4xl stat bg-base-200 rounded-lg p-2 gap-2">
                <div className="text-right space-y-2 text-lg">
                  <p className="">Class Days:</p>
                  <p className="">Class Hours:</p>
                  <p className="">Address:</p>
                  <p className="">City/State:</p>
                </div>
                <div className="text-left space-y-2 text-lg font-bold">
                  <p className="text-secondary">{attendance.metadata.classDays}</p>
                  <p className="text-secondary">{attendance.metadata.classHours}</p>
                  <p className="text-secondary">1234 Main St.</p>
                  <p className="text-secondary"></p>
                </div>
              </div>

              <div className="grid grid-cols-2 max-w-4xl stat bg-base-200 rounded-lg p-2 gap-2">
                <div className="text-right space-y-2 text-lg">
                  <p className="">Students:</p>
                  <p className="">Student Aides:</p>
                  <p className="">Students Added:</p>
                  <p className="">Students Dropped:</p>
                </div>
                <div className="text-left space-y-2 text-lg font-bold">
                  <p className="text-secondary">{attendance.metadata.students}</p>
                  <p className="text-secondary">{attendance.metadata.studentAides}</p>
                  <p className="text-secondary">{attendance.metadata.studentsAdded}</p>
                  <p className="text-secondary">{attendance.metadata.studentsDropped}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 max-w-4xl stat bg-base-200 rounded-lg p-2 gap-2">
                <div className="text-right space-y-2 text-lg">
                  <p className="">Total Attendees:</p>
                  <p className="">Total Absentees:</p>
                  <p className="">Total Possible:</p>
                  <p className="">Attendance Rate:</p>
                </div>
                <div className="text-left space-y-2 text-lg font-bold">
                  <p className="text-secondary">{attendance.metadata.totalAttendees}</p>
                  <p className="text-secondary">{attendance.metadata.totalAbsentees}</p>
                  <p className="text-secondary">{attendance.metadata.totalPossible}</p>
                  <p className="text-secondary">{(attendance.metadata.attendanceRate * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Total Attendees</div>
                <div className="stat-value text-lg">{attendance.metadata.totalAttendees}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Total Absentees</div>
                <div className="stat-value text-lg">{attendance.metadata.totalAbsentees}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Total Possible</div>
                <div className="stat-value text-lg">{attendance.metadata.totalPossible}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Student Aides</div>
                <div className="stat-value text-lg">{attendance.metadata.studentAides}</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm table-bordered w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="sticky left-0 bg-base-200 z-10">Last Name</th>
                  <th className="sticky left-24 bg-base-200 z-10">First Name</th>
                  <th className="sticky left-48 bg-base-200 z-10">DOC #</th>
                  <th className="sticky left-64 bg-base-200 z-10">Status</th>
                  {attendanceDates.map((date) => (
                    <th key={date} className="text-center text-xs">
                      {setHeaderDate(date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendance.students.map((student, idx) => (
                  <tr key={idx} className="hover">
                    <td className="sticky left-0 bg-base-100 z-10 font-semibold">{student.lastName}</td>
                    <td className="sticky left-24 bg-base-100 z-10">{student.firstName}</td>
                    <td className="sticky left-48 bg-base-100 z-10">{student.docNumber}</td>
                    <td className="sticky left-64 bg-base-100 z-10 text-xs">{student.status}</td>
                    {attendanceDates.map((date) => {
                      const attendance = student.attendance[date] || "-"
                      const setColor = (attendance) => {
                        let color = ""
                        switch (attendance) {
                          case "P":
                            color = "bg-green-200"
                            break
                          case "A":
                            color = "bg-red-200"
                            break
                          case "H":
                            color = "bg-sky-200"
                            break
                          case "E":
                            color = "bg-amber-200"
                            break
                          case "R":
                            color = "bg-teal-200"
                            break
                          case "D":
                            color = "bg-blue-200"
                            break
                          case "N":
                            color = "bg-pink-200"
                            break
                          case "S":
                            color = "bg-purple-200"
                            break
                          default:
                            color = "bg-slate-200"
                        }
                        return color
                      }
                      const bgColor = setColor(attendance)
                      return (
                        <td key={date} className={`text-center font-bold ${bgColor}`}>
                          {attendance}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="m-8 text-lg">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-error animate-ping"></div>
            <div className="status status-error"></div>
          </div> There is no data for the selected site.
        </div>
      )}
    </>
  )
}

export default ProgramSite