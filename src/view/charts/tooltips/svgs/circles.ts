export const addCircle = (graph, cx, cy, ) => {
           graph
             .append("circle")
             .attr("chartName", "point")
             .attr("r", 5)
             .attr("cx", cx)
             .attr("cy", cy)
             .attr("fill", "white")
             .attr("stroke-width", 2)
             .attr("stroke", "#72929B")
}