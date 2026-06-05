import { useMemo, useState } from "react"
import { Link } from "react-router"
import report from "./data/weekly.data.json"

const Weekly = () => {
  const [sortConfig, setSortConfig] = useState({ key: "state", direction: "asc" })
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)

  const weeks = useMemo(() => {
    if (!report || report.length === 0) return []
    return [...new Set(report.map(item => item.week))].sort()
  }, [])

  const currentWeek = weeks[currentWeekIndex] || null

  const filteredReport = useMemo(() => {
    if (!report || report.length === 0 || !currentWeek) return []
    return report.filter(item => item.week === currentWeek)[0].week.data
  }, [currentWeek])

  const fields = useMemo(() => {
    if (!filteredReport || filteredReport.length === 0) return []
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

  const downloadCSV = () => {
    if (!sortedReport.length || !currentWeek) return
    const headers = Object.keys(sortedReport[0])
    const escape = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`
    const csv = [headers.join(","), ...sortedReport.map(row => headers.map(h => escape(row[h])).join(","))].join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `weekly-report-${currentWeek.startDate}-${currentWeek.endDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Weekly Report</h1>
        <button className="btn btn-secondary btn-sm" onClick={downloadCSV}>Download CSV</button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button className="btn btn-ghost btn-sm" onClick={goToPreviousWeek} disabled={currentWeekIndex === 0}>
          <svg className="h-5 w-5 fill-current rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
        </button>
        <span className="text-base font-semibold text-secondary">
          {currentWeek ? `${currentWeek.startDate} – ${currentWeek.endDate}` : "No data"}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={goToNextWeek} disabled={currentWeekIndex === weeks.length - 1}>
          <svg className="h-5 w-5 fill-current rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
      </div>

      <p className="text-sm text-base-content/60 mb-3">{sortedReport.length} row{sortedReport.length !== 1 ? "s" : ""}</p>

      {sortedReport.length === 0 ? (
        <div className="text-center py-20 text-base-content/50">No data for this week.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field} onClick={() => toggleSort(field)} className="cursor-pointer select-none">
                    <span className="flex items-center gap-2">
                      <span className="capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
                      {sortConfig.key === field && (
                        <span className="text-xs opacity-60">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedReport.map((row, idx) => (
                <tr key={idx} className="hover">
                  {fields.map((field) => (
                    <td key={field}>
                      {field === "state"
                        ? <Link to={`/admin/programs/${row[field]}`} className="link link-primary font-semibold">{row[field]}</Link>
                        : row[field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Weekly