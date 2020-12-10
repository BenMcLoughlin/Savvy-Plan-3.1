import { savingsAreaHtml } from "view/charts/tooltips/savings/html"
import * as d3 from "d3"

//createAreaTooltip

export const savings = (allData, colors, chartName, graph, y, x) => {
  return null
  // const tooltip = d3
  //   .select(`.${chartName}`)
  //   .append("div")
  //   .attr("class", `${chartName}tooltip`)
  //   .style("opacity", 1)
  //   .style("position", "absolute")
  //   .style("top", "5rem")
  //   .style("left", x(d => d.year) - 60 + "px")
  //   .html(() => buildHtml(chartName, null, peakYear, allData, null))

  // d3.selectAll(`.${chartName}Rect`)
  //   .on("mouseover", (d, i, n) => {
  //     graph
  //       .append("line")
  //       .attr("x1", x(d.year)) //d => x(d.year))
  //       .attr("x2", x(d.year)) //d => x(d.year))
  //       .attr("y1", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
  //       .attr("y2", 1000) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
  //       .attr("stroke-width", 2)
  //       .attr("stroke", "#72929B")
  //       .attr("stroke-dasharray", "5")
  //       .attr("stroke-linecap", "round")
  //       .attr("id", "areaLineRect")

  //     graph
  //       .append("circle")
  //       .attr("chartName", "point")
  //       .attr("r", 5)
  //       .attr("cx", x(d.year))
  //       .attr("cy", y(Object.values(d)[1]))
  //       .attr("fill", "white")
  //       .attr("stroke-width", 2)
  //       .attr("stroke", "#72929B")

  //     tooltip.html(() => savingsAreaHtml(d, allData, state))
  //     tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
  //   })
  //   .on("mouseout", (d, i, n) => {
  //     d3.selectAll(`circle`).remove()
  //     d3.selectAll(`line`).remove()
  //     // tooltip.transition().duration(1500).style("opacity", 0)
  //   })
  //   .on("mousemove", () => {
  //     tooltip.style("top", 50 + "px") // always 10px below the cursor
  //     // .style("left", () => (d3.event.layerX - 150 > 650 ? "650px" : d3.event.layerX - 150 + "px")) // always 10px to the right of the mouse
  //   })
}
