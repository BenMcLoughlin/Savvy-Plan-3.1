/* eslint-disable */
import * as u from "model/utils"

const wrapper = `
  margin-left: 14rem;
  margin-top: -3rem;
  width: 17rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f2;
  border-radius: 3rem;
  padding: 1rem;
  z-index: 200;
`
const largeValue = `
font-size: 2.4rem;
font-weight: 600;
`
const left = `
font-size: 1rem;
font-weight: 200;
`
const right = `
font-size: 1rem;
font-weight: 200;
`

export const savingsAreaHtml = (d, dataObject, state) => {
  const { selectedUser, selectedAccount } = state.ui_reducer
  const { birthYear } = state.user_reducer[selectedUser] || state.user_reducer.user1
  let total = 100
  // if (selectedAccount !== "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser][selectedAccount].total
  // if (selectedAccount === "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser].totalSavings
  // if (selectedAccount === "combined" && selectedUser === "combined") total = dataObject[d.year].user1.totalSavings + dataObject[d.year].user2.totalSavings
  // if (selectedAccount !== "combined" && selectedUser === "combined") total = dataObject[d.year].user1[selectedAccount].total + dataObject[d.year].user2[selectedAccount].total

  return `
                                    <div style="${wrapper}">
                                      <div style="${left}">
                                        <p style="${largeValue}">
                                        ${u.asCurrency(total)}
                                        <p>
                                      </div>
                                      <div style="${right}">
                                        <p>
                                        Estimated Value
                                        <p>
                                        <p>
                                        ${d.year} at age ${+d.year - +birthYear}
                                        <p>
                                       </div>
                                    </div>
                                    `
}
