import { useEffect } from "react"
import { useParams, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getGrantById } from "../grants/grantSlice"

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
      <span className="font-semibold text-sm min-w-44">{label}:</span>
      <span className="text-sm">{String(value)}</span>
    </div>
  )
}

const formatDate = (d) => d ? new Date(d).toISOString().split("T")[0] : null

const statusBadge = (status) => {
  const map = {
    active: "badge-success",
    pending: "badge-warning",
    applied: "badge-info",
    expired: "badge-error",
    rejected: "badge-neutral",
  }
  return map[status] ?? "badge-neutral"
}

const GrantDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentGrant: g, loading } = useSelector((state) => state.grants)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getGrantById({ token, id }))
  }, [id])

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
  if (!g) return <div className="m-8 text-error">Grant not found.</div>

  const now = new Date()
  const daysUntilExpiry = g.endDate ? Math.round((new Date(g.endDate) - now) / (1000 * 60 * 60 * 24)) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Link to="/admin/grants" className="btn btn-ghost btn-sm mb-4">← All Grants</Link>

      {/* Header */}
      <div className="card bg-primary text-primary-content mb-6">
        <div className="card-body">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{g.name}</h1>
              <p className="text-lg opacity-90 mt-1">{g.grantor?.organization}</p>
              <p className="opacity-80 mt-1">{g.purpose}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className={`badge ${statusBadge(g.status)} capitalize`}>{g.status}</span>
                <span className="badge badge-outline capitalize">{g.type}</span>
                {g.renewalEligible && <span className="badge badge-accent">Renewal Eligible</span>}
                {g.states?.length > 0
                  ? g.states.map((s) => <span key={s} className="badge badge-ghost">{s}</span>)
                  : <span className="badge badge-ghost">All States</span>
                }
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold">{g.amount ? `$${g.amount.toLocaleString()}` : "—"}</div>
              {daysUntilExpiry !== null && (
                <div className="mt-2">
                  <div className="text-sm opacity-80">Days until expiry</div>
                  <div className={`text-2xl font-bold ${daysUntilExpiry < 91 ? "text-warning" : ""}`}>
                    {daysUntilExpiry < 0 ? "Expired" : daysUntilExpiry}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dates & Reporting */}
      <Section title="Dates & Reporting">
        <div className="space-y-1">
          <Field label="Start Date" value={formatDate(g.startDate)} />
          <Field label="End Date" value={formatDate(g.endDate)} />
          <Field label="Application Deadline" value={formatDate(g.applicationDeadline)} />
          <Field label="Reporting Frequency" value={g.reportingFreq} />
          <Field label="Next Report Due" value={formatDate(g.nextReportDue)} />
        </div>
      </Section>

      {/* Grantor Contact */}
      <Section title="Grantor Contact">
        <div className="space-y-1">
          <Field label="Organization" value={g.grantor?.organization} />
          <Field label="Contact Name" value={g.grantor?.contactName} />
          <Field label="Title" value={g.grantor?.contactTitle} />
          <Field label="Email" value={g.grantor?.email
            ? <a href={`mailto:${g.grantor.email}`} className="link link-primary">{g.grantor.email}</a>
            : null}
          />
          <Field label="Phone" value={g.grantor?.phone} />
          <Field label="Website" value={g.grantor?.website
            ? <a href={g.grantor.website} target="_blank" rel="noreferrer" className="link link-primary">{g.grantor.website}</a>
            : null}
          />
        </div>
      </Section>

      {/* Notes */}
      {g.notes && (
        <Section title="Notes">
          <p className="text-sm whitespace-pre-wrap">{g.notes}</p>
        </Section>
      )}
    </div>
  )
}

export default GrantDetail
