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
    <div className="card bg-secondary text-secondary-content border-2 border-secondary hover:border-accent transition-all">
      <div className="card-body pt-3">
        <h2 className="card-title mx-auto">Funding at a Glance</h2>
        <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden px-5 py-4 w-68 h-59.5 flex flex-col justify-center space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary font-medium">Active Grants</span>
            <span className="text-2xl font-bold text-base-content">{activeGrants.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary font-medium">Total Funding</span>
            <span className="text-2xl font-bold text-base-content">${totalFunding.toLocaleString()}</span>
          </div>
          {expiringSoon.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary font-medium">Expiring in 90 Days</span>
              <span className="badge badge-warning text-lg font-bold px-3 size-8.5">{expiringSoon.length}</span>
            </div>
          )}
          {pendingCount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary font-medium">Pending / Applied</span>
              <span className="badge badge-info text-lg font-bold px-3 size-8.5">{pendingCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FundingCard
