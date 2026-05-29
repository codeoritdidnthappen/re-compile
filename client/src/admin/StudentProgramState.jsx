import { useState, useEffect} from "react"
import { useParams, Link } from "react-router"

// TODO: get prison list from db

const StudentProgramState = () => {
  const { state } = useParams()
  const [ currentState, setCurrentState ] = useState(null)

  useEffect(() => {
    if (state) {
      setCurrentState([ prisonData.find(s => s.state === state) ])
    }
  }, [state])
  
  useEffect(() => {
    console.log("currentState", currentState)
  }, [currentState])
  
  /*
  Jelani Attikos
  Lucyna Nahiara
  Nis Tamara
  Jaymes Tucker
  Warrick Terrance
  Shauna Celia
  Evaristo Garnette
  */

  const prisonData = [
    {
      state: "Arizona",
      prisons: [
        {
          id: "az-perryville",
          name: "Perryville",
          instructor: "David Dean",
          students: 23,
        },
        {
          id: "az-cibola",
          name: "Cibola",
          instructor: "James Carter",
          students: 17,
        },
        {
          id: "az-red-rock",
          name: "Red Rock",
          instructor: "Suellen Elvin",
          students: 13,
        },
        {
          id: "az-whetstone",
          name: "Whetstone",
          instructor: "Daniel Léana",
          students: 13,
        },
      ],
    },
    {
      state: "Tennessee",
      prisons: [
        {
          id: "tn-nashville",
          name: "Nashville Correctional Complex",
          instructor: "Ashley Brooks",
          students: 27,
        },
      ],
    },
    {
      state: "Florida",
      prisons: [
        {
          id: "fl-miami",
          name: "Miami Rehabilitation Center",
          instructor: "David Nguyen",
          students: 38,
        },
        {
          id: "fl-orlando",
          name: "Orlando State Facility",
          instructor: "Chris Walker",
          students: 24,
        },
      ],
    },
  ]

  return (
    <div className="p-6 space-y-10 bg-base-200 min-h-screen">
      {currentState ? (
        <>
          {currentState.map((stateGroup) => (
            <div key={stateGroup.state}>
              <h2 className="text-3xl font-bold mb-6 text-base-content">
                {stateGroup.state}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stateGroup.prisons.map((site) => (
                  <Link
                    key={site.id}
                    to={`/admin/sites/${site.id}`}
                    className="hover:no-underline"
                  >
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 border border-base-300 hover:border-secondary">
                      <div className="card-body">
                        <h3 className="card-title text-primary">
                          {site.name}
                        </h3>

                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">
                              Instructor:
                            </span>{" "}
                            {site.instructor}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Total Students:
                            </span>{" "}
                            {site.students}
                          </p>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <button className="btn btn-primary btn-sm">
                            View Prison
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default StudentProgramState