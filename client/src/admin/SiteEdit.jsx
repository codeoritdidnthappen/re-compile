import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router"
import { getSite, updateSite, archiveSite } from "../sites/sitesSlice"

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const SiteEdit = () => {
  const { programId, siteId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentSite: s, loading } = useSelector((state) => state.sites)

  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [archiveConfirm, setArchiveConfirm] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getSite({ token, programId, siteId }))
  }, [programId, siteId])

  useEffect(() => {
    if (!s) return
    setForm({
      name:       s.name       ?? "",
      contract:   s.contract   ?? "",
      instructor: s.instructor ?? "",
      students:   s.students   ?? "",
    })
  }, [s])

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem("token")

    const siteData = {
      ...form,
      students: form.students !== "" ? Number(form.students) : 0,
    }

    const result = await dispatch(updateSite({ token, programId, siteId, siteData }))
    if (updateSite.fulfilled.match(result)) {
      navigate(-1)
    } else {
      setError("Failed to update site. Please try again.")
    }
  }

  const handleArchive = async () => {
    const token = localStorage.getItem("token")
    const result = await dispatch(archiveSite({ token, programId, siteId }))
    if (archiveSite.fulfilled.match(result)) {
      navigate(-1)
    } else {
      setError("Failed to archive site.")
    }
  }

  if (!form) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Edit Site</h1>
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">← Back</button>
      </div>

      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

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
                  required
                />
              </Field>
              <Field label="Contract">
                <input
                  className="input input-bordered"
                  value={form.contract}
                  onChange={(e) => set("contract", e.target.value)}
                />
              </Field>
              <Field label="Instructor">
                <input
                  className="input input-bordered"
                  value={form.instructor}
                  onChange={(e) => set("instructor", e.target.value)}
                />
              </Field>
              <Field label="Students">
                <input
                  type="number"
                  className="input input-bordered"
                  value={form.students}
                  onChange={(e) => set("students", e.target.value)}
                  min={0}
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-between pb-8">
          <div>
            {!archiveConfirm ? (
              <button type="button" className="btn btn-error btn-outline btn-sm" onClick={() => setArchiveConfirm(true)}>
                Archive Site
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-error font-semibold">Archive this site?</span>
                <button type="button" className="btn btn-error btn-sm" onClick={handleArchive} disabled={loading}>Yes, Archive</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setArchiveConfirm(false)}>Cancel</button>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SiteEdit
