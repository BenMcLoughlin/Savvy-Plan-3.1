import { stackedTooltipHtml } from "view/charts/tooltips/landingSavings/html"
import * as d3 from "d3"
import * as svg from "view/charts/tooltips/svgs/index"

export const landingSavings = (allData, colors, chartName, graph, y, x) => {
  const tooltip = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", 50 + "px")
    .style("left", 200 + "px")

  const tooltip2 = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip2`)
    .style("opacity", 0)
    .style("position", "absolute")

  d3.selectAll(`.${chartName}Rect`)
    .on("mouseover", (d, i, n) => {
      svg.addText(graph, x(d.year) - 35, -40, `Age ${d.year - 1990}`)
      svg.addLine(graph, x(d.year), x(d.year), -30, 1000)
      svg.addCircle(graph, x(d.year), y(Object.values(d)[1]))
      svg.addCircle(graph, x(d.year), y(+Object.values(d)[2] + +Object.values(d)[1]))

      tooltip.html(stackedTooltipHtml(d, allData, "user1", "Has plan - ")).style("opacity", 1)
      tooltip2.html(stackedTooltipHtml(d, allData, "user2", "No plan - " )).style("opacity", 1)
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll(`circle`).remove()
      d3.selectAll(`text`).remove()
      d3.selectAll(`line`).remove()
    })
    .on("mousemove", d => {
      tooltip
        .style("opacity", 1)
        .style("top", y(+Object.values(d)[2] + +Object.values(d)[1]) + 10 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX + 20 + "px") // always 10px to the right of the mouse

      tooltip2
        .style("opacity", 1) //THIS IS USER 2
        .style("top", y(Object.values(d)[2]) + 160 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX + 20 + "px") // always 10px to the right of the mouse
    })
}
