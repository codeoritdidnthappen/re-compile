import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { login } from "./auth/authSlice"

const Login = () => {
  const [ loginForm, setLoginForm ] = useState({ email: "", password: "", formStatus: false })

  const dispatch = useDispatch()

  const { loading, isLoggedIn, user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem("location")) {
        navigate(localStorage.getItem("location"))
      }
      else {
        navigate("/admin/dashboard")
      }
    }
  }, [isLoggedIn])
  
  const handleSubmit = async () => {
    dispatch(login(loginForm))
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem("location")) {
        navigate(localStorage.getItem("location"))
      }
      else {
        navigate("/admin/dashboard")
      }
    }
  }, [isLoggedIn])

  const handleLoginForm = (e, field) => {
    setLoginForm((l) => {
      const status = field === "email" ? 
          e.target.value.length >= 3 && l.password.length >= 3
        :
          l.email.length >= 3 && e.target.value.length >= 3
      return {
        ...loginForm,
        email: field === "email" ? e.target.value : l.email,
        password: field === "password" ? e.target.value : l.password,
        formStatus: status
      }}
    )
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  value={loginForm.email}
                  onChange={(e) => handleLoginForm(e, "email")}
                  type="text" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  value={loginForm.password}
                  onChange={(e) => handleLoginForm(e, "password")}
                  type="password" className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary mt-4" disabled={!loginForm.formStatus}>Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      {loginForm.error && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>
      )}
    </>
  )
}

export default Login