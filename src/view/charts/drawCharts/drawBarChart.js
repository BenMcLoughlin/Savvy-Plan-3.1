/* eslint-disable */
import * as d3 from "d3"
import { getMax, getMin } from "view/charts/drawCharts/chartHelpers"
import { incomeBarTooltip } from "view/charts/tooltips/incomeBar/tooltip"
import _ from "lodash"

export const drawBarChart = (colors, className, data, dataObject, height, state, width) => {
  const { selectedId } = state.ui_reducer
  const stream = state.stream_reducer[selectedId]

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

  const margin = { top: 30, right: 100, bottom: 20, left: 140 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const stackedKeys = Object.keys(data[15]).filter(d => d !== "year")

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 0 ? graphHeight : 0)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const xAxisGroup = graph.append("g").attr("transform", `translate(0, ${graphHeight})`).attr("class", "axis")

  const yAxisGroup = graph.append("g").attr("class", "axis")

  const stack = d3.stack().keys(stackedKeys).order(d3.stackOrderNone).offset(d3.stackOffsetDiverging)

  const update = data => {
    const max = getMax(className, dataObject)

    const min = getMin(className, dataObject, state)

    const series = stack(data)

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([min, max])
    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

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
      .attr("x", d => xScale(d.data.year))
      .attr("class", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return `${name}`
      })
      .attr("opacity", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
      })
      .attr("width", xScale.bandwidth())
      .on("click", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        const id = Object.values(state.stream_reducer).filter(d => d.name === name)[0]["id"]
        set("selectedId", "ui_reducer", id)
      })
      .attr("y", d => yScale(d[1]))
      .attr("height", d => (yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0))
      .attr("cursor", "pointer")

    incomeBarTooltip(colors, className, dataObject, state)

    var ticks = [2020, 2040, 2060]
    var tickLabels = ["2020", "2040", "2060"]

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(ticks)
      .tickFormat(function (d, i) {
        return tickLabels[i]
      })

    const yAxis = d3
      .axisLeft(yScale)
      .ticks("2")
      .tickFormat(d => `${d / 1000}k`)

    if (!hideAxis) {
      yAxisGroup.call(yAxis)
      yAxisGroup.call(yAxis)
    }
  }

  update(data)
}
