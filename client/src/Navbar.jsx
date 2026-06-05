import { NavLink, Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setTheme } from "./auth/authSlice"

const Navbar = () => {
  const { isLoggedIn, user, theme } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    dispatch(logout(token))
  }

  const goToDashboard = () => {
    localStorage.setItem("location", "/admin/dashboard")
    navigate("/admin/dashboard")
  }

  const ColorBlock = ({ t }) => {
    return (
      <div data-theme={t} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
        <div className="bg-base-content size-1 rounded-full"></div>
        <div className="bg-primary size-1 rounded-full"></div>
        <div className="bg-secondary size-1 rounded-full"></div>
        <div className="bg-accent size-1 rounded-full"></div>
      </div>
    )
  }

  const Check = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="visible h-3 w-3 shrink-0 text-primary">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
      </svg>
    )
  }

  const ThemesSelect = () => {
    const themes = [ "light", "dark", "adcrr", "fdc", "ndcs", "emerald", "corporate", "garden", "forest", "wireframe", "business", "coffee" ]
    return (
      <>
        {themes.map(t => (
          <li key={t} onClick={() => dispatch(setTheme({ theme: t }))} className="text-base-content"><a><ColorBlock t={t} />{t} {theme === t ? <Check /> : ""}</a></li>
        ))}
      </>
    )
  }

  return (
    <div className="navbar bg-primary text-primary-content shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">re-compile</NavLink>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <>
            <ul className="menu menu-horizontal px-1">
              <li onClick={goToDashboard} className="cursor-pointer btn btn-ghost">Dashboard</li>
            </ul>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.avatar ? user.avatar : "https://img.daisyui.com/images/profile/demo/batperson@192.webp"} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    {user.firstName}'s Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="btn">Login</NavLink>
        )}
        <ul className="menu menu-horizontal px-1">
          <li>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="">Themes</div>
              <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-1 w-56 p-2 shadow-sm top-x h-[26.0rem] max-h-[calc(100vh-8.6rem)] overflow-y-auto">
                <ThemesSelect />
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar