import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCompletedCount } from "../programs/programsSlice"

const CompletedCard = ({ state, site }) => {
  const dispatch = useDispatch()
  const { completedCount, loading } = useSelector((state) => state.programs)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getCompletedCount({ token, state, site }))
  }, [state, site])

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-40">
      <div className="card-body">
        <h2 className="card-title mx-auto">Students Graduated (2026)</h2>
        <div className="flex items-center justify-center">
          {loading || completedCount === null
            ? <span className="loading loading-spinner loading-lg" />
            : <span className="text-6xl font-bold">{completedCount}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default CompletedCard
