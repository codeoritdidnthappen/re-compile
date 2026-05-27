import { useNavigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import Loading from "./Loading"

const PrivateRoute = () => {
  const { loading, isLoggedIn } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  if (loading) {
    return (
      <Loading />
    )
  }
  if (isLoggedIn) {
    return <Outlet />
  }
  if (!loading && !isLoggedIn) {
    return navigate("/login")
  }
}

export default PrivateRoute
