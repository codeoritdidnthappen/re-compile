import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router"
import { createSite } from "../sites/sitesSlice"

const emptyForm = {
  name: "",
  contract: "",
  instructor: "",
  students: "",
}

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const SiteAdd = () => {
  const { programId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.sites)

  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem("token")

    const siteData = {
      ...form,
      students: form.students !== "" ? Number(form.students) : 0,
    }

    const result = await dispatch(createSite({ token, programId, siteData }))
    if (createSite.fulfilled.match(result)) {
      navigate(-1)
    } else {
      const msg = result.payload?.message || result.error?.message
      setError(msg || "Failed to create site. Please try again.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Add Site</h1>
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">← Back</button>
      </div>

      {error && <div className="alert alert-warning mb-4"><span>{error}</span></div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Site Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Site Name">
                <input
                  className="input input-bordered"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Wakulla Correctional"
                  required
                />
              </Field>
              <Field label="Contract">
                <input
                  className="input input-bordered"
                  value={form.contract}
                  onChange={(e) => set("contract", e.target.value)}
                  placeholder="e.g. DOC-2024-001"
                />
              </Field>
              <Field label="Instructor">
                <input
                  className="input input-bordered"
                  value={form.instructor}
                  onChange={(e) => set("instructor", e.target.value)}
                  placeholder="Instructor name"
                />
              </Field>
              <Field label="Students">
                <input
                  type="number"
                  className="input input-bordered"
                  value={form.students}
                  onChange={(e) => set("students", e.target.value)}
                  placeholder="0"
                  min={0}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pb-8">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Add Site"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SiteAdd
