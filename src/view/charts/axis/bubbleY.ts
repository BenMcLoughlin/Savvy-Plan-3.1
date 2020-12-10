import * as d3 from "d3"

export const bubbleY = (graph, y) => {
  const yAxisGroup = graph.append("g").attr("class", "axis")

  const yAxis = d3
    .axisLeft(y)
    .ticks("2")
    .tickFormat(d => `${+d / 1000}k`)

  yAxisGroup
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "1.2rem")
    .style("fill", "#7F7F7F")

    graph.call(g => g.select(".domain").remove())

 

}
