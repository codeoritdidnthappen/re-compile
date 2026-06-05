import { useEffect } from "react"
import { useParams, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getProgramById } from "../programs/programsSlice"

const Section = ({ title, children }) => (
  <div className="card bg-base-200 mb-4">
    <div className="card-body">
      <h3 className="card-title text-primary">{title}</h3>
      {children}
    </div>
  </div>
)

const Field = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null
  return (
    <div className="flex gap-2">
      <span className="font-semibold text-sm min-w-40">{label}:</span>
      <span className="text-sm">{String(value)}</span>
    </div>
  )
}

const ProgramDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentProgram: p, loading } = useSelector((state) => state.programs)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getProgramById({ token, id }))
  }, [id])

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
  if (!p) return <div className="m-8 text-error">Program not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <Link to="/admin/program-list" className="btn btn-ghost btn-sm">← Programs</Link>
        <Link to={`/admin/program-list/${p.id}/edit`} className="btn btn-ghost btn-sm hover:bg-secondary hover:text-secondary-content">Edit</Link>
      </div>

      {/* Header */}
      <div className="card bg-secondary text-secondary-content mb-6">
        <div className="card-body">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{p.name}</h1>
              {p.abbreviation && <p className="text-lg opacity-90">{p.abbreviation}</p>}
              <p className="opacity-80 mt-1">Year: {p.year}</p>
            </div>
            {p.archived && <span className="badge badge-warning badge-lg">Archived</span>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <Section title="Program Stats">
        <div className="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100">
          <div className="stat">
            <div className="stat-title">Applied</div>
            <div className="stat-value text-primary">{p.applied ?? "—"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Accepted</div>
            <div className="stat-value text-secondary">{p.accepted ?? "—"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">{p.completed ?? "—"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Jobs</div>
            <div className="stat-value">{p.jobs ?? "—"}</div>
          </div>
        </div>
        <div className="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100 mt-3">
          <div className="stat">
            <div className="stat-title">Tech Jobs</div>
            <div className="stat-value text-accent">{p.techJobs ?? "—"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Retention</div>
            <div className="stat-value">{p.retention != null ? `${p.retention}%` : "—"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Attendance</div>
            <div className="stat-value">{p.attendance != null ? `${p.attendance}%` : "—"}</div>
          </div>
        </div>
      </Section>

      {/* Sites */}
      {p.sites?.length > 0 && (
        <Section title="Sites">
          <div className="flex flex-wrap gap-2">
            {p.sites.map((site, i) => (
              <span key={i} className="badge badge-outline badge-primary badge-lg">{site}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

export default ProgramDetail
