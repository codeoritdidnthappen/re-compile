import { useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import { getPrograms } from "../programs/programsSlice"
import usaJson from "./us-states.json"

const USStudentProgramMap =() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { programs } = useSelector((state) => state.programs)

  useEffect(() => {
    echarts.registerMap("USA", usaJson)
    const token = localStorage.getItem("token")
    dispatch(getPrograms({ token, year:new Date().getFullYear() }))
  }, [])
  
  const stateData = {
    AZ: {
      name: "Arizona",
      applied: 240,
      accepted: 180,
      completed: 142,
      attendance: 91,
      jobs: 88,
      techJobs: 41,
    },
    FL: {
      name: "Florida",
      applied: 295,
      accepted: 220,
      completed: 173,
      attendance: 93,
      jobs: 109,
      techJobs: 52,
    },
    MA: {
      name: "Massachusetts",
      applied: 13,
      accepted: 10,
      completed: 0,
      attendance: 80,
      jobs: 0,
      techJobs: 0,
    },
    NE: {
      name: "Nebraska",
      applied: 120,
      accepted: 92,
      completed: 68,
      attendance: 82,
      jobs: 39,
      techJobs: 14,
    },
    SC: {
      name: "South Carolina",
      applied: 135,
      accepted: 101,
      completed: 77,
      attendance: 84,
      jobs: 48,
      techJobs: 19,
    }
  };

  const highlightedStates = [
    "Arizona",
    "Florida",
    "South Carolina",
    "Massachusetts",
    "Nebraska",
  ];

  const chartData = highlightedStates.map((stateName) => ({
    name: stateName,
    value: 1,
    itemStyle: {
      // areaColor: "#ec4899",
      areaColor: "var(--color-primary)",
    },
  }));

  const events = {
    "click": (params) => {
      // If clicked on a state, navigate to that state's program page
      if (highlightedStates.includes(params.name)) {
        navigate(`/admin/programs/${params.name}`)
      }
    },
    // "legendselectchanged": (params) => console.log(params),
  }

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "#111827",
      borderColor: "#374151",
      borderWidth: 1,
      textStyle: {
        color: "#ffffff",
      },
      extraCssText:
        "border-radius: 18px; padding: 0; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.45);",
      formatter: (params) => {
        const state = Object.values(programs).find(
          (s) => s.name === params.name
        );

        if (!state) {
          return `<div style="padding:12px;color:#a1a1aa;">${params.name}</div>`;
        }

        return `
          <div style="min-width:320px;padding:18px;font-family:sans-serif;">
            <div style="font-size:20px;font-weight:700;color:#f472b6;margin-bottom:14px;">
              ${state.name}
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Students Applied</span>
              <strong>${state.applied}</strong>
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Students Accepted</span>
              <strong>${state.accepted}</strong>
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Completed Program</span>
              <strong>${state.completed}</strong>
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Retention</span>
              <strong style="color:#4ade80;">
                ${state.retention}%
              </strong>
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Attendance</span>
              <strong style="color:#67e8f9;">
                ${state.attendance}%
              </strong>
            </div>

            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span>Jobs After Release</span>
              <strong>${state.jobs}</strong>
            </div>

            <div style="display:flex;justify-content:space-between;">
              <span>Tech Jobs After Release</span>
              <strong style="color:#fb923c;">
                ${state.techJobs}
              </strong>
            </div>
          </div>
        `;
      },
    },
    series: [
      {
        type: "map",
        map: "USA",
        roam: false,
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: "#fb7185",
          },
        },
        itemStyle: {
          borderColor: "#18181b",
          borderWidth: 1,
          areaColor: "#27272a",
        },
        data: chartData,
        // point: {
        //   events: {
        //     click: (e) => { console.log(this); console.log(e.point.category); console.log(e.point.y);  }
        //   }
        // },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-200 text-white p-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-primary">
            Student Program Outcomes by State
          </h1>
          <p className="text-lg text-secondary">
            Hover over highlighted states to view student metrics.
          </p>
        </div>

        <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden p-6">
          <ReactECharts
            option={option}
            style={{ height: "700px", width: "100%" }}
            opts={{ renderer: "svg" }}
            onEvents={events}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {Object.entries(programs).map(([code, state]) => (
            <Link key={code} to={`/admin/programs/${state.name}`}>
              <div
                className="bg-base-100 border border-neutral rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">{state.name}</h3>
                  <div className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                    {state.abbreviation}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-accent">
                  <div className="flex justify-between">
                    <span>Applied</span>
                    <span>{state.applied}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accepted</span>
                    <span>{state.accepted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span>{state.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention</span>
                    <span>{state.retention}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance</span>
                    <span>{state.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs</span>
                    <span>{state.jobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tech Jobs</span>
                    <span>{state.techJobs}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default USStudentProgramMap
