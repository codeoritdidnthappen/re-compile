import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getStudents90Day } from "../students/studentSlice"

const CaseManager90DaysSummary = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const { sites } = useSelector(state => state.students)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getStudents90Day({ token, caseManager: `${user.firstName} ${user.lastName}` }))
  }, [])

  // if (!sites || sites.length === 0) return <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden p-6 w-80 h-80 cursor-pointer text-secondary text-xl">No 90 day students</div>

  return (
    <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden p-6 w-80 h-80 cursor-pointer">
      {sites && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {sites.map((site) => (
            <li key={site.site} className="list-row">

                <div className="text-lg font-bold text-primary">{site.site}:</div>
                <div className="text-lg font-semibold text-secondary">{site.total}</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CaseManager90DaysSummary