import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDaysToJob } from "../students/studentSlice"

const DaysToJob = ({ state, site }) => {
  const dispatch = useDispatch()
  const { daysToJobAvg, loading } = useSelector((state) => state.students)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getDaysToJob({ token, state, site }))
  }, [state, site])

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-40">
      <div className="card-body">
        <h2 className="card-title mx-auto">Avg Days to Job</h2>
        <div className="flex items-center justify-center">
          {loading || daysToJobAvg === null
            ? <span className="loading loading-spinner loading-lg" />
            : <span className="text-6xl font-bold">{daysToJobAvg}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default DaysToJob
