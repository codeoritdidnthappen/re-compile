import { useMemo, useState } from "react"
import report from "./weekly.data.json"

const Weekly = () => {
  const [sortConfig, setSortConfig] = useState({ key: "state", direction: "asc" })
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

  const weeks = useMemo(() => {
    if (!report || report.length === 0) return []
    return [...new Set(report.map(item => item.week))].sort()
  }, [])

  const currentWeek = weeks[currentWeekIndex] || null
  console.log("currentWeek", currentWeek)

  const filteredReport = useMemo(() => {
    if (!report || report.length === 0 || !currentWeek) return []
    console.log("filteredReport", "report:", report, "currentWeek:", currentWeek, report.filter(item => item.week === currentWeek)[0].week.data)
    return report.filter(item => item.week === currentWeek)[0].week.data
  }, [currentWeek])

  const fields = useMemo(() => {
    if (!filteredReport || filteredReport.length === 0) return []
    console.log("fields", Object.keys(filteredReport[0]))
    return Object.keys(filteredReport[0])
  }, [filteredReport])

  const sortedReport = useMemo(() => {
    if (!filteredReport || filteredReport.length === 0) return []
    const sortedData = [...filteredReport]
    const { key, direction } = sortConfig
    sortedData.sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      if (aValue === bValue) return 0

      const isNumeric = typeof aValue === "number" && typeof bValue === "number"
      if (isNumeric) {
        return direction === "asc" ? aValue - bValue : bValue - aValue
      }

      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()
      return direction === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString)
    })
    console.log("sortedData", sortedData)
    return sortedData
  }, [sortConfig, filteredReport])

  const toggleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  const goToPreviousWeek = () => {
    setCurrentWeekIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNextWeek = () => {
    setCurrentWeekIndex((prev) => Math.min(weeks.length - 1, prev + 1))
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Weekly Report</h1>
          {/* <p className="text-sm text-base-content/70">Sort any column to inspect weekly state performance metrics.</p> */}
        </div>
      </div>

      <div className="flex justify-center mb-5 mt-3" style={{ gap: "20px" }}>
        <button onClick={goToPreviousWeek} disabled={currentWeekIndex === 0}>
          <svg className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180 text-secondary cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
        </button>
        <h2 className="text-lg text-primary">{currentWeek ? `${currentWeek.startDate} - ${currentWeek.endDate}` : "No data"}</h2>
        <button onClick={goToNextWeek} disabled={currentWeekIndex === weeks.length - 1}>
          <svg className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180 text-secondary cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field} onClick={() => toggleSort(field)} className="cursor-pointer select-none text-secondary">
                {/* {field} {sortConfig.key === field && (sortConfig.direction === "asc" ? "↑" : "↓")} */}
                <span className="flex items-center gap-2">
                    <span className="capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
                    {sortConfig.key === field && (
                      <span className="text-sm opacity-70">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedReport.map((row, idx) => (
            <tr key={idx}>
              {fields.map((field) => {
                console.log(row[field])
                return(
                  <td key={field} className="text-primary">{row[field]}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Weekly