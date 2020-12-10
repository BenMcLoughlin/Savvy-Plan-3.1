import { stackedTooltipHtml, stackedTooltipValuesHtml } from "view/charts/tooltips/introSavings/html"
import * as d3 from "d3"
import * as svg from "view/charts/tooltips/svgs/index"

export const introSavings = (allData, colors, chartName, graph, y, x) => {
  const tooltip = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", 50 + "px")
    .style("left", 200 + "px")

  const tooltip2 = d3.select(`.${chartName}`).append("div").attr("class", `${chartName}tooltip2`).style("opacity", 0).style("position", "absolute")

  const tooltip3 = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip3`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "5rem")
    .style("left", x(d => d.year) - 60 + "px")

  d3.selectAll(`.${chartName}Rect`)
    .on("mouseover", (d, i, n) => {

      svg.addText(graph, x(d.year) - 35, -40, `Age ${d.year - 1990}`)
      svg.addLine(graph, x(d.year), x(d.year), 0, 1000)
      svg.addCircle(graph, x(d.year), y(Object.values(d)[1]))
      svg.addCircle(graph, x(d.year), y(+Object.values(d)[2] + +Object.values(d)[1]))

      tooltip.html(stackedTooltipHtml(d, allData)).style("opacity", 1)
      tooltip2.style("opacity", 1).html(stackedTooltipValuesHtml(d, allData, "user1"))
      tooltip3.style("opacity", 1).html(stackedTooltipValuesHtml(d, allData, "user1")).style("opacity", 1)
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll(`circle`).remove()
      d3.selectAll(`text`).remove()
      d3.selectAll(`line`).remove()
      tooltip.transition().duration(500).style("opacity", 0)
      tooltip2.transition().duration(5500).style("opacity", 0)
      tooltip3.transition().duration(5500).style("opacity", 0)
    })
    .on("mousemove", d => {
      tooltip.style("opacity", 1)

      tooltip2
        .style("opacity", 1) //THIS IS USER 2
        .style("top", y(Object.values(d)[2]) + 70 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
        .style("background", "red") // always 10px to the right of the mouse
      tooltip3
        .style("opacity", 1) //THIS IS USER 1
        .style("top", y(+Object.values(d)[2] + +Object.values(d)[1]) + 10 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
    })
}
