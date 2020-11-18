import * as d3 from "d3"
import { cppCenterTooltipHtml, axisHtml } from "view/charts/tooltips/cppArea/html"

export const cppAreaTooltip = (className, data, graph, state, yScale, xScale) => {
  const { user } = data[0]

  const { firstName, cppPayment, cppStartAge, oasStartAge } = state.user_reducer[user] || { firstname: "ben", cppStartAge: 65 }

  const selectedAge = className.slice(0, 3) === "cpp" ? cppStartAge : oasStartAge

  const d = data.filter(income => income.year === selectedAge)[0]

  const tooltip1 = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", yScale(d.value) - 100 + "px")
    .style("left", xScale(selectedAge) - 70 + "px")
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

  const tooltip2 = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip2`)
    .style("position", "absolute")
    .style("top", yScale(data[0].value) + 30 + "px")
    .style("left", xScale(data[0].year) - 140 + "px")
    .html(() => axisHtml(data[0], data[0].year))

  const tooltip3 = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip3`)
    .style("position", "absolute")
    .style("top", yScale(data[data.length - 1].value) + 30 + "px")
    .style("left", xScale(70) - 60 + "px")
    .html(() => axisHtml(data[data.length - 1], 70))


}
