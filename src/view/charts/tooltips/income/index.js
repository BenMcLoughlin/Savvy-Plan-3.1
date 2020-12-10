import * as d3 from "d3"
import { incomeTooltipHtml } from "view/charts/tooltips/income/html"

export const income = (allData, colors, chartName) => {
  const tooltip = d3.select(`.${chartName}`).append("div").style("opacity", 0).style("position", "absolute").style("top", "-100rem").style("right", "30rem")

  d3.selectAll(`rect`)
    .on("mouseover", (d, i, n) => {
      tooltip.html(() => incomeTooltipHtml(d, allData, colors, n))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
    .on("mousemove", () => {
      tooltip
        .style("top", d => window.event.pageY - 400 + "px") // always 10px below the cursor
        .style("left", d => window.event.pageX - 250 + "px") // always 10px below the cursor
      // .style("left", d => x(d.data.year)) // always 10px to the right of the mouse
    })
}
