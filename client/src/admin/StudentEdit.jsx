import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router"
import { getStudentById, updateStudent, archiveStudent } from "../students/studentSlice"

const fmt = (d) => d ? new Date(d).toISOString().split("T")[0] : ""

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const StudentEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentStudent: s, loading } = useSelector((state) => state.students)

  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [archiveConfirm, setArchiveConfirm] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getStudentById({ token, id }))
  }, [id])

  useEffect(() => {
    if (!s) return
    setForm({
      docId: s.docId ?? "",
      firstName: s.firstName ?? "",
      middleInitial: s.middleInitial ?? "",
      lastName: s.lastName ?? "",
      teachingAssistant: s.teachingAssistant ?? false,
      location: {
        state: s.location?.state ?? "",
        address: s.location?.address ?? "",
        site: s.location?.site ?? "",
        unit: s.location?.unit ?? "",
      },
      incarceration: {
        sentenceDate: fmt(s.incarceration?.sentenceDate),
        intakeDate: fmt(s.incarceration?.intakeDate),
        releaseDate: fmt(s.incarceration?.releaseDate),
        charges: s.incarceration?.charges?.join(", ") ?? "",
        photoLink: s.incarceration?.photoLink ?? "",
      },
      releaseData: {
        caseManager: s.releaseData?.caseManager ?? "",
        receivedLaptop: s.releaseData?.receivedLaptop ?? false,
        laptopDetails: s.releaseData?.laptopDetails ?? "",
        receivedPhone: s.releaseData?.receivedPhone ?? false,
        phoneDetails: s.releaseData?.phoneDetails ?? "",
        reentryServices: s.releaseData?.reentryServices?.join(", ") ?? "",
      },
      links: {
        linkedin: s.links?.linkedin ?? "",
        github: s.links?.github ?? "",
        resume: s.links?.resume ?? "",
        portfolio: s.links?.portfolio ?? "",
      },
    })
  }, [s])

  const set = (path, value) => {
    const keys = path.split(".")
    setForm((prev) => {
      const next = { ...prev }
      if (keys.length === 1) {
        next[keys[0]] = value
      } else {
        next[keys[0]] = { ...prev[keys[0]], [keys[1]]: value }
      }
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem("token")

    const payload = {
      ...form,
      incarceration: {
        ...form.incarceration,
        charges: form.incarceration.charges
          ? form.incarceration.charges.split(",").map((c) => c.trim()).filter(Boolean)
          : [],
        sentenceDate: form.incarceration.sentenceDate || undefined,
        intakeDate: form.incarceration.intakeDate || undefined,
        releaseDate: form.incarceration.releaseDate || undefined,
      },
      releaseData: {
        ...form.releaseData,
        reentryServices: form.releaseData.reentryServices
          ? form.releaseData.reentryServices.split(",").map((r) => r.trim()).filter(Boolean)
          : [],
      },
    }

    const result = await dispatch(updateStudent({ token, id, studentData: payload }))
    if (updateStudent.fulfilled.match(result)) {
      navigate(`/admin/students/${id}`)
    } else {
      setError("Failed to save changes. Please try again.")
    }
  }

  const handleArchive = async () => {
    const token = localStorage.getItem("token")
    const result = await dispatch(archiveStudent({ token, id }))
    if (archiveStudent.fulfilled.match(result)) {
      navigate("/admin/students")
    } else {
      setError("Failed to archive student. Please try again.")
    }
  }

  if (loading && !form) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
  if (!form) return <div className="m-8 text-error">Student not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Edit Student</h1>
        <div className="flex gap-2">
          <Link to={`/admin/students/${id}`} className="btn btn-ghost btn-sm">← Detail</Link>
          <Link to="/admin/students" className="btn btn-ghost btn-sm">← Students</Link>
        </div>
      </div>

      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="DOC ID">
                <input className="input input-bordered" value={form.docId} onChange={(e) => set("docId", e.target.value)} placeholder="DOC ID" />
              </Field>
              <Field label="First Name">
                <input className="input input-bordered" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="First name" required />
              </Field>
              <Field label="Middle Initial">
                <input className="input input-bordered w-24" value={form.middleInitial} onChange={(e) => set("middleInitial", e.target.value)} placeholder="M.I." maxLength={1} />
              </Field>
              <Field label="Last Name">
                <input className="input input-bordered" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Last name" required />
              </Field>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox" checked={form.teachingAssistant} onChange={(e) => set("teachingAssistant", e.target.checked)} />
                  <span className="text-sm font-semibold">Teaching Assistant</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="State">
                <input className="input input-bordered" value={form.location.state} onChange={(e) => set("location.state", e.target.value)} placeholder="State" />
              </Field>
              <Field label="Site">
                <input className="input input-bordered" value={form.location.site} onChange={(e) => set("location.site", e.target.value)} placeholder="Site / facility name" />
              </Field>
              <Field label="Unit">
                <input className="input input-bordered" value={form.location.unit} onChange={(e) => set("location.unit", e.target.value)} placeholder="Unit" />
              </Field>
              <Field label="Address">
                <input className="input input-bordered" value={form.location.address} onChange={(e) => set("location.address", e.target.value)} placeholder="Mailing address" />
              </Field>
            </div>
          </div>
        </div>

        {/* Incarceration */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Incarceration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Sentence Date">
                <input type="date" className="input input-bordered" value={form.incarceration.sentenceDate} onChange={(e) => set("incarceration.sentenceDate", e.target.value)} />
              </Field>
              <Field label="Intake Date">
                <input type="date" className="input input-bordered" value={form.incarceration.intakeDate} onChange={(e) => set("incarceration.intakeDate", e.target.value)} />
              </Field>
              <Field label="Release Date">
                <input type="date" className="input input-bordered" value={form.incarceration.releaseDate} onChange={(e) => set("incarceration.releaseDate", e.target.value)} />
              </Field>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm font-semibold">Charges <span className="font-normal opacity-60">(comma-separated)</span></span>
              <textarea className="textarea textarea-bordered" rows={2} value={form.incarceration.charges} onChange={(e) => set("incarceration.charges", e.target.value)} placeholder="e.g. Possession, Distribution" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm font-semibold">Photo Link</span>
              <input className="input input-bordered" value={form.incarceration.photoLink} onChange={(e) => set("incarceration.photoLink", e.target.value)} placeholder="Photo URL" />
            </div>
          </div>
        </div>

        {/* Release Data */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Release Planning</h2>
            <Field label="Case Manager">
              <input className="input input-bordered" value={form.releaseData.caseManager} onChange={(e) => set("releaseData.caseManager", e.target.value)} placeholder="Case manager name" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox" checked={form.releaseData.receivedLaptop} onChange={(e) => set("releaseData.receivedLaptop", e.target.checked)} />
                  <span className="text-sm font-semibold">Received Laptop</span>
                </label>
                {form.releaseData.receivedLaptop && (
                  <input className="input input-bordered input-sm" value={form.releaseData.laptopDetails} onChange={(e) => set("releaseData.laptopDetails", e.target.value)} placeholder="Laptop details" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox" checked={form.releaseData.receivedPhone} onChange={(e) => set("releaseData.receivedPhone", e.target.checked)} />
                  <span className="text-sm font-semibold">Received Phone</span>
                </label>
                {form.releaseData.receivedPhone && (
                  <input className="input input-bordered input-sm" value={form.releaseData.phoneDetails} onChange={(e) => set("releaseData.phoneDetails", e.target.value)} placeholder="Phone details" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm font-semibold">Re-entry Services <span className="font-normal opacity-60">(comma-separated)</span></span>
              <textarea className="textarea textarea-bordered" rows={2} value={form.releaseData.reentryServices} onChange={(e) => set("releaseData.reentryServices", e.target.value)} placeholder="e.g. Housing, Employment assistance" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title text-primary">Digital Presence</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="LinkedIn">
                <input className="input input-bordered" value={form.links.linkedin} onChange={(e) => set("links.linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" />
              </Field>
              <Field label="GitHub">
                <input className="input input-bordered" value={form.links.github} onChange={(e) => set("links.github", e.target.value)} placeholder="https://github.com/…" />
              </Field>
              <Field label="Resume">
                <input className="input input-bordered" value={form.links.resume} onChange={(e) => set("links.resume", e.target.value)} placeholder="Resume URL" />
              </Field>
              <Field label="Portfolio">
                <input className="input input-bordered" value={form.links.portfolio} onChange={(e) => set("links.portfolio", e.target.value)} placeholder="Portfolio URL" />
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
                disabled={s?.archived}
              >
                {s?.archived ? "Already Archived" : "Archive Student"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-warning">Archive this student?</span>
                <button type="button" className="btn btn-warning btn-sm" onClick={handleArchive} disabled={loading}>
                  {loading ? <span className="loading loading-spinner loading-sm" /> : "Confirm Archive"}
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setArchiveConfirm(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link to={`/admin/students/${id}`} className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default StudentEdit
