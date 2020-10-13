import * as d3 from "d3"
import { round, formatIncomeName } from "view/charts/createChartFunctions/chartHelpers"

export const mouseout = className => {
  d3.selectAll(`circle`).remove()
  d3.selectAll(`line`).remove()
  d3.select(`.${className}tooltip`).remove()
}

export const mousemove = tooltip => {
  return tooltip
    .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
    .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
}

export const areaTooltip = (className, d, data, graph, xScale, yScale) => {
  d3.select(`.${className}tooltip`).remove()
  d3.selectAll(`circle`).remove()
  d3.selectAll(`line`).remove()

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

  d3.select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", "-3.8rem") // always 10px below the cursor
    .style("left", d3.event.layerX - 150 + "px") // always 10px to the right of the mouse
    .html(
      `
                                    <div class="topHeader">
                                        <p> 1000</p>
                                    </div>
                                    <div class="title-row" style="color: 100; ">
          
                                    </div>
                                    <div class="row" >
                                      <div class="box">
                                        <p> Before tax</p>
                                        <p class="value"> ${1000} K</p>
                                      </div>
                                    </div>
                                    <div class="title-row">
                                    Total
                                    </div>
                                    </div>
                                    `
    )
}
