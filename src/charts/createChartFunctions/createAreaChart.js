import * as d3 from "d3"
import { areaTooltip, removeAreaTooltip } from "charts/tooltips/tooltip"

export const drawAreaChart = (colors, className, data, dataObject, height, set, state, width) => {
  const margin = { top: 20, right: 100, bottom: 10, left: 100 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()
  d3.selectAll(`circle`).remove()

  const stackedKeys = Object.keys(data[0])

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 100 ? graphHeight : 100)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const stack = d3.stack().keys(stackedKeys).order(d3.stackOrderNone).offset(d3.stackOffsetDiverging)

  var defs = svg.append("defs")

  var gradient = defs.append("linearGradient").attr("id", "svgGradient").attr("x1", "0%").attr("x2", "100%").attr("y1", "0%").attr("y2", "100%")

  gradient.append("stop").attr("class", "start").attr("offset", "0%").attr("stop-color", "#5E9090").attr("stop-opacity", 1)

  gradient.append("stop").attr("class", "end").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1)

  const update = data => {
    const d3Max = 500000 //d3.max(data, d => Object.values(d).reduce((a, n) => +a + +n)) + 500000

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])

    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    const area = d3
      .area()
      .x(d => xScale(d.data.year))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveBasis) //sets the lines to be less jagged

    var layer = graph.selectAll(".layer").data(stack(data)).enter().append("g").attr("class", "layer")

    layer
      .append("path")
      .attr("class", "area")
      .attr("fill", "url(#svgGradient)")
      .attr("id", "chart")
      .style("opacity", (d, i) => (i > 3 ? 0.3 : 1))
      .attr("d", area)


    graph
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.year))
      .attr("y", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
      .attr("width", 15)
      .attr("height", 400)
      .attr("opacity", "0")
      .attr("z-index", "10000")
      .on("mouseover", (d, i, n) => {
        d3.select(n[i]).transition().duration(100)
        areaTooltip(className, d, data, graph, xScale, yScale)
      })
      .on("mouseout", (d, i, n) => {
        d3.select(n[i]).transition().duration(100).attr("opacity", 0)
        removeAreaTooltip(className)
      })

    const yAxisGroup = graph.append("g").attr("class", "axis")

    const yAxis = d3
      .axisLeft(yScale)
      .ticks("3")
      .tickFormat(d => `${d / 1000}k`)

    yAxisGroup.call(yAxis)
  }

  update(data)
}

//ORIGINAL WORKS

// export const drawAreaChart = (colors, className, data, dataObject, height, set, state, width) => {
//   const margin = { top: 20, right: 100, bottom: 10, left: 100 }
//   const graphHeight = height - margin.top - margin.bottom
//   const graphWidth = width - margin.left - margin.right
//   const color = ["year", "#3B7B8E", "#7898a1", "#3B7B8E", " #7898a1", "#7898a1", "#7898a1"]

//   d3.select(`.${className} > *`).remove()

//   const stackedKeys = Object.keys(data[0])

//   const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

//   const graph = svg
//     .append("g")
//     .attr("height", graphHeight > 100 ? graphHeight : 100)
//     .attr("width", graphWidth)
//     .attr("transform", `translate(${margin.left}, ${margin.top})`)
//   const stack = d3.stack().keys(stackedKeys).order(d3.stackOrderNone).offset(d3.stackOffsetDiverging)

//   var defs = svg.append("defs")

//   var gradient = defs.append("linearGradient").attr("id", "svgGradient").attr("x1", "0%").attr("x2", "100%").attr("y1", "0%").attr("y2", "100%")

//   gradient.append("stop").attr("class", "start").attr("offset", "0%").attr("stop-color", "#5E9090").attr("stop-opacity", 1)

//   gradient.append("stop").attr("class", "end").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1)

//   const update = data => {
//     const d3Max = 500000 //d3.max(data, d => Object.values(d).reduce((a, n) => +a + +n)) + 500000

//     const area = d3
//       .area()
//       .x(d => xScale(d.data.year))
//       .y0(d => yScale(d[0]))
//       .y1(d => yScale(d[1]))
//       .curve(d3.curveBasis) //sets the lines to be less jagged

//     const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
//     const xScale = d3
//       .scaleBand()
//       .range([0, graphWidth])
//       .paddingInner(0.2)
//       .paddingOuter(0.3)
//       .domain(data.map(item => item.year))

//     var layer = graph.selectAll(".layer").data(stack(data)).enter().append("g").attr("class", "layer")

//     layer
//       .append("path")
//       .attr("class", "area")
//       .attr("fill", "url(#svgGradient)")
//       .attr("id", "chart")
//       .style("opacity", (d, i) => (i > 3 ? 0.3 : 1))
//       .attr("d", area)

//     const yAxisGroup = graph.append("g").attr("class", "axis")

//     const yAxis = d3
//       .axisLeft(yScale)
//       .ticks("3")
//       .tickFormat(d => `${d / 1000}k`)

//     yAxisGroup.call(yAxis)
//   }

//   update(data)
// }
