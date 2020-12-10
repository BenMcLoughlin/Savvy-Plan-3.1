import * as d3 from "d3"
import { lifespanTooltipHtml, lifespanTooltipHtml2 } from "view/charts/tooltips/lifespan/html"
import * as svg from "view/charts/tooltips/svgs/index"
import * as u from "model/utils"

export const lifespan = (allData, colors, chartName, graph, y, x) => {
  const { chartData, state, user } = allData

  const { lifeSpan, gender } = state.user_reducer[user]

  const yearData = chartData.find(d => d.year === lifeSpan)
  const yearYPosition = gender === "male" ? yearData.male : yearData.male + yearData.female
  const yearYPercentage = gender === "male" ? yearData.male : yearData.male + yearData.female


  const tooltip = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
  const tooltip2 = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip2`)
    .style("opacity", 0)
    .style("position", "absolute")

  svg.addText(graph, x(65) + 10 + "px", y(0) + 30 + "px", `Age 65`)
  svg.addText(graph, x(110) - 65 + "px", y(0) + 30 + "px", `Age 110`)
  svg.addCircle(graph, x(lifeSpan), y(yearYPosition))
  svg.addText(
    graph,
    x(lifeSpan) + 10,
    y(yearYPosition),
    `${u.asPercentage(yearYPercentage)} of ${gender}s to live to ${lifeSpan}`
  )

  d3.selectAll(`.${chartName}Rect`)
    .on("mouseover", (d, i, n) => {
      svg.addLine(graph, x(d.year), x(d.year), -30, 1000)
      svg.addCircle(graph, x(d.year), y(Object.values(d)[1]))
      svg.addCircle(graph, x(d.year), y(+Object.values(d)[2] + +Object.values(d)[1]))

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
        .style("top", "0px")
    })
}
