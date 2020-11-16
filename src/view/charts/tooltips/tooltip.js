/* eslint-disable */
import * as d3 from "d3"
import { incomeHtml } from "view/charts/tooltips/tooltipHtml/incomeHtml"
import { savingsBarHtml } from "view/charts/tooltips/tooltipHtml/savingsBarHtml"
import { savingsAreaHtml } from "view/charts/tooltips/tooltipHtml/savingsAreaHtml"
import { savingsStackedAreaHtml } from "view/charts/tooltips/tooltipHtml/savingsStackedAreaHtml"
import { savingsStackedAreaValueHtml } from "view/charts/tooltips/tooltipHtml/savingsStackedAreaValueHtml"
import { donutChartHtml } from "view/charts/tooltips/tooltipHtml/donutChartHtml"
import { overviewHtml } from "view/charts/tooltips/tooltipHtml/overviewHtml"
import { getPeakYear } from "view/charts/createChartFunctions/chartHelpers"

export const buildHtml = (className, color, d, dataObject, n, state, user) => {
  switch (className) {
    case "incomeChart":
      return incomeHtml(d, dataObject, color, n, state)
    case "savingsBarChart":
      return savingsBarHtml(d, dataObject, n, state)
    case "savingsAreaChart":
      return savingsAreaHtml(d, dataObject, state)
    case "savingsStackedAreaChart":
      return savingsStackedAreaHtml(d, dataObject, state)
    case "savingsStackedAreaChartValue":
      return savingsStackedAreaValueHtml(d, dataObject, user)
    case "overviewAreaChart":
      return overviewHtml(d, dataObject, state)
    case "donutChart":
      return donutChartHtml(d, dataObject, state)
  }
}

export const createBarTooltip = (className, dataObject, hoveredName, state) => {
  const tooltip = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip`).style("opacity", 0).style("position", "absolute").style("top", "-100rem").style("right", "300rem")

  d3.selectAll(`rect`)
    .on("mouseover", (d, i, n) => {
      tooltip.html(() => buildHtml(className, d, dataObject, n, state))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
    .on("mousemove", () => {
      tooltip
      // .style("top", d3.layerY - 20 + "px") // always 10px below the cursor
      // .style("left", d3.layerX + 30 + "px") // always 10px to the right of the mouse
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
    .style("top", "5rem")
    .style("left", xScale(d => d.year) - 60 + "px")
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

      tooltip.html(() => buildHtml(className, null, d, dataObject, null, state))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.selectAll(`circle`).remove()
      d3.selectAll(`line`).remove()
      // tooltip.transition().duration(1500).style("opacity", 0)
    })
    .on("mousemove", () => {
      tooltip.style("top", 50 + "px") // always 10px below the cursor
      // .style("left", () => (d3.event.layerX - 150 > 650 ? "650px" : d3.event.layerX - 150 + "px")) // always 10px to the right of the mouse
    })
}
export const createStackedAreaTooltip = (className, dataObject, graph, state, xScale, yScale) => {
  const tooltip = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip`).style("opacity", 0).style("position", "absolute")

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

      tooltip
        .html(buildHtml(className, null, d, dataObject, null, state))
        .style("opacity", 1)
        .style("left", 160 + "px")
      tooltip2.style("opacity", 1).html(buildHtml("savingsStackedAreaChartValue", null, d, dataObject, null, state, "user2")).style("opacity", 1)
      tooltip3.style("opacity", 1).html(buildHtml("savingsStackedAreaChartValue", null, d, dataObject, null, state, "user1")).style("opacity", 1)
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
      tooltip.style("opacity", 1).style("top", 50 + "px") // always 10px below the cursor
      // .style("left", () => (d3.event.layerX > 1100 ? "1100px" : d3.event.layerX + 50 + "px")) // always 10px to the right of the mouse

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
