import * as d3 from "d3"
import { round, formatIncomeName } from "view/charts/createChartFunctions/chartHelpers"

export const incomeChart = (d, dataObject, i, tooltip, n, state) => {
  const { selectedUser } = state.ui_reducer
  const { user1BirthYear, user1Name, user2Name } = state.ui_reducer
  const name = n[0].parentNode.className.animVal
  d3.select(n[i]).transition().duration(100).attr("opacity", 0.7).attr("cursor", "pointer")

  tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
  const thisColor = "red"
  return tooltip.html(
    `
                                    <div class="topHeader">
                                        <p> ${d.data.year}</p>
                                        <p> Age: ${d.data.year - user1BirthYear}</p>
                                    </div>
                                    <div class="title-row" style="color: ${thisColor}; ">
                                     ${formatIncomeName(name, user1Name, user2Name)}
                                    </div>
                                    <div class="row" style="color: ${thisColor}; ">
                                      <div class="box">
                                        <p> Before tax</p>
                                        <p class="value"> ${
                                          round(dataObject[d.data.year].user1.beforeTaxTaxableIncomeStreams[name]) || round(dataObject[d.data.year].user2.beforeTaxTaxableIncomeStreams[name])
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
}

export const mouseout = (i, periodStart, periodEnd, n, streamName, tooltip) => {
  d3.select(n[i])
    .transition()
    .duration(100)
    .attr("opacity", (d, i, n) => {
      const name = n[0].parentNode.className.animVal
      return streamName === name && d.data.year >= periodStart && d.data.year < periodEnd ? 0.7 : 1
    })

  tooltip.transition().duration(1500).style("opacity", 0)
}

export const mousemove = tooltip => {
  return tooltip
  // .style("top", d3.event.layerY - 20 + "px") // always 10px below the cursor
  // .style("left", d3.event.layerX + 30 + "px") // always 10px to the right of the mouse
}
