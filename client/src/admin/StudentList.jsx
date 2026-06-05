import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { getAllStudents } from "../students/studentSlice"

const StudentList = () => {
  const dispatch = useDispatch()
  const { students, loading } = useSelector((state) => state.students)

  const [filterState, setFilterState] = useState("")
  const [filterSite, setFilterSite] = useState("")
  const [filterLastName, setFilterLastName] = useState("")
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllStudents(token))
  }, [])

  const states = useMemo(() => {
    const set = new Set(students.map((s) => s.location?.state).filter(Boolean))
    return [...set].sort()
  }, [students])

  const sites = useMemo(() => {
    const base = filterState ? students.filter((s) => s.location?.state === filterState) : students
    const set = new Set(base.map((s) => s.location?.site).filter(Boolean))
    return [...set].sort()
  }, [students, filterState])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (!showArchived && s.archived) return false
      if (filterState && s.location?.state !== filterState) return false
      if (filterSite && s.location?.site !== filterSite) return false
      if (filterLastName && !s.lastName?.toLowerCase().includes(filterLastName.toLowerCase())) return false
      return true
    })
  }, [students, filterState, filterSite, filterLastName, showArchived])

  const handleStateChange = (e) => {
    setFilterState(e.target.value)
    setFilterSite("")
  }

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Students</h1>
        <div className="flex gap-2">
          <Link to="/admin/students/add" className="btn btn-secondary btn-sm">+ Add Student</Link>
          <Link to="/admin/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="form-control">
          <label className="label pr-2"><span className="label-text text-sm font-semibold text-secondary">State</span></label>
          <select
            className="select select-bordered select-sm w-40"
            value={filterState}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            {states.map((st) => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label pr-2"><span className="label-text text-sm font-semibold text-secondary">Site</span></label>
          <select
            className="select select-bordered select-sm w-48"
            value={filterSite}
            onChange={(e) => setFilterSite(e.target.value)}
          >
            <option value="">All Sites</option>
            {sites.map((site) => <option key={site} value={site}>{site}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label pr-2"><span className="label-text text-sm font-semibold text-secondary">Last Name</span></label>
          <input
            type="text"
            className="input input-bordered input-sm w-44"
            placeholder="Search last name…"
            value={filterLastName}
            onChange={(e) => setFilterLastName(e.target.value)}
          />
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

        {(filterState || filterSite || filterLastName) && (
          <button
            className="btn btn-ghost btn-sm self-end"
            onClick={() => { setFilterState(""); setFilterSite(""); setFilterLastName("") }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-sm text-base-content/60 mb-3">{filtered.length} student{filtered.length !== 1 ? "s" : ""}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-base-content/50">No students match the current filters.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOC #</th>
                <th>Site</th>
                <th>State</th>
                <th>Case Manager</th>
                <th>Release Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="hover">
                  <td>
                    <Link to={`/admin/students/${s.id}`} className="link link-primary font-semibold">
                      {s.lastName}, {s.firstName}{s.middleInitial ? ` ${s.middleInitial}.` : ""}
                    </Link>
                    {s.teachingAssistant && <span className="badge badge-accent badge-sm ml-2">TA</span>}
                    {s.archived && <span className="badge badge-neutral badge-sm ml-2">Archived</span>}
                  </td>
                  <td className="font-mono text-sm">{s.docId || "—"}</td>
                  <td>{s.location?.site || "—"}</td>
                  <td>{s.location?.state || "—"}</td>
                  <td>{s.releaseData?.caseManager || "—"}</td>
                  <td className="text-sm">
                    {s.incarceration?.releaseDate
                      ? new Date(s.incarceration.releaseDate).toISOString().split("T")[0]
                      : "—"}
                  </td>
                  <td>
                    <Link to={`/admin/students/${s.id}/edit`} className="btn btn-ghost btn-xs">Edit</Link>
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

export default StudentList
