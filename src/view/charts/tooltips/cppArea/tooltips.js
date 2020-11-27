import * as d3 from "d3"
import { cppCenterTooltipHtml, axisHtml } from "view/charts/tooltips/cppArea/html"
import { round } from "view/charts/drawCharts/chartHelpers"

export const cppAreaTooltip = (className, data, graph, height, state, yScale, xScale, width) => {
  const { user } = data[0]

  const { firstName, cppPayment, cppStartAge, oasStartAge } = state.user_reducer[user] || { firstname: "ben", cppStartAge: 65 }

  const selectedAge = className.slice(0, 3) === "cpp" ? cppStartAge : oasStartAge
console.log('data:', data)
  const d = data.filter(income => income.year === selectedAge)[0]

  const tooltip1 = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", yScale(d.value) - 120 + "px")
    .style("left", xScale(selectedAge) - 50 + "px")
    .html(() => cppCenterTooltipHtml(data, selectedAge, state))

  graph
    .append("circle")
    .attr("className", "point")
    .attr("r", 5)
    .attr("cx", xScale(selectedAge) + "px")
    .attr("cy", yScale(d.value) + "px")
    .attr("fill", "white")
    .attr("stroke-width", 2)
    .attr("stroke", "#72929B")

  graph
    .append("text")
    .attr("className", "point")
    .attr("x", -40 + "px")
    .attr("y", yScale(6000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1.6rem")
    .text(round(data[0].value))

  graph
    .append("text")
    .attr("className", "point")
    .attr("x", -40 + "px")
    .attr("y", yScale(8000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age ${data[0].year}`)

  graph
    .append("text")
    .attr("className", "point")
    .attr("x", xScale(70) + 15 + "px")
    .attr("y", yScale(12000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1.6rem")
    .text(round(data[data.length - 1].value))

  graph
    .append("text")
    .attr("className", "point")
    .attr("x", xScale(70) + 15 + "px")
    .attr("y", yScale(14000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age ${data[data.length-1].year}`)

  }