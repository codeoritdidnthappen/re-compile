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
    <div className="space-y-3 min-w-48">
      <div className="flex justify-between items-center">
        <span className="text-sm opacity-80">Active Grants</span>
        <span className="text-2xl font-bold">{activeGrants.length}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm opacity-80">Total Funding</span>
        <span className="text-2xl font-bold">${totalFunding.toLocaleString()}</span>
      </div>
      {expiringSoon.length > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-sm opacity-80">Expiring in 90 Days</span>
          <span className="badge badge-warning text-lg px-3">{expiringSoon.length}</span>
        </div>
      )}
      {pendingCount > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-sm opacity-80">Pending / Applied</span>
          <span className="badge badge-info text-lg px-3">{pendingCount}</span>
        </div>
      )}
    </div>
  )
}

export default FundingCard
