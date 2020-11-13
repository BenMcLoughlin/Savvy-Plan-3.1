/* eslint-disable */
import * as d3 from "d3"
import { getMax, getMin } from "view/charts/createChartFunctions/chartHelpers"
import * as tooltips from "view/charts/tooltips/barTooltip"
import { buildHtml } from "view/charts/tooltips/tooltip"
import _ from "lodash"

export const drawDonutChart = (color_selector, className, data, height, width) => {
  const { mouseout } = tooltips
  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()


  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const graphHeight = height - margin.top - margin.bottom - 100
  const graphWidth = width - margin.left - margin.right - 100

  const radius = width / 5
  const center = { x: width / 3, y: height / 2 } // chart dimension
  const legendRectSize = 10
  const legendSpacing = 6

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const graph = svg
    .append("g")
    .attr("height", graphHeight > 100 ? graphHeight : 100)
    .attr("width", graphWidth)
    .attr("transform", `translate(${graphWidth / 1.65}, ${graphHeight / 1.4})`)

  // ordinal colour scale
  const colors = ["#72929B", "#4BB9D0", "#B0CFE3", "#8CB8B7", "#81CCAF", "#78b7bb", "#D4D4D4", "#72929B", "#F29278", "#FEDE76", "#a4d7e1", "#81CCAF"]

  const titleList = ["After Tax Income", "Tax Credit Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]

  const color = d3.scaleOrdinal(colors)

  const update = data => {
    const partition = d3.partition().size([2 * Math.PI, radius])

    const root = d3.hierarchy(data).sum(function (d) {
      return d.value
    })

    partition(root)

    const arc = d3
      .arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1)

    const tooltip = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip`).style("opacity", 0).style("position", "absolute").style("top", "-100rem").style("right", "30rem")

    const rects = graph
      .selectAll("path")
      .data(root.descendants())
      .enter()
      .append("path")
      .attr("display", d => (d.depth ? null : "none"))
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", d => color((d.children ? d : d.parent).data.name))
      .style("cursor", "pointer")
      .on("mouseover", (d, i, n) => {
        d3.select(this).attr("fill", "#fff")
        tooltip.html(() => buildHtml(className, color, d))
        tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
      })
      .on("mouseout", (d, i, n) => tooltip.transition().duration(1500).style("opacity", 0))
      .on("mousemove", () => {
        tooltip
          .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
          .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
      })
  }

  update(data)
}

export const createSunburstData = ({ user_reducer }) => {
  const { firstName: u1Name, tfsaNestEgg: u1Tfsa, rrspNestEgg: u1Rrsp, nregNestEgg: u1Nreg } = user_reducer.user1
  const { firstName: u2Name, tfsaNestEgg: u2Tfsa, rrspNestEgg: u2Rrsp, nregNestEgg: u2Nreg } = user_reducer.user2

  return {
    name: "nestEgg",
    children: [
      {
        name: "tfsa",
        children: [
          { name: `${u1Name} Target TFSA`, value: u1Tfsa },
          { name: `${u2Name} Target TFSA`, value: u2Tfsa },
        ],
      },
      {
        name: "rrsp",
        children: [
          { name: `${u1Name} Target RRSP`, value: u1Rrsp },
          { name: `${u1Name} Target RRSP`, value: u2Rrsp },
        ],
      },
      {
        name: "rrsp",
        children: [
          { name: `${u1Name} Target Non Registered`, value: u1Nreg },
          { name: `${u1Name} Target Non Registered`, value: u2Nreg },
        ],
      },
    ],
  }
}
