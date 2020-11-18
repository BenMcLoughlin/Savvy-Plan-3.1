/* eslint-disable */
import * as d3 from "d3"
import { getMax, getMin } from "view/charts/drawCharts/chartHelpers"
import { nestEggDonutTooltip } from "view/charts/tooltips/nestEggDonut/tooltip"
import _ from "lodash"

export const drawDonutChart = (colors, className, data, height, width, state) => {

  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()

  const margin = { top: 30, right: 100, bottom: 20, left: 140 }
  const graphHeight = height - margin.top - margin.bottom - 100
  const graphWidth = width - margin.left - margin.right - 100

  const radius = graphWidth / 4

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`)

  const graph = svg.append("g").attr("transform", `translate(${graphWidth / 2.2},${graphHeight / 2.5})`)

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.value)

  const arcPath = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius / 2)

  // ordinal colour scale
  const color = ["#88adbf", "#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

  const titleList = ["After Tax Income", "Tax Credit Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]

  const colorScale = d3.scaleOrdinal().domain(titleList).range(color)

  const update = data => {
    const paths = graph.selectAll("path").data(pie(data))

    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", arcPath)
      .attr("fill", (d, i) => color[i])
      .attr("cursor", "pointer")

    nestEggDonutTooltip(className, data, state)
  }
  update(data)
}

export const createDonutData = state => {
  const { user1, user2 } = state.user_reducer
  return [{ name: user1.firstName }]
}
