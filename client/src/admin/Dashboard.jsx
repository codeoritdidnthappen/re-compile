import { useSelector } from "react-redux"
import { Link } from "react-router"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  
  return (
    <div className="m-2">
      <div className="flex gap-2">
        <Link to="/admin/programs">
          <div className="card bg-primary text-primary-content w-80">
            <div className="card-body">
              <h2 className="card-title">Programs Overview</h2>
              <p>US map with overview for each state</p>
            </div>
          </div>
        </Link>
        <Link to="/admin/weekly">
          <div className="card bg-primary text-primary-content w-80">
            <div className="card-body">
              <h2 className="card-title">Weekly Report</h2>
              <p>Weekly report to DOC for each state</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard