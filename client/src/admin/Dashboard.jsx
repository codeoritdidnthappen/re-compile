import { useSelector } from "react-redux"
import { Link } from "react-router"
import ProgramChartCard from "./ProgramChartCard"
import CaseManager90DaysSummary from "./CaseManager90DaysSummary"
import StudentList from "./StudentList"
import FundingCard from "./FundingCard"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      {user?.roles?.includes("Admin") && (
        <div className="m-4">
          <div className="flex gap-4">
            <Link to="/admin/programs">
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-center">Programs Overview</h2>
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
            <Link to="/admin/grants">
              <div className="card bg-primary text-primary-content w-80 hover:shadow-2xl transition-all">
                <div className="card-body">
                  <h2 className="card-title">Funding & Grants</h2>
                  <FundingCard />
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
                  <div className="card-body flex items-center justify-center">
                    <h2 className="card-title text-center">Programs Overview</h2>
                    <ProgramChartCard />
                  </div>
                </div>
              </Link>
              <Link to="/admin/90days">
                <div className="card bg-primary text-primary-content">
                  <div className="card-body flex items-center justify-center">
                    <h2 className="card-title text-center">90 Days</h2>
                    <CaseManager90DaysSummary />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard