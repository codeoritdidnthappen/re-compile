import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLaptopsGiven } from "../students/studentSlice"

const LaptopsGivenCard = ({ state, site }) => {
  const dispatch = useDispatch()
  const { laptopsGivenCount, loading } = useSelector((s) => s.students)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getLaptopsGiven({ token, state, site }))
  }, [state, site])

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-40">
      <div className="card-body">
        <h2 className="card-title mx-auto">Laptops Given</h2>
        <div className="flex items-center justify-center">
          {loading || laptopsGivenCount === null
            ? <span className="loading loading-spinner loading-lg" />
            : <span className="text-6xl font-bold">{laptopsGivenCount}</span>
          }
        </div>
      </div>
    </div>
  )
}

export default LaptopsGivenCard
