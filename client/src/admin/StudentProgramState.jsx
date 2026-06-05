import { useState, useEffect} from "react"
import { useParams, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import BreadCrumbs from "./BreadCrumbs"
import AttendanceChart from "./AttendanceChart"
import { getProgram } from "../programs/programsSlice"

// TODO: get prison list from db

const StudentProgramState = () => {
  const { stateName } = useParams()
  const dispatch = useDispatch()

  const [ currentState, setCurrentState ] = useState(null)

  const { program } = useSelector((state) => state.programs)

  useEffect(() => {
    if (stateName) {
      // setCurrentState([ siteData.find(s => s.state === stateName) ])
      const token = localStorage.getItem("token")
      dispatch(getProgram({ token, stateName }))
    }
  }, [stateName])

  const convertStateToAbbreviation = (stateName) => {
  const name = stateName.trim().toUpperCase()
  const stateMap = { "ARIZONA": "AZ", "FLORIDA": "FL", "MASSACHUSSETTS": "MA", "NEBRASKA": "NE", "SOUTHCAROLINA": "SC" }
  return stateMap[name] || null
}
  
  /*
  Jelani Attikos
  Lucyna Nahiara
  Nis Tamara
  Jaymes Tucker
  Warrick Terrance
  Shauna Celia
  Evaristo Garnette
  */

  const siteData = [
    {
      state: "Arizona",
      prisons: [
        {
          id: "az-perryville",
          name: "Perryville",
          contract: "ADCRR",
          instructor: "David Dean",
          students: 23,
        },
        {
          id: "az-cibola",
          name: "Cibola",
          contract: "ADCRR",
          instructor: "James Carter",
          students: 17
        },
        {
          id: "az-red-rock",
          name: "Red Rock",
          contract: "CoreCivic",
          instructor: "Suellen Elvin",
          students: 13
        },
        {
          id: "az-whetstone",
          name: "Whetstone",
          contract: "ADCRR",
          instructor: "Daniel Léana",
          students: 13
        }
      ]
    },
    {
      state: "Florida",
      prisons: [
        {
          id: "fl-fsp",
          name: "FSP",
          contract: "FDC",
          instructor: "Jared O'Neil",
          students: 17
        },
        {
          id: "fl-lowell",
          name: "Lowell",
          contract: "FDC",
          instructor: "Chris Demaria",
          students: 20
        },
        {
          id: "fl-srpc",
          name: "SRPC",
          contract: "FDC",
          instructor: "Tatiana Johnson",
          students: 20
        },
        {
          id: "fl-wakulla",
          name: "Wakulla",
          contract: "FDC",
          instructor: "Andrew Harper",
          students: 17
        }
      ]
    },
    {
      state: "Massachusetts",
      prisons: [
        {
          id: "ma-ncci",
          name: "NCCI",
          contract: "MADOC",
          instructor: "Alex Palacin",
          students: 7
        }
      ]
    },
    {
      state: "South Carolina",
      prisons: [
        {
          id: "sc-leath",
          name: "Leath",
          contract: "SCDC",
          instructor: "Nate Miller",
          students: 24
        }
      ]
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
    }
  ]

  return (
    <div className="p-6 space-y-10 bg-base-200 min-h-screen">
      {program ? (
        <>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-base-content text-center">
              {program.name}
            </h2>

            <div className="flex justify-center mb-6">
              <BreadCrumbs state={program.name} />
            </div>

            {program.name === "Arizona" && <AttendanceChart abbreviation={convertStateToAbbreviation(stateName)} />}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {program.sites.map((site) => (
                <Link
                  key={site.id}
                  to={`/admin/sites/${site.id}`}
                  className="hover:no-underline"
                >
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 border border-base-300 hover:border-secondary">
                    <div className="card-body">
                      <h3 className={`card-title text-primary`}>
                        {site.name}
                      </h3>

                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold">Contract: </span>
                          <span>{site.contract}</span>
                        </p>

                        <p>
                          <span className="font-semibold">Instructor: </span>
                          <span>{site.instructor}</span>
                        </p>

                        <p>
                          <span className="font-semibold">
                            Total Students:
                          </span>{" "}
                          {site.students}
                        </p>
                      </div>

                      <div className="card-actions justify-end mt-4">
                        <Link to="/admin/students/add">
                          <button className="btn btn-primary btn-sm">
                            Add Student
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default StudentProgramState