import * as d3 from "d3"
import { incomeHtml } from "charts/tooltips/tooltipHtml/incomeHtml"
import { savingsBarHtml } from "charts/tooltips/tooltipHtml/savingsBarHtml"
import { savingsAreaHtml } from "charts/tooltips/tooltipHtml/savingsAreaHtml"
import { getPeakYear } from "charts/createChartFunctions/chartHelpers"

export const buildHtml = (className, color, d, dataObject, n, state) => {
                     
  switch (className) {
    case "incomeChart":
      return incomeHtml(d, dataObject, color, n, state)
    case "savingsBarChart":
      return savingsBarHtml(d, dataObject, state)
    case "savingsAreaChart":
      return savingsAreaHtml(d, dataObject, state)
  }
}

export const createBarTooltip = (className, dataObject, hoveredName, state) => {
console.log('hoveredName:', hoveredName)
  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", "-100rem")
    .style("right", "30rem")

  d3.selectAll(`rect`)
    .on("mouseover", (d, i, n) => {
      tooltip.html(() => buildHtml(className, d, dataObject, n, state))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
    .on("mousemove", () => {
      tooltip
        .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
        .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
    })
}



export const createAreaTooltip = (className, dataObject, graph, state, xScale, yScale) => {

  const peakYear = getPeakYear(dataObject, state)

  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", "2rem")
    .style("left", xScale(peakYear.year) - 60 + "px")
    .html(() => buildHtml(className, null, peakYear, dataObject, null, state))

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
        .attr("cy", yScale(Object.values(d)[1]))
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "#72929B")

      tooltip
        .html(() => buildHtml(className, null, d, dataObject, null, state))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll(`circle`).remove()
      d3.selectAll(`line`).remove()
     // tooltip.transition().duration(1500).style("opacity", 0)
    })
    .on("mousemove", () => {
      tooltip
        .style("top", 20 + "px") // always 10px below the cursor
        .style("left", d3.event.layerX - 150 + "px") // always 10px to the right of the mouse
    })
}
