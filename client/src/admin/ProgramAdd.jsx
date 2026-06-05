import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router"
import { createProgram } from "../programs/programsSlice"

const emptyForm = {
  name: "",
  year: new Date().getFullYear(),
  abbreviation: "",
  sites: "",
  applied: "",
  accepted: "",
  completed: "",
  retention: "",
  attendance: "",
  jobs: "",
  techJobs: "",
}

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const ProgramAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.programs)

  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)

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

    const result = await dispatch(createProgram({ token, programData: payload }))
    if (createProgram.fulfilled.match(result)) {
      navigate(`/admin/program-list/${result.payload.program.id}`)
    } else {
      setError("Failed to create program. Please check the form and try again.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Add Program</h1>
        <Link to="/admin/program-list" className="btn btn-ghost btn-sm">← Programs</Link>
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

        <div className="flex gap-3 justify-end pb-8">
          <Link to="/admin/program-list" className="btn btn-ghost">Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Add Program"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default ProgramAdd
