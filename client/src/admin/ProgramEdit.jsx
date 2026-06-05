import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router"
import { getProgramById, updateProgram, archiveProgram } from "../programs/programsSlice"

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const ProgramEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentProgram: p, loading } = useSelector((state) => state.programs)

  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [archiveConfirm, setArchiveConfirm] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getProgramById({ token, id }))
  }, [id])

  useEffect(() => {
    if (!p) return
    setForm({
      name: p.name ?? "",
      year: p.year ?? new Date().getFullYear(),
      abbreviation: p.abbreviation ?? "",
      sites: p.sites?.join(", ") ?? "",
      applied: p.applied ?? "",
      accepted: p.accepted ?? "",
      completed: p.completed ?? "",
      retention: p.retention ?? "",
      attendance: p.attendance ?? "",
      jobs: p.jobs ?? "",
      techJobs: p.techJobs ?? "",
    })
  }, [p])

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem("token")

    const payload = {
      ...form,
      year: Number(form.year) || undefined,
      sites: form.sites ? form.sites.split(",").map((s) => s.trim()).filter(Boolean) : [],
      applied: form.applied !== "" ? Number(form.applied) : undefined,
      accepted: form.accepted !== "" ? Number(form.accepted) : undefined,
      completed: form.completed !== "" ? Number(form.completed) : undefined,
      retention: form.retention !== "" ? Number(form.retention) : undefined,
      attendance: form.attendance !== "" ? Number(form.attendance) : undefined,
      jobs: form.jobs !== "" ? Number(form.jobs) : undefined,
      techJobs: form.techJobs !== "" ? Number(form.techJobs) : undefined,
    }

    const result = await dispatch(updateProgram({ token, id, programData: payload }))
    if (updateProgram.fulfilled.match(result)) {
      navigate(`/admin/program-list/${id}`)
    } else {
      setError("Failed to save changes. Please try again.")
    }
  }

  const handleArchive = async () => {
    const token = localStorage.getItem("token")
    const result = await dispatch(archiveProgram({ token, id }))
    if (archiveProgram.fulfilled.match(result)) {
      navigate("/admin/program-list")
    } else {
      setError("Failed to archive program. Please try again.")
    }
  }

  if (loading && !form) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
  if (!form) return <div className="m-8 text-error">Program not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Edit Program</h1>
        <div className="flex gap-2">
          <Link to={`/admin/program-list/${id}`} className="btn btn-ghost btn-sm">← Detail</Link>
          <Link to="/admin/program-list" className="btn btn-ghost btn-sm">← Programs</Link>
        </div>
      </div>

      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Identity */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Program Identity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="State / Name">
                <input className="input input-bordered" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. California" required />
              </Field>
              <Field label="Abbreviation">
                <input className="input input-bordered w-28" value={form.abbreviation} onChange={(e) => set("abbreviation", e.target.value)} placeholder="e.g. CA" maxLength={10} />
              </Field>
              <Field label="Year">
                <input type="number" className="input input-bordered w-32" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" />
              </Field>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm font-semibold">Sites <span className="font-normal opacity-60">(comma-separated)</span></span>
              <textarea className="textarea textarea-bordered" rows={2} value={form.sites} onChange={(e) => set("sites", e.target.value)} placeholder="e.g. Facility A, Facility B" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Program Stats</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Applied">
                <input type="number" className="input input-bordered" value={form.applied} onChange={(e) => set("applied", e.target.value)} placeholder="0" min={0} />
              </Field>
              <Field label="Accepted">
                <input type="number" className="input input-bordered" value={form.accepted} onChange={(e) => set("accepted", e.target.value)} placeholder="0" min={0} />
              </Field>
              <Field label="Completed">
                <input type="number" className="input input-bordered" value={form.completed} onChange={(e) => set("completed", e.target.value)} placeholder="0" min={0} />
              </Field>
              <Field label="Jobs">
                <input type="number" className="input input-bordered" value={form.jobs} onChange={(e) => set("jobs", e.target.value)} placeholder="0" min={0} />
              </Field>
              <Field label="Tech Jobs">
                <input type="number" className="input input-bordered" value={form.techJobs} onChange={(e) => set("techJobs", e.target.value)} placeholder="0" min={0} />
              </Field>
              <Field label="Retention (%)">
                <input type="number" className="input input-bordered" value={form.retention} onChange={(e) => set("retention", e.target.value)} placeholder="0" min={0} max={100} />
              </Field>
              <Field label="Attendance (%)">
                <input type="number" className="input input-bordered" value={form.attendance} onChange={(e) => set("attendance", e.target.value)} placeholder="0" min={0} max={100} />
              </Field>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-between pb-8">
          <div>
            {!archiveConfirm ? (
              <button
                type="button"
                className="btn btn-warning btn-outline"
                onClick={() => setArchiveConfirm(true)}
                disabled={p?.archived}
              >
                {p?.archived ? "Already Archived" : "Archive Program"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-warning">Archive this program?</span>
                <button type="button" className="btn btn-warning btn-sm" onClick={handleArchive} disabled={loading}>
                  {loading ? <span className="loading loading-spinner loading-sm" /> : "Confirm Archive"}
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setArchiveConfirm(false)}>Cancel</button>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Link to={`/admin/program-list/${id}`} className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default ProgramEdit
