import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { getPrograms } from "../programs/programsSlice"

const YEARS = [2023, 2024, 2025, 2026, 2027]

const ProgramList = () => {
  const dispatch = useDispatch()
  const { programs, loading } = useSelector((state) => state.programs)

  const [year, setYear] = useState(2026)
  const [filterState, setFilterState] = useState("")
  const [filterSite, setFilterSite] = useState("")
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getPrograms({ token, year }))
  }, [year])

  const states = useMemo(() => {
    const set = new Set(programs.map((p) => p.name).filter(Boolean))
    return [...set].sort()
  }, [programs])

  const sites = useMemo(() => {
    const base = filterState ? programs.filter((p) => p.name === filterState) : programs
    const set = new Set(base.flatMap((p) => p.sites ?? []).filter(Boolean))
    return [...set].sort()
  }, [programs, filterState])

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (!showArchived && p.archived) return false
      if (filterState && p.name !== filterState) return false
      if (filterSite && !(p.sites ?? []).includes(filterSite)) return false
      return true
    })
  }, [programs, filterState, filterSite, showArchived])

  const handleStateChange = (e) => {
    setFilterState(e.target.value)
    setFilterSite("")
  }

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Programs</h1>
        <div className="flex gap-2">
          <Link to="/admin/program-list/add" className="btn btn-secondary btn-sm">+ Add Program</Link>
          <Link to="/admin/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="form-control">
          <label className="label pb-2"><span className="label-text text-sm font-semibold">Year</span></label>
          <select
            className="select select-bordered select-sm w-28"
            value={year}
            onChange={(e) => { setYear(Number(e.target.value)); setFilterState(""); setFilterSite("") }}
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label pb-2"><span className="label-text text-sm font-semibold">State</span></label>
          <select
            className="select select-bordered select-sm w-44"
            value={filterState}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label pb-2"><span className="label-text text-sm font-semibold">Site</span></label>
          <select
            className="select select-bordered select-sm w-48"
            value={filterSite}
            onChange={(e) => setFilterSite(e.target.value)}
          >
            <option value="">All Sites</option>
            {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer self-end pb-1">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
          />
          <span className="text-sm">Show archived</span>
        </label>

        {(filterState || filterSite) && (
          <button
            className="btn btn-ghost btn-sm self-end"
            onClick={() => { setFilterState(""); setFilterSite("") }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-sm text-base-content/60 mb-3">{filtered.length} program{filtered.length !== 1 ? "s" : ""}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-base-content/50">No programs match the current filters.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>State / Name</th>
                <th>Abbr.</th>
                <th>Sites</th>
                <th>Applied</th>
                <th>Accepted</th>
                <th>Completed</th>
                <th>Jobs</th>
                <th>Tech Jobs</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover">
                  <td>
                    <Link to={`/admin/program-list/${p.id}`} className="link link-primary font-semibold">
                      {p.name}
                    </Link>
                    {p.archived && <span className="badge badge-neutral badge-sm ml-2">Archived</span>}
                  </td>
                  <td className="font-mono text-sm">{p.abbreviation || "—"}</td>
                  <td className="text-sm">{p.sites?.map((s, i) => i < p.sites.length - 1 ? `${s.name}, ` : s.name)}</td>
                  <td>{p.applied ?? "—"}</td>
                  <td>{p.accepted ?? "—"}</td>
                  <td>{p.completed ?? "—"}</td>
                  <td>{p.jobs ?? "—"}</td>
                  <td>{p.techJobs ?? "—"}</td>
                  <td>
                    <Link to={`/admin/program-list/${p.id}/edit`} className="btn btn-ghost btn-xs">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProgramList
