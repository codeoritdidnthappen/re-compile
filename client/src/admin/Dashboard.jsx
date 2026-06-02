import { useSelector } from "react-redux"
import { Link } from "react-router"
import ProgramChartCard from "./ProgramChartCard"
import StudentList from "./StudentList"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      {user?.roles?.includes("Admin") && (
        <div className="m-4">
          <div className="flex gap-4">
            <Link to="/admin/programs">
              <div className="card bg-primary text-primary-content w-80">
                <div className="card-body">
                  <h2 className="card-title">Programs Overview</h2>
                  <ProgramChartCard />
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
      )}

      {user?.roles?.includes("Case Manager") && (
        <>
          <div className="m-4">
            <div className="flex gap-4">
              <Link to="/admin/programs">
                <div className="card bg-primary text-primary-content">
                  <div className="card-body">
                    <h2 className="card-title">Programs Overview</h2>
                    <ProgramChartCard />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="m-4">
            <StudentList />
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard