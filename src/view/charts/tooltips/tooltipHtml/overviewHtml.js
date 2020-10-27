import { round } from "view/charts/createChartFunctions/chartHelpers"
import { exampleOverviewData } from "data/exampleState"

const wrapper = `
  margin-left: 14rem;
  margin-top: -3rem;
  width: 60rem;
  height: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
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
const display = `

display: flex;
flex-direction: column;
align-items: center;
width: 11rem;

`
const topValue = `
font-size: 2.4rem;
display: flex;
flex-direction: column;
border-bottom: .6px solid grey;
padding: .5rem;
font-weight: bold;


`
const bottomValue = `
display: flex;
flex-direction: column;
padding: .5rem;

`
const column = `
display: flex;
flex-direction: column;
width: 100%;
`

const top = `
font-size: 1.4rem;
display: flex;
flex-direction: column;
padding: .5rem;
`
const bottom = `
display: flex;
height: 10rem;
width: 100%;
border-top: .6px solid grey;
`

export const overviewHtml = (d, dataObject, state) => {
  const { selectedUser, selectedAccount } = state.ui_reducer
  const { user1BirthYear } = state.user_reducer
  const overviewData = exampleOverviewData()

  let total = 100
  if (selectedAccount !== "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser][selectedAccount].total
  if (selectedAccount === "combined" && selectedUser !== "combined") total = dataObject[d.year][selectedUser].totalSavings
  if (selectedAccount === "combined" && selectedUser === "combined") total = dataObject[d.year].user1.totalSavings + dataObject[d.year].user2.totalSavings
  if (selectedAccount !== "combined" && selectedUser === "combined") total = dataObject[d.year].user1[selectedAccount].total + dataObject[d.year].user2[selectedAccount].total

  return `
                                  <div style="${wrapper}">
                                    <div style="${column}"> 
                                      <div style="${top}"> 
                                          Age ${+d.year - +user1BirthYear}
                                      </div>
                                      <div style="${bottom}"> 
                                          <div style="${display}"> 
                                              <div style="${topValue}">   
                                              ${round(total)}
                                              </div>
                                              <div style="${bottomValue}"> 
                                                  Investments
                                              </div>
                                          </div>
                                          <div style="${display}"> 
                                              <div style="${topValue}">   
                                              ${round(overviewData[d.year].netWorth + total)}
                                              </div>
                                              <div style="${bottomValue}"> 
                                                  Net Worth
                                              </div>
                                          </div>
                                          <div style="${display}"> 
                                              <div style="${topValue}">   
                                                  ${round(overviewData[d.year].income)}
                                              </div>
                                              <div style="${bottomValue}"> 
                                                  Income
                                              </div>
                                          </div>
                                         <div style="${display}"> 
                                              <div style="${topValue}">   
                                               ${round(overviewData[d.year].spending)}
                                             </div>
                                              <div style="${bottomValue}"> 
                                                 Spending
                                             </div>
                                      </div>
                                          <div style="${display}"> 
                                              <div style="${topValue}">   
                                                  65 K
                                              </div>
                                              <div style="${bottomValue}"> 
                                                  Debts
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                    `
}
