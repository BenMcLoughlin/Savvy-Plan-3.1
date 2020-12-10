export const addLine = (graph, x1, x2, y1, y2) => {
  graph
    .append("line")
    .attr("x1", x1) //d => x(d.year))
    .attr("x2", x2) //d => x(d.year))
    .attr("y1", y1) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
    .attr("y2", y2) //because the name changes we want to grab the second item with the value, I just flipped it to an array to I could get second value
    .attr("stroke-width", 2)
    .attr("stroke", "#72929B")
    .attr("stroke-dasharray", "5")
    .attr("stroke-linecap", "round")
    .attr("id", "areaLineRect")
}
