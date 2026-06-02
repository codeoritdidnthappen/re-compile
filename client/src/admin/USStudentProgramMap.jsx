import { useEffect } from "react"
import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getPrograms } from "../programs/programsSlice"
import ProgramChart from "./ProgramChart"

const USStudentProgramMap =() => {
  const dispatch = useDispatch()

  const { programs } = useSelector((state) => state.programs)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getPrograms({ token, year:new Date().getFullYear() }))
  }, [])

  return (
    <div className="min-h-screen bg-base-200 text-white p-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-primary">
            Student Program Outcomes by State
          </h1>
          <p className="text-lg text-secondary">
            Hover over highlighted states to view student metrics.
          </p>
        </div>

        <ProgramChart programs={programs} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {Object.entries(programs).map(([code, state]) => (
            <Link key={code} to={`/admin/programs/${state.name}`}>
              <div
                className="bg-base-100 border border-neutral rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">{state.name}</h3>
                  <div className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                    {state.abbreviation}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-accent">
                  <div className="flex justify-between">
                    <span>Applied</span>
                    <span>{state.applied}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accepted</span>
                    <span>{state.accepted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span>{state.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention</span>
                    <span>{state.retention}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance</span>
                    <span>{state.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs</span>
                    <span>{state.jobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tech Jobs</span>
                    <span>{state.techJobs}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default USStudentProgramMap
