import * as d3 from "d3"
import { getSavingsArrayForChart } from "calculations/savings/create/createChartArray"


export const drawAreaChart = (className, dataObject, height, state, width) => {
//   const { selectedId, selectedPeriod, selectedUser } = state.ui_reducer
//   const { user1BirthYear, user1Name, user2Name } = state.user_reducer

  const margin = { top: 20, right: 100, bottom: 10, left: 100 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right
  const color = ["year", "#3B7B8E", "#7898a1", "#3B7B8E", " #7898a1", "#7898a1", "#7898a1"]

  const data = getSavingsArrayForChart(state, dataObject)

  d3.select(`.${className} > *`).remove()

  //const stackedKeys = Object.keys(data[15]).filter(d => d !== "year")

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 100 ? graphHeight : 100)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const update = data => {
    const d3Max = 1000000 // d3.max(data, d =>  d.interest + d.principle)

    const area = d3
      .area()
      .x(d => xScale(d.data.year))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis) //sets the lines to be less jagged

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    var layer = graph.selectAll(".layer").enter().append("g").attr("class", "layer")

    layer
      .append("path")
      .attr("class", "area")
      .style("fill", (d, i) => color[i])
      .attr("d", area)

    const xAxisGroup = graph.append("g").attr("transform", `translate(0, ${graphHeight})`).attr("class", "axis")

    const yAxisGroup = graph.append("g").attr("class", "axis")

    const xAxis = d3.axisBottom(xScale).tickValues([])

    const yAxis = d3
      .axisLeft(yScale)
      .ticks("3")
      .tickFormat(d => `${d / 1000}k`)

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
  }

  update(data)
}
