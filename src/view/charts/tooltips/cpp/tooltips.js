import * as d3 from "d3"
import { cppCenterTooltipHtml, axisHtml } from "view/charts/tooltips/cpp/html"
import * as u from "model/utils"
import * as svg from "view/charts/tooltips/svgs/index"

export const cpp = (allData, colors, chartName, graph, y, x) => {
  //export const cpp = (chartName, data, graph, height, allData, y, x, width) => {
  const { chartData: data, state, user } = allData

  const { firstName, cppPayment, cppStartAge, oasStartAge } = state.user_reducer[user] || { firstname: "ben", cppStartAge: 65 }

  const selectedAge = chartName.slice(0, 3) === "cpp" ? cppStartAge : oasStartAge

  const d = data.filter(income => income.year === selectedAge)[0]

  const tooltip1 = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", y(d.value) - 60 + "px")
    .style("left", x(selectedAge) - 50 + "px")
    .html(() => cppCenterTooltipHtml(allData, selectedAge))

  svg.addCircle(graph, x(selectedAge), y(d.value))

  graph
    .append("text")
    .attr("chartName", "point")
    .attr("x", -40 + "px")
    .attr("y", y(6000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1.6rem")
    .text(u.asCurrency(data[0].value))

  graph
    .append("text")
    .attr("chartName", "point")
    .attr("x", -40 + "px")
    .attr("y", y(8000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age ${data[0].year}`)

  graph
    .append("text")
    .attr("chartName", "point")
    .attr("x", x(70) + 15 + "px")
    .attr("y", y(12000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1.6rem")
    .text(u.asCurrency(data[data.length - 1].value))

  graph
    .append("text")
    .attr("chartName", "point")
    .attr("x", x(70) + 15 + "px")
    .attr("y", y(14000) + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age ${data[data.length - 1].year}`)
}
