import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { login } from "./auth/authSlice"

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "", formStatus: false })
  const [errorMessage, setErrorMessage] = useState("")
  const [touched, setTouched] = useState({ email: false, password: false })

  const dispatch = useDispatch()
  const { loading, isLoggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      const location = localStorage.getItem("location")
      navigate(location || "/admin/dashboard")
    }
  }, [isLoggedIn, navigate])

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email)
  const validatePassword = (password) => password.trim().length >= 4
  const isFormValid = (email, password) => validateEmail(email) && validatePassword(password)

  const handleSubmit = async (event) => {
    event?.preventDefault()
    if (!loginForm.formStatus || loading) {
      setErrorMessage("Please enter a valid email and password before submitting.")
      return
    }

    setErrorMessage("")
    try {
      await dispatch(login({ email: loginForm.email, password: loginForm.password })).unwrap()
    }
    catch (error) {
      const message = error?.message
      if (message === "Request failed with status code 401") {
        setErrorMessage("Invalid email or password. Please try again.")
      } else {
        setErrorMessage("Unable to connect to the server. Please try again.")
      }
    }
  }

  const handleLoginForm = (e, field) => {
    const value = e.target.value
    setTouched((prev) => ({ ...prev, [field]: true }))
    setLoginForm((prev) => {
      const next = {
        ...prev,
        [field]: value,
      }
      return {
        ...next,
        formStatus: isFormValid(next.email, next.password),
      }
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-4xl font-bold leading-snug text-secondary">
            Tracking Progress.<br />Measuring Impact.
          </h1>
          <p className="py-6 text-base-content/80">
            This portal is for re:Compile staff, partners and students. Sign in to
            manage student records, monitor program outcomes, and help move
            justice-impacted individuals closer to meaningful careers in tech.
          </p>
        </div>

        <div className="card bg-base-100 w-full w-sm shrink-0 shadow-lg">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-primary mb-3">Login</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  value={loginForm.email}
                  onChange={(e) => handleLoginForm(e, "email")}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  type="email"
                  className={`input input-bordered ${touched.email && !validateEmail(loginForm.email) ? "input-error" : ""}`}
                  placeholder="Email"
                  aria-invalid={touched.email && !validateEmail(loginForm.email)}
                />
              </div>
                {touched.email && !validateEmail(loginForm.email) ? (
                  <label className="label">
                    <span className="label-text-alt text-error">Enter a valid email address.</span>
                  </label>
                  ) : (
                    <label className="label min-h-5">&nbsp;</label>
                  )}

              <div className="form-control mt-1">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  value={loginForm.password}
                  onChange={(e) => handleLoginForm(e, "password")}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  type="password"
                  className={`input input-bordered ${touched.password && !validatePassword(loginForm.password) ? "input-error" : ""}`}
                  placeholder="Password"
                  aria-invalid={touched.password && !validatePassword(loginForm.password)}
                />
              </div>
                {touched.password && !validatePassword(loginForm.password) ? (
                    <label className="label">
                      <span className="label-text-alt text-error">Password must be at least 8 characters.</span>
                    </label>
                  ) : (
                    <label className="label min-h-5">&nbsp;</label>
                  )}

              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!loginForm.formStatus || loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="mt-4">
              <a className="link link-hover">Forgot password?</a>
            </div>

            {errorMessage && (
              <div role="alert" className="alert alert-error shadow-lg mt-4" aria-live="assertive">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login