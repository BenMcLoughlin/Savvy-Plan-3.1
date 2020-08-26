import * as d3 from "d3"
import { savingBarChartTooltip } from "charts/tooltips/tooltip"
import { getMax, getMin } from "charts/createChartFunctions/chartHelpers"
import * as tooltips from "charts/tooltips/tooltip"

export const drawBarChart = (colors, className, data, dataObject, height, set, state, width) => {
  const { selectedId, selectedPeriod } = state.ui_reducer

  const instance = state.main_reducer[selectedId]
  const { mouseout } = tooltips
  let periodStart = 0
  let periodEnd = 0
  let streamName = ""

  if (instance) {
    streamName = instance.name
    periodStart = instance[`period${selectedPeriod}StartYear`]
    periodEnd = instance[`period${selectedPeriod}EndYear`]
  }

  const margin = { top: 20, right: 100, bottom: 20, left: 100 }
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

  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "-100rem")
    .style("right", "30rem")

  const update = data => {
    const max = getMax(className, dataObject, state)
    console.log("max:", max)
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
      .attr("fill", (d, i) => {
        if (colors[d.key]) {
          return colors[d.key]
        } else return "#5E9090"
      })
      .attr("class", (d, i) => d.key)
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.data.year))
      .attr("opacity", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
      })
      .attr("width", xScale.bandwidth())
      .on("click", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        const id = Object.values(state.main_reducer).filter(d => d.name === name)[0]["id"]
        set("selectedId", "ui_reducer", id)
      })
      .on("mouseover", (d, i, n) => {
        const createTooltip = tooltips[className]
        createTooltip(d, dataObject, i, tooltip, n, state)
      })
      .on("mouseout", (d, i, n) => mouseout(i, periodStart, periodEnd, n, streamName, tooltip))
      .on("mousemove", () => null)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => (yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0))

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

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
  }

  update(data)
}
