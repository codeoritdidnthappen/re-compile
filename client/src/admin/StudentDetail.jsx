import { useEffect } from "react"
import { useParams, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getStudentById } from "../students/studentSlice"

const Section = ({ title, children }) => (
  <div className="card bg-base-200 mb-4">
    <div className="card-body">
      <h3 className="card-title text-primary">{title}</h3>
      {children}
    </div>
  </div>
)

const Field = ({ label, value }) => {
  if (!value && value !== false) return null
  return (
    <div className="flex gap-2">
      <span className="font-semibold text-sm min-w-40">{label}:</span>
      <span className="text-sm">{String(value)}</span>
    </div>
  )
}

const formatDate = (d) => d ? new Date(d).toISOString().split("T")[0] : null

const StudentDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentStudent: s, loading } = useSelector((state) => state.students)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getStudentById({ token, id }))
  }, [id])

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
  if (!s) return <div className="m-8 text-error">Student not found.</div>

  const inc = s.incarceration ?? {}
  const cls = s.classesTaken ?? []
  const rel = s.releaseData ?? {}
  const daysRemaining = inc.releaseDate ? Math.round((new Date(inc.releaseDate) - new Date()) / (1000 * 60 * 60 * 24)) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Navigation */}
      <div className="flex justify-between mb-4">
        <Link to={-1} className="btn btn-ghost btn-sm">← Back</Link>
        <Link to={`/admin/students/${s.id}/edit`} className="btn btn-ghost btn-sm hover:bg-secondary hover:text-secondary-content">Edit</Link>
      </div>

      {/* Header */}
      <div className="card bg-secondary text-secondary-content mb-6">
        <div className="card-body">
          <div className="flex gap-6 items-start">
            {/* {inc.photoLink && (
              <img src={inc.photoLink} alt="Student photo" className="w-24 h-24 rounded-full object-cover border-4 border-primary-content" />
            )} */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{s.firstName} {s.middleInitial ? `${s.middleInitial}. ` : ""}{s.lastName}</h1>
              <p className="text-lg opacity-90">DOC # {s.docId}</p>
              <p className="opacity-80">{s.location?.site}{s.location?.unit ? `, Unit ${s.location.unit}` : ""} &mdash; {s.location?.state}</p>
              {s.teachingAssistant && <span className="badge badge-accent mt-1">Teaching Assistant</span>}
            </div>
            {daysRemaining !== null && (
              <div className="text-center">
                <div className="text-sm opacity-80">Days until release</div>
                <div className={`text-4xl font-bold ${daysRemaining < 91 ? "text-warning" : ""}`}>{daysRemaining < 0 ? "Released" : daysRemaining}</div>
                <div className="text-sm opacity-80">{formatDate(inc.releaseDate)}</div>
              </div>
            )}
          </div>
          {rel.caseManager && <p className="mt-2 opacity-80 text-sm">Case Manager: {rel.caseManager}</p>}
        </div>
      </div>

      {/* Release Planning */}
      <Section title="Release Planning">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-lg">Laptop</span>
              <span className={`badge ${rel.receivedLaptop ? "badge-success" : "badge-error"}`}>{rel.receivedLaptop ? "Received" : "Not Received"}</span>
            </div>
            {rel.laptopDetails && <p className="text-sm pl-2">{rel.laptopDetails}</p>}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-lg">Phone</span>
              <span className={`badge ${rel.receivedPhone ? "badge-success" : "badge-error"}`}>{rel.receivedPhone ? "Received" : "Not Received"}</span>
            </div>
            {rel.phoneDetails && <p className="text-sm pl-2">{rel.phoneDetails}</p>}
          </div>
        </div>
        {rel.reentryServices?.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold text-sm mb-1">Re-entry Services:</p>
            <div className="flex flex-wrap gap-2">
              {rel.reentryServices.map((svc, i) => <span key={i} className="badge badge-outline badge-primary">{svc}</span>)}
            </div>
          </div>
        )}
      </Section>

      {/* Incarceration Details */}
      <Section title="Incarceration Details">
        <div className="space-y-1">
          <Field label="Release Date" value={formatDate(inc.releaseDate)} />
          <Field label="Intake Date" value={formatDate(inc.intakeDate)} />
          <Field label="Sentence Date" value={formatDate(inc.sentenceDate)} />
        </div>
        {inc.charges?.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold text-sm mb-1">Charges:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {inc.charges.map((c, i) => <li key={i} className="text-sm">{c}</li>)}
            </ul>
          </div>
        )}
      </Section>

      {/* Program Progress */}
      {cls.length > 0 && (
        <Section title="Program Progress">
          {cls.map((c, i) => (
            <div key={i} className={`mb-4 pb-4 ${i < cls.length - 1 ? "border-b border-base-300" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">Cohort {c.cohort}</span>
                <span className="font-semibold">{c.title}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-2">
                <div><span className="opacity-60">Start:</span> {formatDate(c.startDate)}</div>
                <div><span className="opacity-60">End:</span> {formatDate(c.endDate)}</div>
                <div><span className="opacity-60">Modules:</span> {c.modulesCompleted}</div>
                <div><span className="opacity-60">Projects:</span> {c.projectsCompleted}</div>
              </div>
              {c.description && <p className="text-sm mb-2">{c.description}</p>}
              {c.skillsLearned?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {c.skillsLearned.map((sk, j) => <span key={j} className="badge badge-sm badge-accent">{sk}</span>)}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Work Programs */}
      {s.workPrograms?.length > 0 && (
        <Section title="Work Programs">
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr><th>Title</th><th>Type</th><th>Instructor</th><th>Institution</th></tr>
              </thead>
              <tbody>
                {s.workPrograms.map((w, i) => (
                  <tr key={i}>
                    <td>{w.title}</td><td>{w.type}</td><td>{w.instructor}</td><td>{w.institution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Post-Release Outcomes */}
      {(s.jobsAfterRelease?.length > 0 || s.internshipsOrBootcamps?.length > 0 || s.education?.length > 0) && (
        <Section title="Post-Release Outcomes">
          {s.jobsAfterRelease?.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">Employment</h4>
              <div className="space-y-3 mb-4">
                {s.jobsAfterRelease.map((j, i) => (
                  <div key={i} className="bg-base-100 rounded p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{j.jobTitle}</span>
                      <span className="opacity-70">at {j.companyName}</span>
                      {j.isTechJob && <span className="badge badge-sm badge-success">Tech</span>}
                    </div>
                    <div className="text-sm opacity-70">{j.industry} &bull; {formatDate(j.startDate)} – {formatDate(j.endDate) ?? "Present"}{j.salary ? ` &bull; $${j.salary.toLocaleString()}` : ""}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {s.internshipsOrBootcamps?.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">Internships & Bootcamps</h4>
              <div className="space-y-3 mb-4">
                {s.internshipsOrBootcamps.map((b, i) => (
                  <div key={i} className="bg-base-100 rounded p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{b.title}</span>
                      <span className="opacity-70">at {b.institution}</span>
                      {b.isTechInternship && <span className="badge badge-sm badge-success">Tech</span>}
                    </div>
                    <div className="text-sm opacity-70">{formatDate(b.startDate)} – {formatDate(b.endDate) ?? "Present"}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {s.education?.length > 0 && (
            <>
              <h4 className="font-semibold mb-2">Education</h4>
              <div className="space-y-2">
                {s.education.map((e, i) => (
                  <div key={i} className="bg-base-100 rounded p-3 text-sm">
                    <span className="font-semibold">{e.degree}</span> &bull; {e.institution} &bull; {formatDate(e.graduationDate)}
                  </div>
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      {/* Digital Presence */}
      {(s.links?.linkedin || s.links?.github || s.links?.resume || s.links?.portfolio) && (
        <Section title="Digital Presence">
          <div className="flex flex-wrap gap-3">
            {s.links.linkedin && <a href={s.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">LinkedIn</a>}
            {s.links.github && <a href={s.links.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">GitHub</a>}
            {s.links.resume && <a href={s.links.resume} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">Resume</a>}
            {s.links.portfolio && <a href={s.links.portfolio} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">Portfolio</a>}
          </div>
        </Section>
      )}
    </div>
  )
}

export default StudentDetail
