const SAMPLE = [
  { name: "Harmon, Delia",      docId: "AZ-00412", site: "Perryville",  state: "AZ" },
  { name: "Voss, Marcus T.",    docId: "FL-01837", site: "Wakulla",     state: "FL" },
  { name: "Okafor, Priya",      docId: "AZ-00956", site: "Perryville",  state: "AZ" },
  { name: "Salgado, Ruben",     docId: "SC-00284", site: "Leath",       state: "SC" },
  { name: "Thornton, Aaliyah",  docId: "MA-00731", site: "NCCI",        state: "MA" },
  { name: "Breaux, Celeste",    docId: "FL-02014", site: "Lowell",      state: "FL" },
  { name: "Oduya, Samuel",      docId: "AZ-00588", site: "Red Rock",    state: "AZ" },
  { name: "Kim, Devin J.",      docId: "AZ-00169", site: "Cibola",      state: "AZ" },
  { name: "Crooks, Tabitha",    docId: "FL-01837", site: "Wakulla",     state: "FL" },
  { name: "Kertzmann, Colten",  docId: "FL-01837", site: "Leath",       state: "SC" }
]

const StudentsMiniCard = () => (
  <div className="card bg-secondary text-secondary-content border-2 border-secondary hover:border-accent">
    <div className="card-body pt-3">
      <h2 className="card-title mx-auto">Students</h2>
      <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden px-3 pt-2 pb-3 w-68 h-59.5">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th className="text-[10px] px-1 py-0.5 text-base-content/70">Name</th>
              <th className="text-[10px] px-1 py-0.5 text-base-content/70">DOC #</th>
              <th className="text-[10px] px-1 py-0.5 text-base-content/70">Site</th>
              <th className="text-[10px] px-1 py-0.5 text-base-content/70">St</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE.map((s) => (
              <tr key={s.docId}>
                <td className="text-[10px] px-1 py-0.5 text-primary font-medium">{s.name}</td>
                <td className="text-[10px] px-1 py-0.5 text-primary font-mono">{s.docId}</td>
                <td className="text-[10px] px-1 py-0.5 text-primary">{s.site}</td>
                <td className="text-[10px] px-1 py-0.5 text-primary">{s.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

export default StudentsMiniCard
