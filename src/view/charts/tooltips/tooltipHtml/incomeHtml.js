import { round, formatIncomeName } from "view/charts/createChartFunctions/chartHelpers"

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

export const incomeHtml = (d, dataObject, color, n, state) => {
  const { selectedUser } = state.ui_reducer
  const { user1BirthYear, user1Name, user2Name } = state.user_reducer
  const name = n[0].parentNode.className.animVal

  return `
                   <div style="${topHeader}">
                                        <p> ${d.data.year}</p>
                                        <p> Age: ${d.data.year - user1BirthYear}</p>
                                    </div>
                                    <div  style="${titleRow(color)}">
                                    ${formatIncomeName(name, user1Name, user2Name)}
                                    </div>
                                    <div style="${row(color)} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${
    round(dataObject[d.data.year].user1.beforeTaxTaxableIncomeStreams[name]) || round(dataObject[d.data.year].user2.beforeTaxTaxableIncomeStreams[name])
  }</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p>
                                          <p style="${value}"> ${
    round(dataObject[d.data.year].user1.afterTaxIncomeStreams[name]) || round(dataObject[d.data.year].user2.afterTaxIncomeStreams[name])
  }</p>
                                        </div>
                                    </div>
                                    <div  style="${titleRow("grey")}">
                                    Annual Total
                                    </div>
                                    <div style="${row("grey")} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${
    selectedUser === "combined"
      ? round(dataObject[d.data.year].user1.beforeTaxIncome + dataObject[d.data.year].user2.beforeTaxIncome)
      : selectedUser === "user2"
      ? round(dataObject[d.data.year].user2.beforeTaxIncome)
      : round(dataObject[d.data.year].user1.beforeTaxIncome)
  }</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p>
                                          <p style="${value}"> ${
    selectedUser === "combined"
      ? round(dataObject[d.data.year].user1.afterTaxIncome + dataObject[d.data.year].user2.afterTaxIncome)
      : selectedUser === "user2"
      ? round(dataObject[d.data.year].user2.afterTaxIncome)
      : round(dataObject[d.data.year].user1.afterTaxIncome)
  }</p>
                                        </div>
                                    </div>
                                    `
}
//   ${formatIncomeName(name, user1Name, user2Name)}

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
//                          round(dataObject[d.data.year].user1.beforeTaxTaxableIncomeStreams[name]) || round(dataObject[d.data.year].user2.beforeTaxTaxableIncomeStreams[name])
//                        }</p>
//                      </div>
//                      <div style="${box}">
//                        <p> After tax</p>
//                        <p style="${value}"> ${
//                          round(dataObject[d.data.year].user1.afterTaxIncomeStreams[name]) || round(dataObject[d.data.year].user2.afterTaxIncomeStreams[name])
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
