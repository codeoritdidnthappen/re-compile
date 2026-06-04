import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAcceptedCount } from "../programs/programsSlice"

const AcceptedCard = ({ state, site }) => {
  const dispatch = useDispatch()
  const { acceptedCount, loading } = useSelector((state) => state.programs)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAcceptedCount({ token, state, site }))
  }, [state, site])

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-40">
      <div className="card-body">
        <h2 className="card-title mx-auto">Current Students</h2>
        <div className="flex items-center justify-center">
          {loading || acceptedCount === null
            ? <span className="loading loading-spinner loading-lg" />
            : <span className="text-6xl font-bold">{acceptedCount}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default AcceptedCard
