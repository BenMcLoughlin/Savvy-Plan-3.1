import * as d3 from "d3"
import { incomeTooltipHtml } from "view/charts/tooltips/incomeBar/html"

export const incomeBarTooltip = (colors, className, dataObject, state) => {
  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "-100rem")
    .style("right", "30rem")

  d3.selectAll(`rect`)
    .on("mouseover", (d, i, n) => {
      const name = n[0].parentNode.className
      console.log("n[0].parentNode.className.animVal:", n[0].parentNode.className.animVal)
      const color = colors[name]
      tooltip.html(() => incomeTooltipHtml(d, dataObject, color, n, state))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
    .on("mousemove", () => {
      tooltip
        .style("top", d => window.event.pageY - 270 + "px") // always 10px below the cursor
        .style("left", d => window.event.pageX - 250 + "px") // always 10px below the cursor
      // .style("left", d => xScale(d.data.year)) // always 10px to the right of the mouse
    })
}
