import { useEffect } from "react"
import { Routes, Route } from "react-router"
import { useDispatch } from "react-redux"
import { me, setLoading, setTheme } from "./auth/authSlice"
import PrivateRoute from "./PrivateRoute"
import Navbar from "./Navbar"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./admin/Dashboard"
import USStudentProgramMap from "./admin/USStudentProgramMap"
import StudentProgramState from "./admin/StudentProgramState"
import ProgramSite from "./admin/ProgramSite"
import Weekly from "./admin/Weekly"
import NoMatch from "./NoMatch"
import "./App.css"
import CaseManagerStudents from "./admin/CaseManagerStudents"
import StudentList from "./admin/StudentList"
import StudentAdd from "./admin/StudentAdd"
import StudentDetail from "./admin/StudentDetail"
import StudentEdit from "./admin/StudentEdit"
import GrantList from "./admin/GrantList"
import GrantDetail from "./admin/GrantDetail"
import ProgramList from "./admin/ProgramList"
import ProgramDetail from "./admin/ProgramDetail"
import ProgramEdit from "./admin/ProgramEdit"
import ProgramAdd from "./admin/ProgramAdd"
import SiteAdd from "./admin/SiteAdd"
import SiteEdit from "./admin/SiteEdit"

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="programs" element={<USStudentProgramMap />} />
          <Route path="programs/:stateName" element={<StudentProgramState />} />
          <Route path="sites/:site" element={<ProgramSite />} />
          <Route path="sites/:programId/add" element={<SiteAdd />} />
          <Route path="sites/:programId/:siteId/edit" element={<SiteEdit />} />
          <Route path="90days" element={<CaseManagerStudents />} />
          <Route path="weekly" element={<Weekly />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/add" element={<StudentAdd />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="students/:id/edit" element={<StudentEdit />} />
          <Route path="grants" element={<GrantList />} />
          <Route path="grants/:id" element={<GrantDetail />} />
          <Route path="program-list" element={<ProgramList />} />
          <Route path="program-list/add" element={<ProgramAdd />} />
          <Route path="program-list/:id" element={<ProgramDetail />} />
          <Route path="program-list/:id/edit" element={<ProgramEdit />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}

export default App
