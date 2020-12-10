/* eslint-disable */
import * as d3 from "d3"
import * as u from "model/utils"
import * as tooltip from "view/charts/tooltips"

export const area = (colors, chartName, allData, height, state, width) => {
  const margin = { top: 60, right: 50, bottom: 40, left: 50 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  d3.select(`.${chartName}`).selectAll("*").remove()

  const { chartData: data } = allData

  const { length } = data

  const stackedKeys = Object.keys(data[0])
    .filter(d => d !== "year")
    .filter(d => d !== "contribution")
    .filter(d => d !== "withdrawal")

  const svg = d3.select(`.${chartName}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 100 ? graphHeight : 100)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left + 10}, ${margin.top})`)

  const stack = d3.stack().keys(stackedKeys).offset(d3.stackOffsetDiverging)

  const color = colors[chartName]

  var defs = svg.append("defs")

  var gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "100%")

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", color)
    .attr("stop-opacity", 1)

  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 1)

  const update = data => {
    const d3Max = u.getMax(chartName, allData)

    const y = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])

    const x = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    const area = d3
      .area()
      .x(d => x(d.data.year))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveBasis) //sets the lines to be less jagged

    var layer = graph
      .selectAll(".layer")
      .data(stack(data))
      .enter()
      .append("g")
      .attr("class", "layer")

    layer
      .append("path")
      .attr("class", "area")
      .attr("fill", "url(#svgGradient)")
      .attr("id", "chart")
      .attr("cursor", "pointer")
      .style("opacity", (d, i) => (i > 3 ? 0.3 : 1))
      .raise()
      .attr("d", area)
      .attr("stroke-width", 2)
      .attr("stroke", "#F8F8F7")

    graph
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.year))
      .attr("y", -40)
      .attr("cursor", "pointer")
      .attr("width", width / length)
      .attr("height", height)
      .attr("class", `${chartName}Rect`)
      .attr("opacity", "0")
      .raise()

    tooltip[chartName](allData, colors, chartName, graph, y, x)
  }
  update(data)
}
