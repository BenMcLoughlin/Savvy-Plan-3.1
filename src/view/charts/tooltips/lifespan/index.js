import * as d3 from "d3"
import { lifespanTooltipHtml, lifespanTooltipHtml2 } from "view/charts/tooltips/lifespan/html"

export const lifespan = (allData, colors, chartName, graph, y, x) => {
  const tooltip = d3.select(`.${chartName}`).append("div").attr("class", `${chartName}tooltip`).style("opacity", 0).style("position", "absolute")
  const tooltip2 = d3.select(`.${chartName}`).append("div").attr("class", `${chartName}tooltip2`).style("opacity", 0).style("position", "absolute")

  graph
    .append("text")
    .attr("x", x(65) + 10 + "px")
    .attr("y", y(0) + 30 + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age 65`)

  graph
    .append("text")
    .attr("x", x(110) - 65 + "px")
    .attr("y", y(0) + 30 + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age 110`)

  d3.selectAll(`.${chartName}Rect`)
    .on("mouseover", (d, i, n) => {
      graph
        .append("line")
        .attr("x1", x(d.year)) //d => x(d.year))
        .attr("x2", x(d.year)) //d => x(d.year))
        .attr("y1", -35) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
        .attr("y2", 900) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")
        .attr("stroke-dasharray", "5")
        .attr("stroke-linecap", "round")
        .attr("id", "areaLineRect")

      graph
        .append("circle")
        .attr("r", 5)
        .attr("cx", x(d.year))
        .attr("cy", y(+Object.values(d)[2] + +Object.values(d)[1]))

        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")

      graph
        .append("circle")
        .attr("r", 5)
        .attr("cx", x(d.year))
        .attr("cy", y(Object.values(d)[1]))
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")

      tooltip.html(lifespanTooltipHtml(d)).style("opacity", 1)
      tooltip2.html(lifespanTooltipHtml2(d)).style("opacity", 1)

      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
      tooltip2.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll("circle").remove()
      d3.selectAll("line").remove()
      tooltip.transition().duration(500).style("opacity", 0)
      tooltip2.transition().duration(500).style("opacity", 0)
    })
    .on("mousemove", d => {
      tooltip
        .style("opacity", 1)
        .style("left", () => d3.event.layerX + 30 + "px")
        .style("top", () => y(Object.values(d)[2]) - 40 + "px")

      tooltip2
        .style("opacity", 1)
        .style("left", () => d3.event.layerX - 40 + "px")
        .style("top", "-20px")
    })
}
