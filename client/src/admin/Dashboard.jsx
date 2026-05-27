import { useSelector } from "react-redux"
import USStudentProgramMap from "./USStudentProgramMap"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  
  return (
    <div>
      <USStudentProgramMap />
    </div>
  )
}

export default Dashboard