import * as d3 from "d3"
import { getIncomeArrayForChart } from "calculations/income/create/createChartArray"
import { round, formatName } from "charts/createChartFunctions/chartHelpers"


export const drawBarChart = (colors, className, dataObject, height, set, state, width) => {
  
  const { selectedId, selectedPeriod, selectedUser } = state.ui_reducer
  const { user1BirthYear, user1Name, user2Name, maritalStatus } = state.user_reducer

  const instance = state.main_reducer[selectedId]

  let periodStart = 0
  let periodEnd = 0
  let streamName = ""

  if (instance) {
    streamName = instance.name
    periodStart = instance[`period${selectedPeriod}StartYear`]
    periodEnd = instance[`period${selectedPeriod}EndYear`]
  }

  const margin = { top: 20, right: 100, bottom: 20, left: 100 }
  const graphHeight = height - margin.top - margin.bottom
  const graphWidth = width - margin.left - margin.right

  const data = getIncomeArrayForChart(state, dataObject)

  d3.select(`.${className} > *`).remove()
  d3.select(`.${className}tooltip`).remove()

  const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

  const stackedKeys = Object.keys(data[15]).filter(d => d !== "year")

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
    .style("top", "-10rem")
    .style("right", "30rem")

  const update = data => {

    const beforeTaxIncomeArray = Object.values(dataObject).map(d => {
      if (maritalStatus === "married") return d.user2.beforeTaxIncome + d.user1.beforeTaxIncome
      else return d.user1.beforeTaxIncome
    })

    const max = d3.max(beforeTaxIncomeArray) < 40000 ? 40000 : d3.max(beforeTaxIncomeArray) + 5000

    const series = stack(data)

    const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, max])
    const xScale = d3
      .scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.3)
      .domain(data.map(item => item.year))

    const rects = graph.append("g").selectAll("g").data(series)

    rects.exit().remove()

    rects
      .enter()
      .append("g")
      .attr("fill", (d, i) => {
        return colors[d.key] })
      .attr("class", (d, i) => d.key)
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.data.year))
      .attr("opacity", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
      })
      .attr("width", xScale.bandwidth())
      .on("click", (d, i, n) => {
        const name = n[0].parentNode.className.animVal
        const id = Object.values(state.main_reducer).filter(d => d.name === name)[0]["id"]
        set("selectedId", "ui_reducer", id)
      })
      .on("mouseover", (d, i, n) => {
        const name = n[0].parentNode.className.animVal

        const thisColor = colors[name]
        d3.select(n[i]).transition().duration(100).attr("opacity", 0.7).attr("cursor", "pointer")

        tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")

        tooltip.html(
          `
                                          <div class="topHeader">
                                              <p> ${d.data.year}</p>
                                              <p> Age: ${d.data.year - user1BirthYear}</p>
                                          </div>
                                          <div class="title-row" style="color: ${thisColor}; ">
                                           ${formatName(name, user1Name, user2Name)}
                                          </div>
                                          <div class="row" style="color: ${thisColor}; ">
                                            <div class="box">
                                              <p> Before tax</p>
                                              <p class="value"> ${
                                                round(dataObject[d.data.year].user1.beforeTaxIncomeStreams[name]) || round(dataObject[d.data.year].user2.beforeTaxIncomeStreams[name])
                                              } K</p>
                                            </div>
                                            <div class="box">
                                              <p> After tax</p>
                                              <p class="value"> ${
                                                round(dataObject[d.data.year].user1.afterTaxIncomeStreams[name]) || round(dataObject[d.data.year].user2.afterTaxIncomeStreams[name])
                                              } K</p>
                                            </div>
                                          </div>
                                          <div class="title-row">
                                          Total
                                          </div>
                                          <div class="row">
                                            <div class="box">
                                              <p> Before tax</p>
                                              <p class="value"> ${
                                                selectedUser === "combined"
                                                  ? round(dataObject[d.data.year].user1.beforeTaxIncome + dataObject[d.data.year].user2.beforeTaxIncome)
                                                  : selectedUser === "user2"
                                                  ? round(dataObject[d.data.year].user2.beforeTaxIncome)
                                                  : round(dataObject[d.data.year].user1.beforeTaxIncome)
                                              } K</p>
                                            </div>
                                            <div class="box">
                                              <p> After tax</p>
                                              <p class="value"> ${
                                                selectedUser === "combined"
                                                  ? round(dataObject[d.data.year].user1.afterTaxIncome + dataObject[d.data.year].user2.afterTaxIncome)
                                                  : selectedUser === "user2"
                                                  ? round(dataObject[d.data.year].user2.afterTaxIncome)
                                                  : round(dataObject[d.data.year].user1.afterTaxIncome)
                                              } K</p>
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

        tooltip.transition().duration(1500).style("opacity", 0)
      })
      .on("mousemove", function (d) {
        // when mouse moves
        tooltip
          .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
          .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
      })
      .attr("y", d => yScale(d[1]))
      .attr("height", d => (yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0))

      var ticks = [ 2020, 2040, 2060]
      var tickLabels = ["2020", "2040", "2060"]

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

  update(data)
}
