import { useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="flex flex-wrap w-3/4 mt-10 gap-2">
        Home
      </div>
    </div>
  )
}

export default Home