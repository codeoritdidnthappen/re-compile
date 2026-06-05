import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router"
import { createStudent } from "../students/studentSlice"

const emptyForm = {
  docId: "",
  firstName: "",
  middleInitial: "",
  lastName: "",
  teachingAssistant: false,
  location: { state: "", address: "", site: "", unit: "" },
  incarceration: { sentenceDate: "", intakeDate: "", releaseDate: "", charges: "" },
  releaseData: { caseManager: "", receivedLaptop: false, laptopDetails: "", receivedPhone: false, phoneDetails: "" },
  links: { linkedin: "", github: "", resume: "", portfolio: "" },
}

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-semibold">{label}</span>
    {children}
  </div>
)

const StudentAdd = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.students)

  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)

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

    const charges = form.incarceration.charges
      ? form.incarceration.charges.split(",").map((c) => c.trim()).filter(Boolean)
      : []

    const payload = {
      ...form,
      incarceration: {
        ...form.incarceration,
        charges,
        sentenceDate: form.incarceration.sentenceDate || undefined,
        intakeDate: form.incarceration.intakeDate || undefined,
        releaseDate: form.incarceration.releaseDate || undefined,
      },
    }

    const result = await dispatch(createStudent({ token, studentData: payload }))
    if (createStudent.fulfilled.match(result)) {
      navigate(`/admin/students/${result.payload.student.id}`)
    } else {
      setError("Failed to create student. Please check the form and try again.")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Add Student</h1>
        <Link to="/admin/students" className="btn btn-ghost btn-sm">← Students</Link>
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

        <div className="flex gap-3 justify-end pb-8">
          <Link to="/admin/students" className="btn btn-ghost">Cancel</Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Add Student"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default StudentAdd
