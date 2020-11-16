/* eslint-disable */
import * as d3 from "d3"
import { getMax, getMin } from "view/charts/createChartFunctions/chartHelpers"
import * as tooltips from "view/charts/tooltips/barTooltip"
import { buildHtml } from "view/charts/tooltips/tooltip"
import _ from "lodash"

export const drawBarChart = (colors, className, data, dataObject, height, state, width) => {
  const { selectedId } = state.ui_reducer
  const stream = state.stream_reducer[selectedId]

  const { period, flow } = stream
  const { mouseout } = tooltips
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

    const y = d3.scaleLinear().range([graphHeight, 0]).domain([min, max])
    const x = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    const rects = graph.append("g").selectAll("g").data(series)

    rects.exit().remove()

    const tooltip = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip`).style("opacity", 0).style("position", "absolute").style("top", "-100rem").style("right", "30rem")

    const rx = 12
    const ry = 4
 
    
    rects
      .enter()
      .append("g")
      .attr("fill", "steelblue")
      .attr("class", (d, i) => d.key)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .data(d => d)
      .attr("d", d => roundedRect(x(d.name), y(d.value), x.bandwidth(), y(0) - y(d.value), [10, 0, 0, 0]))
      // .attr("d", d => {
      //   console.log(d)
      //   return ` 
      //   M${x(d.data.year)},${y(d[1]) + ry}
      //   a${rx},${ry} 0 0 1 ${rx},${-ry}
      //   h${x.bandwidth() - 2 * rx}
      //   a${rx},${ry} 0 0 1 ${rx},${ry}
      //   v${height - y(d[0]) - y(d[1]) - ry}
      //   h${-x.bandwidth()}Z
      // `
      // })

      // .append("rect")
      // .attr("x", d => x(d.data.year))
      // .attr("borderRadius", "5px")
      // .attr("class", (d, i, n) => {
      //   const name = n[0].parentNode.className.animVal
      //   return `${name}`
      // })
      // .attr("opacity", (d, i, n) => {
      //   const name = n[0].parentNode.className.animVal
      //   return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
      // })
      // .attr("width", x.bandwidth())
      // .on("click", (d, i, n) => {
      //   const name = n[0].parentNode.className.animVal
      //   const id = Object.values(state.stream_reducer).filter(d => d.name === name)[0]["id"]
      //   set("selectedId", "ui_reducer", id)
      // })
      // .attr("y", d => y(d[1]))
      // .attr("height", d => (y(d[0]) > 0 ? y(d[0]) - y(d[1]) : 0))
      // .style("cursor", "pointer")
      // .on("mouseover", (d, i, n) => {
      //   const name = n[0].parentNode.className.animVal
      //   const color = colors[name]
      //   tooltip.html(() => buildHtml(className, color, d, dataObject, n, state))
      //   tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
      // })
      // .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
      // .on("mousemove", () => {
      //   tooltip
      //     .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
      //     .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
      // })

    // .transition(t)
    // .attrTween("width", d => widthTween(d, x))
    // .attr("y", d => y(d[1]))
    // .attr("height", d => (y(d[0]) > 0 ? y(d[0]) - y(d[1]) : 0))

    var ticks = [2020, 2040, 2060]
    var tickLabels = ["2020", "2040", "2060"]

    const xAxis = d3
      .axisBottom(x)
      .tickValues(ticks)
      .tickFormat(function (d, i) {
        return tickLabels[i]
      })

    const yAxis = d3
      .axisLeft(y)
      .ticks("2")
      .tickFormat(d => `${d / 1000}k`)

    if (!hideAxis) {
      yAxisGroup.call(yAxis)
      yAxisGroup.call(yAxis)
    }
  }

  update(data)
}

const widthTween = (d, x) => {
  let i = d3.interpolate(0, x.bandwidth())
  return function (t) {
    return i(t)
  }
}
