/* eslint-disable */
import * as d3 from "d3"
import * as u from "model/utils"
import * as tooltip from "view/charts/tooltips"
import * as axis from "view/charts/axis"
import _ from "lodash"

export const bar = (colors, chartName, allData, height, state, width) => {
  const { selectedId } = state.ui_reducer
  const stream = state.stream_reducer[selectedId]

  const { chartData: data } = allData

  const { period, flow } = stream

  let periodStart = 0
  let periodEnd = 0
  let streamName = ""

  const selectedPeriod = stream[`period${_.startCase(flow)}`]

  if (stream) {
    streamName = stream.name
    periodStart = stream[flow][selectedPeriod].start
    periodEnd = stream[flow][selectedPeriod].end
  }

  const { hideAxis } = state.ui_reducer

  const margin = { top: 100, right: 100, bottom: 70, left: 80 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  d3.select(`.${chartName}`).selectAll("*").remove()

  const svg = d3.select(`.${chartName}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const stackedKeys = Object.keys(data[15]).filter(d => d !== "year")

  const graph = svg
    .append("g")
    .attr("height", 400) //graphHeight > 0 ? graphHeight : 0)
    .attr("width", 500) //graphWidth)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const stack = d3
    .stack()
    .keys(stackedKeys)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetDiverging)

  const update = data => {
    const max = u.getMax(chartName, allData)

    const min = 0 //getMin(chartName, allData, state)

    const series = stack(data)

    const y = d3.scaleLinear().range([graphHeight, 0]).domain([min, max])
    const x = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(
        data.map(d => {
          return +d.year
        })
      )

    const rects = graph.append("g").selectAll("g").data(series)

    rects.exit().remove()

    rects
      .enter()
      .append("g")
      .attr("fill", (d, i) => (colors[d.key] ? colors[d.key] : "#5E9090"))
      .attr("class", (d, i) => d.key)
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => x(d.data.year))
      .attr("width", x.bandwidth())
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("y", d => y(d[1]))
      .attr("cursor", "pointer")
      .attr("class", "pointer")
      .attr("class", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return `${name}`
      })
      .attr("opacity", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd
          ? 0.7
          : 1
      })

    // .on("click", (d, i, n) => {
    //   const name = n[0].parentNode.className.animVal
    //   const id = Object.values(state.stream_reducer).filter(d => d.name === name)[0]["id"]
    //   set("selectedId", "ui_reducer", id)
    // })

    // incomeBarTooltip(colors, chartName, allData)

    tooltip[chartName](allData, colors, chartName, graph, y, x)

    axis.bubbleY(graph, y)
    axis.xYear(graph, x)
  }

  update(data)
}
