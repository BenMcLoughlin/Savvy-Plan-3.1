import { stackedTooltipHtml, stackedTooltipValuesHtml } from "view/charts/tooltips/savingsStackedArea/html"
import * as d3 from "d3"

export const stackedAreaTooltip = (className, dataObject, graph, state, xScale, yScale) => {
  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", 50 + "px")
    .style("left", 200 + "px")

  const tooltip2 = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip2`).style("opacity", 0).style("position", "absolute")

  const tooltip3 = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip3`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "5rem")
    .style("left", xScale(d => d.year) - 60 + "px")

  d3.selectAll(`.${className}Rect`)
    .on("mouseover", (d, i, n) => {
      graph
        .append("line")
        .attr("x1", xScale(d.year)) //d => xScale(d.year))
        .attr("x2", xScale(d.year)) //d => xScale(d.year))
        .attr("y1", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
        .attr("y2", 1000) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")
        .attr("stroke-dasharray", "5")
        .attr("stroke-linecap", "round")
        .attr("id", "areaLineRect")

      graph
        .append("circle")
        .attr("className", "point")
        .attr("r", 5)
        .attr("cx", xScale(d.year))
        .attr("cy", yScale(Object.values(d)[2]))
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")

      graph
        .append("circle")
        .attr("className", "point")
        .attr("r", 5)
        .attr("cx", xScale(d.year))
        .attr("cy", yScale(+Object.values(d)[2] + +Object.values(d)[1]))
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")

      tooltip.html(stackedTooltipHtml(d, dataObject, state)).style("opacity", 1)
      tooltip2.style("opacity", 1).html(stackedTooltipValuesHtml(d, dataObject, "user1"))
      tooltip3.style("opacity", 1).html(stackedTooltipValuesHtml(d, dataObject, "user1")).style("opacity", 1)
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll(`circle`).remove()
      d3.selectAll(`line`).remove()
      tooltip.transition().duration(500).style("opacity", 0)
      tooltip2.transition().duration(5500).style("opacity", 0)
      tooltip3.transition().duration(5500).style("opacity", 0)
    })
    .on("mousemove", d => {
      tooltip.style("opacity", 1)

      tooltip2
        .style("opacity", 1) //THIS IS USER 2
        .style("top", yScale(Object.values(d)[2]) + 70 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
        .style("background", "red") // always 10px to the right of the mouse
      tooltip3
        .style("opacity", 1) //THIS IS USER 1
        .style("top", yScale(+Object.values(d)[2] + +Object.values(d)[1]) + 10 + "px") //() => d3.event.layerY - 0 + "px") //
        .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
    })
}
