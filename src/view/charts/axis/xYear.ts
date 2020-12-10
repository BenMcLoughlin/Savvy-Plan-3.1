import * as d3 from "d3"

export const xYear = (graph, x) => {
  const xAxisGroup = graph.append("g").attr("transform", `translate(0, 160)`).attr("class", "axis")

  var ticks = [2020, 2040, 2060, 2080]
  var tickLabels = ["2020 ", "2040", "2060", "2080"]

  const xAxis = d3
    .axisBottom(x)
    .tickValues(ticks)
    .tickFormat(function (d, i) {
      return tickLabels[i]
    })

  xAxisGroup.call(xAxis).selectAll("text").style("text-anchor", "center").style("font-size", "1.2rem").style("fill", "#7F7F7F")

  graph.call(g => g.select(".domain").remove())
}
