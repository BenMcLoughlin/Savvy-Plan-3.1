/* eslint-disable */
import { round } from "view/charts/drawCharts/chartHelpers"

const wrapper = `
  margin-left: 14rem;
  margin-top: -3rem;
  width: 6rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f2;
  border-radius: 3rem;
  padding: 1rem;
  z-index: 200;
`
const largeValue = `
font-size: 1.4rem;
font-weight: 600;
`
const left = `
font-size: 1rem;
font-weight: 200;
`

export const savingsStackedAreaValueHtml = (d, dataObject, user) => {
  let total = dataObject[d.year][user].totalSavings
  // if (selectedAccount !== "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser][selectedAccount].total
  // if (selectedAccount === "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser].totalSavings
  // if (selectedAccount === "combined" && selectedUser === "combined") total = dataObject[d.year].user1.totalSavings + dataObject[d.year].user2.totalSavings
  // if (selectedAccount !== "combined" && selectedUser === "combined") total = dataObject[d.year].user1[selectedAccount].total + dataObject[d.year].user2[selectedAccount].total

  return `
                                    <div style="${wrapper}">
                                      <div style="${left}">
                                        <p style="${largeValue}">
                                        ${round(total)}
                                        <p>
                                      </div>
                                    </div>
                                    `
}
