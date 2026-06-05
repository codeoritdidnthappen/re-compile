import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { getStudentsCaseManager } from "../students/studentSlice"
import Star from "../assets/star.svg?react"
import StarExclamation from "../assets/star-exclamation.svg?react"

const WomanSVG = () => {
  return (
    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C6.36969 3 2.03198 7.6159 2.0002 13.6164C1.9894 15.6573 2.40037 17.72 4.00753 20H5.2711C4.0877 18.6805 3.27928 17.0105 3.01375 15.1653C3.00276 15.1 2.99841 15.035 3.0002 14.971C3.01253 14.4913 3.3697 14.0768 3.86058 14.0076L3.86527 14.007C8.44557 13.0682 11.6592 9.86012 13.0513 5.68377C13.2052 5.22219 13.663 4.94748 14.1281 5.00805C14.2642 4.99033 14.4062 5.0005 14.5461 5.0428C18.2864 6.17376 21 9.68632 21 13.8309C21 16.2024 20.1103 18.369 18.6477 20H19.9692C21.2064 18.0777 22.0103 15.5756 21.9999 13.6164C21.9681 7.6159 17.6304 3 12 3ZM14.6274 7.19414C12.9911 11.29 9.71879 14.5198 5.1736 15.7509C5.99951 18.7865 8.73433 21 11.9593 21C15.8329 21 19 17.8053 19 13.8309C19 10.8265 17.187 8.26246 14.6274 7.19414ZM3.50018 22H7.84859C9.08061 22.6391 10.4773 23 11.9593 23C13.4508 23 14.8559 22.6345 16.0937 21.9878C16.1446 21.9958 16.1968 22 16.25 22H20.4999C20.8238 22 21.1275 21.8432 21.3151 21.5792C22.9181 19.3231 24.0136 16.1891 23.9999 13.6058C23.9629 6.63448 18.8561 1 12 1C5.14401 1 0.0371506 6.63448 0.000231528 13.6058C-0.0131697 16.1363 0.551323 18.7647 2.7032 21.604C2.89225 21.8535 3.18719 22 3.50018 22ZM10.0002 15.9998C9.36619 16.0002 8.87429 16.6196 9.03002 17.2425C9.46903 18.9986 11 20 12.0002 20C12.9219 20 14.4525 18.9881 14.9703 17.24C15.126 16.6172 14.6333 16.0002 14.0002 15.9998H10.0002ZM15 13.5C15.8284 13.5 16.5 12.8284 16.5 12C16.5 11.1716 15.8284 10.5 15 10.5C14.1716 10.5 13.5 11.1716 13.5 12C13.5 12.8284 14.1716 13.5 15 13.5Z" fill="var(--color-primary)"/>
    </svg>
  )
}

const Cohort = ({ num }) => {
  return (
    <>
      {num == 5 && (
        <svg fill="var(--color-accent)" width="800px" height="800px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
          <path d="M8.5 1.675a7.8 7.8 0 0 1 2.107.283 7.933 7.933 0 0 1 5.527 5.526 7.965 7.965 0 0 1 0 4.206 7.924 7.924 0 0 1-.8 1.891 8.07 8.07 0 0 1-1.237 1.604A7.86 7.86 0 0 1 8.5 17.508a7.777 7.777 0 0 1-2.099-.282 7.96 7.96 0 0 1-5.535-5.532 7.99 7.99 0 0 1 0-4.21 7.864 7.864 0 0 1 2.04-3.49 8.07 8.07 0 0 1 1.605-1.237 7.923 7.923 0 0 1 1.886-.8A7.753 7.753 0 0 1 8.5 1.676zm0 1.108a6.67 6.67 0 0 0-1.804.242 6.849 6.849 0 0 0-1.624.688A6.983 6.983 0 0 0 3.688 4.78a6.751 6.751 0 0 0-1.997 4.811 6.676 6.676 0 0 0 .242 1.804 6.84 6.84 0 0 0 .688 1.624 6.918 6.918 0 0 0 2.451 2.452 6.838 6.838 0 0 0 1.628.687 6.855 6.855 0 0 0 3.609 0 6.757 6.757 0 0 0 3.002-1.755 6.98 6.98 0 0 0 1.068-1.384 6.816 6.816 0 0 0 .687-1.627 6.846 6.846 0 0 0 0-3.61 6.799 6.799 0 0 0-1.752-3.004 6.8 6.8 0 0 0-3.005-1.753A6.729 6.729 0 0 0 8.5 2.783zm2.358 7.263a1.89 1.89 0 0 0-.505-.653 2.12 2.12 0 0 0-.754-.394 3.238 3.238 0 0 0-.927-.13c-.098 0-.208.005-.329.014a2.017 2.017 0 0 0-.328.051l.055-1.037h2.64V6.563H6.69l-.157 3.751a4.632 4.632 0 0 1 .8-.208 4.722 4.722 0 0 1 .802-.079 2.54 2.54 0 0 1 .482.046 1.282 1.282 0 0 1 .43.163.932.932 0 0 1 .31.31.902.902 0 0 1 .121.481.872.872 0 0 1-.291.713 1.117 1.117 0 0 1-1.362.019 1.1 1.1 0 0 1-.384-.565l-1.418.435a2.088 2.088 0 0 0 .348.7 2.221 2.221 0 0 0 .565.523 2.707 2.707 0 0 0 .732.329 3.14 3.14 0 0 0 1.782-.028 2.47 2.47 0 0 0 .81-.43 2.09 2.09 0 0 0 .57-.728 2.37 2.37 0 0 0 .213-1.042 2.091 2.091 0 0 0-.185-.907z"/>
        </svg>
      )}
      {num === 5.5 && (
        <div className="border border-2 rounded-3xl text-accent p-1">5.5</div>
      )}
      {num === 6 && (
        <svg fill="var(--color-accent)" width="800px" height="800px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
          <path d="M8.509 1.684a7.766 7.766 0 0 1 2.098.282 7.933 7.933 0 0 1 5.527 5.527 7.964 7.964 0 0 1 0 4.206 8.012 8.012 0 0 1-.8 1.895 7.925 7.925 0 0 1-4.727 3.64 7.972 7.972 0 0 1-4.205 0 8.01 8.01 0 0 1-1.896-.8 7.908 7.908 0 0 1-2.84-2.84 7.997 7.997 0 0 1-.8-1.896 7.99 7.99 0 0 1 0-4.21 7.938 7.938 0 0 1 5.536-5.522 7.796 7.796 0 0 1 2.107-.283zm0 1.108a6.725 6.725 0 0 0-1.81.242 6.905 6.905 0 0 0-1.633.688 6.825 6.825 0 0 0-3.133 4.066 6.87 6.87 0 0 0 0 3.612 6.912 6.912 0 0 0 .69 1.634 6.806 6.806 0 0 0 2.443 2.444 6.928 6.928 0 0 0 1.634.689 6.854 6.854 0 0 0 3.61 0 6.826 6.826 0 0 0 4.068-3.133 6.934 6.934 0 0 0 .689-1.633 6.855 6.855 0 0 0 0-3.61 6.825 6.825 0 0 0-4.758-4.757 6.695 6.695 0 0 0-1.8-.242zm2.41 7.258a2.155 2.155 0 0 0-.468-.677 2.028 2.028 0 0 0-.684-.435 2.235 2.235 0 0 0-.818-.153 1.704 1.704 0 0 0-.24.019.965.965 0 0 0-.222.056l.028-.047 1.612-2.241H8.25L6.666 8.933a6.168 6.168 0 0 0-.527.968 2.674 2.674 0 0 0-.204 1.06 2.273 2.273 0 0 0 .204.973 2.204 2.204 0 0 0 .554.741 2.463 2.463 0 0 0 .819.468 3.172 3.172 0 0 0 2.001 0 2.46 2.46 0 0 0 .823-.468 2.182 2.182 0 0 0 .554-.75 2.374 2.374 0 0 0 .204-1 2.124 2.124 0 0 0-.176-.876zm-1.656 1.67a1.007 1.007 0 0 1-.75.287.97.97 0 0 1-.753-.305 1.047 1.047 0 0 1-.28-.732 1.012 1.012 0 0 1 .29-.75 1.023 1.023 0 0 1 .753-.287.98.98 0 0 1 .744.292 1.02 1.02 0 0 1 .28.736 1.034 1.034 0 0 1-.284.76z"/>
        </svg>
      )}
      {num === 7 && (
        <svg fill="var(--color-accent)" width="800px" height="800px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
          <g id="SVGRepo_iconCarrier">
            <path d="M8.5 1.684a7.802 7.802 0 0 1 2.108.282 7.93 7.93 0 0 1 5.526 5.527 7.998 7.998 0 0 1 0 4.215 7.913 7.913 0 0 1-2.037 3.49 7.91 7.91 0 0 1-3.49 2.036 7.998 7.998 0 0 1-4.214 0 7.934 7.934 0 0 1-5.527-5.527 7.998 7.998 0 0 1 0-4.215 7.932 7.932 0 0 1 5.527-5.526A7.8 7.8 0 0 1 8.5 1.683zm0 1.108a6.726 6.726 0 0 0-1.809.242 6.825 6.825 0 0 0-1.627.687A6.87 6.87 0 0 0 2.62 6.164a6.824 6.824 0 0 0-.688 1.627 6.887 6.887 0 0 0 0 3.618 6.803 6.803 0 0 0 1.753 3.005 6.798 6.798 0 0 0 3.005 1.753 6.888 6.888 0 0 0 3.618 0 6.826 6.826 0 0 0 4.758-4.758 6.888 6.888 0 0 0 0-3.618 6.825 6.825 0 0 0-4.758-4.757A6.727 6.727 0 0 0 8.5 2.792zm2.55 5.02v-1.24H6.29v1.334h3.102l-2.658 5.223H8.54z"/>
          </g>
        </svg>
      )}
      {num === 7.5 && (
        <div className="border border-2 rounded-3xl text-accent p-1">7.5</div>
      )}
    </>
  )
}

const CaseManager90Days = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { students } = useSelector(state => state.students)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getStudentsCaseManager({ token, caseManager: `${user.firstName} ${user.lastName}` }))
  }, [])
  
  return (
    <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="list rounded-box shadow-md gap-1">
        {students.map((student) => {
          const daysRemaining = Math.round((new Date(student.incarceration.releaseDate) - new Date()) / (1000 * 60 * 60 * 24))
          return (
            <li key={student.docId} className={`list-row ${daysRemaining < 91 ? "border-2 border-success bg-base-100" : "bg-base-200"}`}>
              <Link to={`/admin/students/${student.id}`} className="flex w-full items-center gap-3 hover:opacity-80">
                <div>{daysRemaining < 91 ? <StarExclamation className="text-success w-12 h-12" /> : <Star className="text-neutral w-12 h-12" />}</div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-primary">{student.firstName} {student.lastName} #{student.docId}</div>
                  <div className="text-sm font-semibold">Site: {student.location.site}</div>
                  <div className="text-sm font-semibold">Release Date: {new Date(student.incarceration.releaseDate).toISOString().split('T')[0]}</div>
                  <div className="text-sm font-semibold">Cohort: {student.classes[0].cohort}</div>
                </div>
                <div>
                  <div className="text-center text-md">Days until release:</div>
                  <div className="text-center text-3xl font-bold text-success">{daysRemaining}</div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CaseManager90Days