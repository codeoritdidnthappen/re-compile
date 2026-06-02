import { useEffect } from "react"
import { Routes, Route } from "react-router"
import { useDispatch } from "react-redux"
import { me, setLoading, setTheme } from "./auth/authSlice"
import PrivateRoute from "./PrivateRoute"
import Navbar from "./Navbar"
import Home from "./Home"
import Login from "./Login"
import Dashboard from "./admin/Dashboard"
import USStudentProgramMap from "./admin/USStudentProgramMap"
import StudentProgramState from "./admin/StudentProgramState"
import ProgramSite from "./admin/ProgramSite"
// import Weekly from "./admin/Weekly"
import NoMatch from "./NoMatch"
import "./App.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("token")
    if (token) {
      // TODO: Debounce this
      const checkToken = async () => {
        dispatch(me(token))
      }
      checkToken()
    }
    else {
      dispatch(setLoading({ loading: false }))
    }

    // Check localStorage for theme
    const theme = localStorage.getItem("theme")
    if (theme) {
      dispatch(setTheme({ theme }))
    }
  }, [])
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="programs" element={<USStudentProgramMap />} />
          <Route path="programs/:state" element={<StudentProgramState />} />
          <Route path="sites/:site" element={<ProgramSite />} />
          {/* <Route path="weekly" element={<Weekly />} /> */}
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}

export default App
