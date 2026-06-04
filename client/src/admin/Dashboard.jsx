import { useSelector } from "react-redux"
import { Link } from "react-router"
import ProgramChartCard from "./ProgramChartCard"
import CaseManager90DaysSummary from "./CaseManager90DaysSummary"
import StudentList from "./StudentList"
import FundingCard from "./FundingCard"
import CompletedCard from "./CompletedCard"
import AcceptedCard from "./AcceptedCard"
import JobsCard from "./JobsCard"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="m-6">
        {user?.roles?.includes("Admin") && (
          <>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <CompletedCard />
              <AcceptedCard />
              <JobsCard />
            </div>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <Link to="/admin/programs">
                <ProgramChartCard />
              </Link>
              <Link to="/admin/weekly">
                <div className="card bg-secondary text-secondary-content w-80 h-80">
                  <div className="card-body">
                    <h2 className="card-title mx-auto">Weekly Report</h2>
                    <p>Weekly report to DOC for each state</p>
                  </div>
                </div>
              </Link>
              <Link to="/admin/grants">
                <FundingCard />
              </Link>
            </div>
          </>
        )}

        {user?.roles?.includes("Case Manager") && (
          <>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <Link to="/admin/programs">
                <div className="card bg-secondary text-secondary-content">
                  <div className="card-body flex items-center justify-center">
                    <h2 className="card-title text-center">Programs Overview</h2>
                    <ProgramChartCard />
                  </div>
                </div>
              </Link>
              <Link to="/admin/90days">
                <div className="card bg-secondary text-secondary-content">
                  <div className="card-body flex items-center justify-center">
                    <h2 className="card-title text-center">90 Days</h2>
                    <CaseManager90DaysSummary />
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
    </div>
  )
}

export default Dashboard