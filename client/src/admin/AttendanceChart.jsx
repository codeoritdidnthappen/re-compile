import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { getAttendanceSummary } from "../attendance/attendanceSlice"

const AttendanceChart = ({ abbreviation }) => {
  const dispatch = useDispatch()

  const { attendanceSummary } = useSelector((state) => state.attendance)
  const { loading, isLoggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    const getAttendanceData = async () => {

      const token = localStorage.getItem("token")
      dispatch(getAttendanceSummary({ token, abbreviation }))
    }
    getAttendanceData()
  }, [])

  return (
    <section className="">
      <div className="flex justify-center mt-10">
        {attendanceSummary ? (
          <LineChart
            width={1500}
            height={500}
            data={attendanceSummary}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Perryville" stroke="var(--color-primary)" activeDot={{ r: 8 }} strokeWidth={3} />
            <Line type="monotone" dataKey="Cibola" stroke="var(--color-secondary)" strokeWidth={2} />
            <Line type="monotone" dataKey="Whetstone" stroke="var(--color-accent)" strokeWidth={2} />
            <Line type="monotone" dataKey="RedRock" stroke="var(--color-info)" strokeWidth={2} />
          </LineChart>
        ) : (
          <div className="h-125">Loading</div>
        )}
      </div>
    </section>
  )
}

export default AttendanceChart
