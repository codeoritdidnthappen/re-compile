import { NavLink, Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setTheme, setCurrentRole } from "./auth/authSlice"

const Navbar = () => {
  const { isLoggedIn, user, theme, currentRole } = useSelector((state) => state.auth)

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

  const Admin = () => {
    return (
      <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
        <path d="M983.727 5.421 1723.04 353.62c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0ZM757.088 383.322c-176.075 0-319.285 143.323-319.285 319.398 0 176.075 143.21 319.285 319.285 319.285 1.92 0 3.84 0 5.76-.113l58.504 58.503h83.689v116.781h116.781v83.803l91.595 91.482h313.412V1059.05l-350.57-350.682c.114-1.807.114-3.727.114-5.647 0-176.075-143.21-319.398-319.285-319.398Zm0 112.942c113.732 0 206.344 92.724 205.327 216.62l-3.953 37.271 355.426 355.652v153.713h-153.713l-25.412-25.299v-149.986h-116.78v-116.78H868.108l-63.812-63.7-47.209 5.309c-113.732 0-206.344-92.5-206.344-206.344 0-113.732 92.612-206.456 206.344-206.456Zm4.98 124.98c-46.757 0-84.705 37.948-84.705 84.706s37.948 84.706 84.706 84.706c46.757 0 84.706-37.948 84.706-84.706s-37.949-84.706-84.706-84.706Z" fill-rule="evenodd"/>
      </svg>
    )
  }

  const CaseManager = () => {
    return (
      <svg fill="currentColor" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xml:space="preserve">
        <g>
          <g>
            <path d="M38,30h4c0.6,0,1-0.4,1-1v-3h14v3c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-3c0-3.3-2.7-6-6-6H43c-3.3,0-6,2.7-6,6
              v3C37,29.6,37.4,30,38,30z"/>
          </g>
          <g>
            <path d="M74,36H26c-3.3,0-6,2.7-6,6v32c0,3.3,2.7,6,6,6h48c3.3,0,6-2.7,6-6V42C80,38.7,77.3,36,74,36z M58.5,58.1
              L48,70.7c-0.6,0.6-1.6,0.1-1.4-0.7l2.6-9h-6.9c-0.8,0-1.4-0.8-1.1-1.6l4.2-10.8c0.4-0.9,1.2-1.5,2.2-1.5h6.8h1.5
              c0.9,0,1.5,0.9,1,1.7L52.4,56h5.2C58.6,56,59.2,57.3,58.5,58.1z"/>
          </g>
        </g>
        </svg>
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
        <NavLink to="/" className="btn btn-ghost text-xl">re:compile</NavLink>
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
                className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-1 mt-3 w-38 p-2 shadow">
                <li>
                  <a className="justify-between cursor-none">
                    {user.firstName}'s Profile
                  </a>
                </li>
                {user.roles?.length > 1 && (
                  <li>
                    <div className="flex items-center justify-between gap-2 px-2 py-1 cursor-default hover:bg-transparent active:bg-transparent">
                      <span title="Case Manager">
                        <CaseManager />
                      </span>
                      <input
                        type="checkbox"
                        className="toggle border-indigo-600 bg-indigo-500 text-indigo-200 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                        checked={currentRole === "Admin"}
                        onChange={() => dispatch(setCurrentRole(currentRole === "Admin" ? "Case Manager" : "Admin"))}
                      />
                      <span title="Admin">
                        <Admin />
                      </span>
                    </div>
                  </li>
                )}
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/signup" className="btn btn-ghost">Sign Up</NavLink>
            <NavLink to="/login" className="btn">Login</NavLink>
          </>
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