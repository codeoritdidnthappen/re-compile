import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import { getPrograms } from "../programs/programsSlice"
import usaJson from "./us-states.json"

const ProgramChartCard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  echarts.registerMap("USA", usaJson)

  const { programs } = useSelector((state) => state.programs)

  const highlightedStates = [
    "Arizona",
    "Florida",
    "South Carolina",
    "Massachusetts",
    "Nebraska"
  ]

  const chartData = highlightedStates.map((stateName) => ({
    name: stateName,
    value: 1,
    itemStyle: {
      areaColor: "var(--color-primary)",
    }
  }))

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "var(--color-base-100)",
      borderColor: "var(--color-secondary)",
      borderWidth: 1,
      textStyle: {
        color: "var(--color-secondary)",
      },
      extraCssText:
        "border-radius: 18px; padding: 0; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.45);",
      formatter: (params) => {
        const state = Object.values(programs).find(
          (s) => s.name === params.name
        )
        return `<div style="padding:12px;color:#a1a1aa;">${params.name}</div>`;
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
        data: chartData
      }
    ]
  }

  return (
    <div className="bg-base-100 border border-primary rounded-3xl shadow-2xl overflow-hidden p-6 w-80 h-80 cursor-pointer">
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  )
}

export default ProgramChartCard