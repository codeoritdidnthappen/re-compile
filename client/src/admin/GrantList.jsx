import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { getAllGrants } from "../grants/grantSlice"

const statusBadge = (status) => {
  const map = {
    active: "badge-success",
    pending: "badge-warning",
    applied: "badge-info",
    expired: "badge-error",
    rejected: "badge-neutral",
  }
  return map[status] ?? "badge-neutral"
}

const formatDate = (d) => d ? new Date(d).toISOString().split("T")[0] : "—"

const GrantList = () => {
  const dispatch = useDispatch()
  const { grants, loading } = useSelector((state) => state.grants)

  useEffect(() => {
    const token = localStorage.getItem("token")
    dispatch(getAllGrants(token))
  }, [])

  if (loading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary" /></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Funding & Grants</h1>
        <Link to="/admin/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
      </div>

      {grants.length === 0 ? (
        <div className="text-center py-20 text-base-content opacity-50">No grants found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Grant Name</th>
                <th>Grantor</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Expiration</th>
                <th>States</th>
              </tr>
            </thead>
            <tbody>
              {grants.map((g) => (
                <tr key={g.id} className="hover cursor-pointer">
                  <td>
                    <Link to={`/admin/grants/${g.id}`} className="link link-primary font-semibold">{g.name}</Link>
                  </td>
                  <td>{g.grantor?.organization}</td>
                  <td><span className="badge badge-outline capitalize">{g.type}</span></td>
                  <td>{g.amount ? `$${g.amount.toLocaleString()}` : "—"}</td>
                  <td><span className={`badge ${statusBadge(g.status)} capitalize`}>{g.status}</span></td>
                  <td>{formatDate(g.endDate)}</td>
                  <td>{g.states?.length ? g.states.join(", ") : "All"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default GrantList
