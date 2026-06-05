import { useSelector } from "react-redux"
import { Link } from "react-router"
import ProgramChartCard from "./ProgramChartCard"
import CaseManager90DaysSummary from "./CaseManager90DaysSummary"
import StudentList from "./StudentList"
import WeeklyMiniCard from "./WeeklyMiniCard"
import StudentsMiniCard from "./StudentsMiniCard"
import FundingCard from "./FundingCard"
import CompletedCard from "./CompletedCard"
import AcceptedCard from "./AcceptedCard"
import JobsCard from "./JobsCard"
import DaysToJob from "./DaysToJob"
import LaptopsGivenCard from "./LaptopsGivenCard"

const Dashboard = () => {
  const { user, currentRole } = useSelector((state) => state.auth)

  return (
    <div className="m-6">
        {currentRole === "Admin" && (
          <>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <CompletedCard />
              <AcceptedCard />
              <JobsCard />
              <DaysToJob />
            </div>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <Link to="/admin/programs">
                <ProgramChartCard />
              </Link>
              <Link to="/admin/weekly">
                <WeeklyMiniCard />
              </Link>
              <Link to="/admin/grants">
                <FundingCard />
              </Link>
              <Link to="/admin/students">
                <StudentsMiniCard />
              </Link>
            </div>
          </>
        )}

        {currentRole === "Case Manager" && (
          <>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <CompletedCard />
              <LaptopsGivenCard />
              <JobsCard />
            </div>
            <div className="flex flex-row gap-6 mb-6 justify-center">
              <Link to="/admin/programs">
                <ProgramChartCard />
              </Link>
              <Link to="/admin/90days">
                <CaseManager90DaysSummary />
              </Link>
              <Link to="/admin/students">
                <StudentsMiniCard />
              </Link>
            </div>
          </>
        )}
    </div>
  )
}

export default Dashboard