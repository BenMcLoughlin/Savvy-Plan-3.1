/* eslint-disable */
import { round, formatIncomeName } from "view/charts/drawCharts/chartHelpers"

const topHeader = `
display: flex;
justify-content: space-between;
padding: 1rem;
border-bottom: 1px solid #E6E4E3;
font-size: 1.4rem;
font-weight: 600;
`
const titleRow = color => {
  return `
  display: flex;
  height: 2rem;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-size: 1.4rem;
    color: ${color}
`
}

const row = color => {
  return `
  display: flex;
  height: 4rem;
  font-size: 1.4rem;
  width: 100%;
  justify-content: space-between;
    color: ${color}
`
}

//n[0].parentNode.className.animVal
const box = `
padding: 1rem;
justify-content: space-between;
display: flex;
height: 4rem;
width: 14rem;
border-bottom: 1px solid #E6E4E3;
align-items: center;
`
const value = `
font-weight: 700;
`

export const incomeTooltipHtml = (d, dataObject, color, n, state) => {
  const value = d[1] - d[0]
  const name = Object.entries(d.data).filter(([k, v]) => {
    if (typeof v === "number") return v.toFixed() === value.toFixed()
  })[0][0]

  const { year } = d.data
  const { selectedUser } = state.ui_reducer
  const { firstName: user1FirstName, birthYear: user1BirthYear } = state.user_reducer.user1
  const { firstName: user2FirstName, birthYear: user2BirthYear } = state.user_reducer.user2

  const hoveredUser = Object.keys(dataObject[year].user1.income).includes(name) ? "user1" : "user2"
  const { income, afterTaxIncome, taxableInc, averageRate } = dataObject[year][hoveredUser]
  const { taxableIncome: user1TaxableIncome, afterTaxIncome: user1afterTaxIncome } = dataObject[year].user1
  const { taxableIncome: user2TaxableIncome, afterTaxIncome: user2afterTaxIncome } = dataObject[year].user2

  return `
                   <div style="${topHeader}">
                                        <p> ${d.data.year}</p>
                                        <p> Age: ${d.data.year - user1BirthYear}</p>
                                    </div>
                                    <div  style="${titleRow(color)}">
                                    ${formatIncomeName(name, user1FirstName, user2FirstName)}
                                    </div>
                                    <div style="${row(color)} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${round(income[name])}</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p> 
                                          <p style="${value}"> ${round(income[name] * (1 - averageRate))}</p>
                                        </div>
                                    </div>
                                    <div  style="${titleRow("grey")}">
                                    Annual Total
                                    </div>
                                    <div style="${row("grey")} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${selectedUser === "combined" ? round(user1TaxableIncome + user2TaxableIncome) : round(taxableInc)}</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p>
                                           <p style="${value}"> ${selectedUser === "combined" ? round(user1afterTaxIncome + user2afterTaxIncome) : round(afterTaxIncome)}</p>
                                        </div>
                                    </div>
                                    `
}
//   ${formatIncomeName(name, firsName, firstName)}

// <div style="${wrapper}">
// <div style="${topHeader}">
//                      <p> ${d.data.year}</p>
//                      <p> Age: ${d.data.year - user1BirthYear}</p>
//                  </div>
//                  <div  style="${titleRow(color)}">
//                   BODAKY
//                  </div>
//                  <div style="${row(color)} ">
//                    <div style="${box}">
//                        <p> Before tax</p>
//                        <p style="${value}"> ${
//                          round(dataObject[d.data.year].user1.income[name]) || round(dataObject[d.data.year].user2.income[name])
//                        }</p>
//                      </div>
//                      <div style="${box}">
//                        <p> After tax</p>
//                        <p style="${value}"> ${
//                          round(dataObject[d.data.year].user1.income[name]) || round(dataObject[d.data.year].user2.income[name])
//                        }</p>
//                      </div>
//                  </div>
//                  <div style="${titleRow(color)}>
//                  Total
//                  </div>
//                  <div style="${row(color)} ">
//                  <div style="${box}">
//                      <p> Before tax</p>
//                      <p style="${value}"> ${
//                        selectedUser === "combined"
//                          ? round(dataObject[d.data.year].user1.beforeTaxIncome + dataObject[d.data.year].user2.beforeTaxIncome)
//                          : selectedUser === "user2"
//                          ? round(dataObject[d.data.year].user2.beforeTaxIncome)
//                          : round(dataObject[d.data.year].user1.beforeTaxIncome)
//                      }</p>
//                    </div>
//                    <div style="${box}">
//                      <p> After tax</p>
//                      <p style="${value}"> ${
//                        selectedUser === "combined"
//                          ? round(dataObject[d.data.year].user1.afterTaxIncome + dataObject[d.data.year].user2.afterTaxIncome)
//                          : selectedUser === "user2"
//                          ? round(dataObject[d.data.year].user2.afterTaxIncome)
//                          : round(dataObject[d.data.year].user1.afterTaxIncome)
//                      }</p>
//                    </div>
//                  </div>
// </div>
