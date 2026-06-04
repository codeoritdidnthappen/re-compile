import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllGrants } from "../grants/grantSlice"

const FundingCard = () => {
  const dispatch = useDispatch()
  const { grants } = useSelector((state) => state.grants)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllGrants(token))
  }, [])

  const now = new Date()
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

  const activeGrants = grants.filter((g) => g.status === "active")
  const totalFunding = activeGrants.reduce((sum, g) => sum + (g.amount ?? 0), 0)
  const expiringSoon = activeGrants.filter((g) => g.endDate && new Date(g.endDate) <= in90Days)
  const pendingCount = grants.filter((g) => g.status === "pending" || g.status === "applied").length

  return (
    <div className="card bg-secondary text-secondary-content w-80 h-80 border-2 border-secondary hover:border-accent transition-all">
      <div className="card-body">
        <h2 className="card-title mx-auto">Funding at a Glances</h2>
        <div className="space-y-3 mt-4 min-w-48">
          <div className="flex justify-between items-center">
            <span className="text-md opacity-90">Active Grants</span>
            <span className="text-2xl font-bold">{activeGrants.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md opacity-90">Total Funding</span>
            <span className="text-2xl font-bold">${totalFunding.toLocaleString()}</span>
          </div>
          {expiringSoon.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-md opacity-90">Expiring in 90 Days</span>
              <span className="badge badge-warning text-lg font-bold px-3 size-8.5">{expiringSoon.length}</span>
            </div>
          )}
          {pendingCount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-md opacity-90">Pending / Applied</span>
              <span className="badge badge-info text-lg font-bold px-3 size-8.5">{pendingCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FundingCard
