import * as d3 from "d3"
import { lifespanTooltipHtml, lifespanTooltipHtml2 } from "view/charts/tooltips/lifespan/html"

export const lifespanAreaTooltip = (className, data, graph, height, state, yScale, xScale, width) => {
  const tooltip = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip`).style("opacity", 0).style("position", "absolute")
  const tooltip2 = d3.select(`.${className}`).append("div").attr("class", `${className}tooltip2`).style("opacity", 0).style("position", "absolute")

  graph
    .append("text")
    .attr("x", xScale(65) - 25 + "px")
    .attr("y", yScale(0) + 30 + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age 65`)

  graph
    .append("text")
    .attr("x", xScale(110) - 25 + "px")
    .attr("y", yScale(0) + 30 + "px")
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1rem")
    .text(`Age 110`)

  d3.selectAll(`.${className}Rect`)
    .on("mouseover", (d, i, n) => {
      graph
        .append("line")
        .attr("x1", xScale(d.year)) //d => xScale(d.year))
        .attr("x2", xScale(d.year)) //d => xScale(d.year))
        .attr("y1", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
        .attr("y2", 900) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
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
        .style("left", () => d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
        .style("top", () => yScale(Object.values(d)[2]) + 20 + "px") // always 10px to the right of the mouse

      tooltip2
        .style("opacity", 1)
        .style("left", () => d3.event.layerX - 30 + "px") // always 10px to the right of the mouse
        .style("top", () => "20px") // always 10px to the right of the mouse
    })
}

// export const lifespanAreaTooltip = (className, data, graph, height, state, yScale, xScale, width) => {
//   graph
//     .append("text")
//     .attr("x", xScale(65) - 25 + "px")
//     .attr("y", yScale(0) + 30 + "px")
//     .attr("fill", "grey")
//     .attr("width", "2rem")
//     .attr("height", "2rem")
//     .attr("font-size", "1rem")
//     .text(`Age 65`)
//   graph
//     .append("text")
//     .attr("x", xScale(110) - 25 + "px")
//     .attr("y", yScale(0) + 30 + "px")
//     .attr("fill", "grey")
//     .attr("width", "2rem")
//     .attr("height", "2rem")
//     .attr("font-size", "1rem")
//     .text(`Age 120`)

//   graph
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("x", -110 + "px")
//     .attr("y", yScale(0.5) - 140 + "px")
//     .attr("fill", "grey")
//     .attr("width", "2rem")
//     .style("text-anchor", "end")
//     .attr("height", "2rem")
//     .attr("font-size", "1rem")
//     .text(`Percentage`)

//   const tooltip = d3
//     .select(`.${className}`)
//     .append("div")
//     .attr("class", `${className}tooltip`)
//     .style("opacity", 1)
//     .style("position", "absolute")
//     .style("top", "5rem")
//     .style("left", xScale(d => d.year) - 60 + "px")
//   //.html(() => buildHtml(className, null, peakYear, dataObject, null, state))

//   d3.selectAll("re")
//     .on("mouseover", (d, i, n) => {
//       graph
//         .append("line")
//         .attr("x1", xScale(d[i].data.year))
//         .attr("x2", xScale(d[i].data.year))
//         .attr("y1", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
//         .attr("y2", 1000) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
//         .attr("stroke-width", 2)
//         .attr("stroke", "#72929B")
//         .attr("stroke-dasharray", "5")
//         .attr("stroke-linecap", "round")
//         .attr("id", "areaLineRect")

//       graph
//         .append("circle")
//         .attr("className", "point")
//         .attr("r", 5)
//         .attr("cx", xScale(d.year))
//         .attr("cy", yScale(Object.values(d)[1]))
//         .attr("fill", "white")
//         .attr("stroke-width", 2)
//         .attr("stroke", "#72929B")
//         .style("top", d3.event.layerY - 10 + "px") // always 10px below the cursor
//         .style("left", d3.event.layerX + 20 + "px") // always 10px to the right of the mouse
//     })
//     .on("mouseout", (d, i, n) => {
//       d3.selectAll(`circle`).remove()
//       d3.selectAll(`line`).remove()
//     })
//     .on("mousemove", (d,i) => {
//       tooltip
//         .style("top", d3.event.layerY - 10 + "px") // always 10px below the cursor
//         .style("left", d3.event.layerX + 20 + "px") // always 10px to the right of the mouse
//       d3.select("line").attr("x1", xScale(d[i].data.year)).attr("x2", xScale(d[i].data.year))
//     })

//   //     console.log("`${className}Rect`:", `${className}Rect`)

//   // d3.selectAll(`.${className}Rect`)
//   //   .on("mouseover", (d, i, n) => {
//   //     console.log('`${className}Rect`:', `${className}Rect`)
//   //     graph
//   //       .append("line")
//   //       .attr("x1", xScale(d.year)) //d => xScale(d.year))
//   //       .attr("x2", xScale(d.year)) //d => xScale(d.year))
//   //       .attr("y1", 0) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
//   //       .attr("y2", 1000) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
//       .attr("stroke-width", 2)
//       .attr("stroke", "#72929B")
//       .attr("stroke-dasharray", "5")
//       .attr("stroke-linecap", "round")
//       .attr("id", "areaLineRect")

//     graph
//       .append("circle")
//       .attr("className", "point")
//       .attr("r", 5)
//       .attr("cx", xScale(d.year))
//       .attr("cy", yScale(Object.values(d)[2]))
//       .attr("fill", "white")
//       .attr("stroke-width", 2)
//       .attr("stroke", "#72929B")

//     graph
//       .append("circle")
//       .attr("className", "point")
//       .attr("r", 5)
//       .attr("cx", xScale(d.year))
//       .attr("cy", yScale(+Object.values(d)[2] + +Object.values(d)[1]))
//       .attr("fill", "white")
//       .attr("stroke-width", 2)
//       .attr("stroke", "#72929B")

//     tooltip.html(stackedTooltipHtml(d, dataObject, state)).style("opacity", 1)
//     tooltip2.style("opacity", 1).html(stackedTooltipValuesHtml(d, dataObject, "user1"))
//     tooltip3.style("opacity", 1).html(stackedTooltipValuesHtml(d, dataObject, "user1")).style("opacity", 1)
//     tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
//   })
//   .on("mouseout", (d, i, n) => {
//     d3.selectAll(`circle`).remove()
//     d3.selectAll(`line`).remove()
//     tooltip.transition().duration(500).style("opacity", 0)
//     tooltip2.transition().duration(5500).style("opacity", 0)
//     tooltip3.transition().duration(5500).style("opacity", 0)
//   })
//   .on("mousemove", d => {
//     tooltip.style("opacity", 1)

//     tooltip2
//       .style("opacity", 1) //THIS IS USER 2
//       .style("top", yScale(Object.values(d)[2]) + 70 + "px") //() => d3.event.layerY - 0 + "px") //
//       .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
//       .style("background", "red") // always 10px to the right of the mouse
//     tooltip3
//       .style("opacity", 1) //THIS IS USER 1
//       .style("top", yScale(+Object.values(d)[2] + +Object.values(d)[1]) + 10 + "px") //() => d3.event.layerY - 0 + "px") //
//       .style("left", () => d3.event.layerX - 320 + "px") // always 10px to the right of the mouse
//   })
//}
