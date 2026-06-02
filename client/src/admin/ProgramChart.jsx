import { useEffect } from "react"
import { useNavigate } from "react-router"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import usaJson from "./us-states.json"

const ProgramChart = ({ programs }) => {
  const navigate = useNavigate()
  echarts.registerMap("USA", usaJson)

  const highlightedStates = programs.map((state) => state.name)

  const chartData = programs.map((state) => ({
    name: state.name,
    value: 1,
    itemStyle: {
      // areaColor: "#ec4899",
      areaColor: "var(--color-primary)",
    }
  }))

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
            <div style="font-size:20px;font-weight:700;color:var(--color-primary);margin-bottom:14px;">
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
            areaColor: "var(--color-secondary)",
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
      }
    ]
  }

  return (
    <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden p-6">
      <ReactECharts
        option={option}
        style={{ height: "700px", width: "100%" }}
        opts={{ renderer: "svg" }}
        onEvents={events}
      />
    </div>
  )
}

export default ProgramChart