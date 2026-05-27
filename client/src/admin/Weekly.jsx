import { useMemo, useState } from "react"
import report from "./weekly.data.json"

const Weekly = () => {
  const [sortConfig, setSortConfig] = useState({ key: "state", direction: "asc" })

  const fields = useMemo(() => {
    if (!report || report.length === 0) return []
    return Object.keys(report[0])
  }, [])

  const sortedReport = useMemo(() => {
    if (!report || report.length === 0) return []
    const sortedData = [...report]
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
  }, [sortConfig])

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

  const sortArrow = (key) => {
    if (sortConfig.key !== key) return ""
    return sortConfig.direction === "asc" ? " ▲" : " ▼"
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Weekly Report</h1>
        <p className="text-sm text-base-content/70">Sort any column to inspect weekly state performance metrics.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field} className="cursor-pointer select-none text-secondary" onClick={() => toggleSort(field)}>
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
            {sortedReport.map((row, index) => (
              <tr key={`${row.state}-${index}`}>
                {fields.map((field) => (
                  <td key={`${row.state}-${field}`} className="text-primary">{String(row[field])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Weekly