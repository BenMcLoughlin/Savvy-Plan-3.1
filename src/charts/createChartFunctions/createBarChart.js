import * as d3 from "d3"
import _ from "lodash"

//      drawBarChart(className, data, height, set, width)

export const drawBarChart = (colors, className, data, height, set, state, width) => {

  const { selectedId } = state.ui_reducer

  const instance = state.main_reducer[selectedId]
  const { selectedPeriod } = state.ui_reducer



  let periodStart = 0
  let periodEnd = 0
  let streamName = ""

    if (instance) {
      streamName = instance.name
      periodStart = instance[`period${selectedPeriod}StartYear`]
      periodEnd = instance[`period${selectedPeriod}EndYear`]
    }

console.log('periodStart:', periodStart)
console.log('periodEnd:', periodEnd)


  

  const margin = { top: 20, right: 100, bottom: 20, left: 100 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right



  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  
  const stackedKeys = Object.keys(data[15]).filter( d => d !== "age").filter( d => d !== "year")
  
;
  const graph = svg
    .append("g")
    .attr("height", graphHeight > 0 ? graphHeight : 0)
    .attr("width", graphWidth)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const xAxisGroup = graph.append("g").attr("transform", `translate(0, ${graphHeight})`).attr("class", "axis")

  const yAxisGroup = graph.append("g").attr("class", "axis")

  const stack = d3.stack().keys(stackedKeys).order(d3.stackOrderNone).offset(d3.stackOffsetDiverging)

  const tooltip = d3
    .select(`.${className}`)
    .append("div")
    .attr("class", `${className}tooltip`)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("top", "10rem")
    .style("right", "30rem")

  const update = data => {
    const max = d3.max(data, d => Object.values(d).reduce((acc, num) => acc + num)) < 60000 ? 60000 : d3.max(data, d => Object.values(d).reduce((acc, num) => acc + num)) + 1000

    const series = stack(data)

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, max])
    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.age))

    const rects = graph.append("g").selectAll("g").data(series)

    rects.exit().remove()

    rects
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.data.age))
      .attr("y", d => yScale(d[1]))
      .merge(rects)

    rects
      .enter()
      .append("g")
      .attr("fill", (d, i) => (colors[d.key]))
      .attr("class", (d, i) => d.key)
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("y", d => yScale(d[1]))
      .attr("height", d => (yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0))
      .attr("x", d => xScale(d.data.age))
      .attr("opacity", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        console.log('name:', name)
        console.log('streamName:', streamName)
        
        return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
      })
      .attr("width", xScale.bandwidth())
      .on("click", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        const id = Object.values(state.main_reducer).filter(d => d.name === name)[0]["id"]
        set('selectedId', 'ui_reducer', id)
      })
      .on("mouseover", (d, i, n) => {
        const name = n[0].parentNode.className.animVal

        const thisColor = colors[d.key]

        d3.select(n[i]).transition().duration(100).attr("opacity", 0.7).attr("cursor", "pointer")

        tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")

        tooltip.html(
          `
                                          <div class="topHeader">
                                              <p> ${d.data.age} Yrs Old</p>
                                          </div>
                                          <div class="financialOutput">
                                              <div class="total" style="color: ${thisColor}; ">
                                                  <h3 class="title">  ${_.startCase(name)} </h3>
                                                  <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                                                      ${(Math.round((d[1] - d[0]) / 1000) * 1000) / 1000} 
                                                      <span> K</span>
                                                  </p>
                                              </div>
                                              <div class="total">
                                                  <h3 class="title">  Total Income </h3>
                                                  <p class="value" style="border-left: .3px solid #72929B;">  
                                                  ${Math.round(Object.values(d.data).reduce((acc, num) => acc + num) / 1000)} 
                                                      <span> K</span>
                                                  </p>
                                              </div>
                                          </div>
                                          `
        )
      })
      .on("mouseout", (d, i, n) => {
        d3.select(n[i])
          .transition()
          .duration(100)
          //.attr("opacity", 1)
          .attr("opacity", (d, i, n) => {
            const name = n[0].parentNode.className.animVal
            return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
          })

        tooltip.transition().duration(100).style("opacity", 0)
      })
      .on("mousemove", function (d) {
        // when mouse moves
        tooltip
          .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
          .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
      })

    var ticks = [20, 40, 60, 80, 95]
    var tickLabels = ["Age 20", "Age 40", "Age 60", "Age 80", "Age 95"]

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(ticks)
      .tickFormat(function (d, i) {
        return tickLabels[i]
      })

    const yAxis = d3
      .axisLeft(yScale)
      .ticks("2")
      .tickFormat(d => `${d / 1000}k`)

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
  }

  console.log(data)

  update(data)
}
