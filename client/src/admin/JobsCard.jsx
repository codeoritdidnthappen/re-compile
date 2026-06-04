import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getJobsCount } from "../programs/programsSlice"

const JobsCard = ({ state, site }) => {
  const dispatch = useDispatch()
  const { jobsCount, loading } = useSelector((state) => state.programs)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getJobsCount({ token, state, site }))
  }, [state, site])

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-40">
      <div className="card-body">
        <h2 className="card-title mx-auto">Jobs (2026)</h2>
        <div className="flex items-center justify-center">
          {loading || jobsCount === null
            ? <span className="loading loading-spinner loading-lg" />
            : <span className="text-6xl font-bold">{jobsCount}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default JobsCard
