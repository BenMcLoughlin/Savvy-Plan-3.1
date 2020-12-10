/* eslint-disable */
import * as d3 from "d3"
import * as tooltip from "view/charts/tooltips"
import _ from "lodash"

export const donut = (colors, chartName, allData, height, state, width) => {
  const { chartData: data } = allData
  console.log("colors:", colors)
  d3.select(`.${chartName}`).selectAll("*").remove()

  const margin = { top: 30, right: 100, bottom: 20, left: 140 }
  const graphHeight = height - margin.top - margin.bottom - 100
  const graphWidth = width - margin.left - margin.right - 100

  const radius = graphWidth / 2.6

  const svg = d3
    .select(`.${chartName}`)
    .append("svg")
    .attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`)

  const graph = svg.append("g").attr("transform", `translate(${graphWidth / 2},${graphHeight / 6})`)

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.value)

  const arcPath = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius / 2)

  const update = data => {
    const paths = graph.selectAll("path").data(pie(data))

    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", arcPath)
      .attr("fill", (d, i) => colors[d.data.account])
      .attr("cursor", "pointer")

    tooltip[chartName](allData, colors, chartName, graph)
  }
  update(data)
}

export const createDonutData = state => {
  const { user1, user2 } = state.user_reducer
  return [{ name: user1.firstName }]
}
