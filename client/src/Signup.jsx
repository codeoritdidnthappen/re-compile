import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { createUser } from "./users/userSlice"

const ROLES = ["Admin", "Case Manager"]

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.users)

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "", avatar: "",
  })
  const [touched, setTouched] = useState({
    firstName: false, lastName: false, email: false, password: false, confirmPassword: false,
  })
  const [errorMessage, setErrorMessage] = useState("")

  const validateEmail = (v) => /^\S+@\S+\.\S+$/.test(v)
  const validateRequired = (v) => v.trim().length > 0
  const validatePassword = (v) => v.length >= 8
  const validateConfirm = (v) => v === form.password

  const isValid = {
    firstName: validateRequired(form.firstName),
    lastName: validateRequired(form.lastName),
    email: validateEmail(form.email),
    password: validatePassword(form.password),
    confirmPassword: validateConfirm(form.confirmPassword),
  }

  const formValid = Object.values(isValid).every(Boolean)

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setTouched((prev) => ({ ...prev, [field]: true }))
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValid || loading) {
      setErrorMessage("Please fix the errors above before submitting.")
      return
    }
    setErrorMessage("")
    try {
      await dispatch(createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        avatar: form.avatar,
        roles: ROLES,
      })).unwrap()
      navigate("/login?registered=1")
    } catch {
      setErrorMessage("Unable to create account. The email may already be in use.")
    }
  }

  const FieldError = ({ show, message }) => show
    ? <label className="label"><span className="label-text-alt text-error">{message}</span></label>
    : <label className="label min-h-5">&nbsp;</label>

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-4xl font-bold leading-snug text-secondary">
            Create an Account.
          </h1>
          <p className="py-6 text-base-content/80">
            Sign up to explore the re:Compile staff portal. You'll be given both
            available roles — <strong>Admin</strong> and <strong>Case Manager</strong> — so you
            can test drive all of the functionality the site has to offer.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-lg">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-primary mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit} noValidate>

              <div className="flex gap-3">
                <div className="form-control flex flex-col flex-1">
                  <label className="label"><span className="label-text">First Name</span></label>
                  <input
                    type="text"
                    className={`input input-bordered ${touched.firstName && !isValid.firstName ? "input-error" : ""}`}
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                  <FieldError show={touched.firstName && !isValid.firstName} message="Required." />
                </div>
                <div className="form-control flex flex-col flex-1">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input
                    type="text"
                    className={`input input-bordered ${touched.lastName && !isValid.lastName ? "input-error" : ""}`}
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                  />
                  <FieldError show={touched.lastName && !isValid.lastName} message="Required." />
                </div>
              </div>

              <div className="form-control flex flex-col mt-1">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  type="email"
                  className={`input input-bordered ${touched.email && !isValid.email ? "input-error" : ""}`}
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FieldError show={touched.email && !isValid.email} message="Enter a valid email address." />
              </div>

              <div className="form-control flex flex-col mt-1">
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  type="password"
                  className={`input input-bordered ${touched.password && !isValid.password ? "input-error" : ""}`}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FieldError show={touched.password && !isValid.password} message="Password must be at least 8 characters." />
              </div>

              <div className="form-control flex flex-col mt-1">
                <label className="label"><span className="label-text">Confirm Password</span></label>
                <input
                  type="password"
                  className={`input input-bordered ${touched.confirmPassword && !isValid.confirmPassword ? "input-error" : ""}`}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                <FieldError show={touched.confirmPassword && !isValid.confirmPassword} message="Passwords do not match." />
              </div>

              <div className="form-control flex flex-col mt-1">
                <label className="label"><span className="label-text">Avatar URL <span className="text-base-content/50">(optional)</span></span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="https://…"
                  value={form.avatar}
                  onChange={handleChange("avatar")}
                />
                <label className="label min-h-5">&nbsp;</label>
              </div>

              <div className="form-control flex flex-col mt-1">
                <label className="label"><span className="label-text">Roles</span></label>
                <p className="text-xs text-base-content/60 mb-2">
                  Both roles are pre-selected so you can test drive all of the site's functionality.
                </p>
                <select multiple size={2} className="select select-bordered w-full" disabled>
                  {ROLES.map((r) => (
                    <option key={r} value={r} selected>{r}</option>
                  ))}
                </select>
                <label className="label min-h-5">&nbsp;</label>
              </div>

              <div className="form-control mt-2">
                <button type="submit" className="btn btn-secondary" disabled={!formValid || loading}>
                  {loading ? "Creating account…" : "Create Account"}
                </button>
              </div>
            </form>

            <div className="mt-4 text-sm">
              Already have an account? <Link to="/login" className="link link-primary">Login</Link>
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

export default Signup
