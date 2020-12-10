export const addText = (appendTo, x, y, content) => {

  appendTo
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("fill", "grey")
    .attr("width", "2rem")
    .attr("height", "2rem")
    .attr("font-size", "1.4rem")
    .attr("font-weight", "bold")
    .text(content)
}
