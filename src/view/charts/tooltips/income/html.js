/* eslint-disable */
import * as u from "model/utils"

const tooltipWrapper = `
  background: #eff5fb;
   width: 29rem;
   height: 20rem;
   z-index: 300;
   border-radius: 5px;
   padding: 1rem;
  opacity: 0.94;
  padding: 1rem;
  z-index: 100;
`

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

export const incomeTooltipHtml = (d, allData, colors, n) => {
  const value = d[1] - d[0]

  const name = Object.entries(d.data).filter(([k, v]) => {
    if (typeof v === "number") return +v.toFixed() === +value.toFixed()
  })[0][0]

  const { forcast } = allData

  const color = colors[name]

  const { year } = d.data
  const { selectedUser, isMarried } = allData.ui_reducer
  const { firstName: user1FirstName, birthYear: user1BirthYear } = allData.user_reducer.user1
  const { firstName: user2FirstName, birthYear: user2BirthYear } = allData.user_reducer.user2
  const { firstName } = allData.user_reducer[selectedUser] || { firstName: " " }

  const hoveredUser =
    selectedUser !== "combined"
      ? selectedUser
      : Object.keys(forcast[year].user1.income).includes(name)
      ? "user1"
      : "user2"

  const { income, afterTaxIncome, taxableInc, averageRate } = forcast[year][hoveredUser]
  const { taxableInc: user1TaxableInc, afterTaxIncome: user1afterTaxInc } = forcast[year].user1
  let user2TaxableInc = 0
  let user2afterTaxInc = 0
  if (isMarried) {
    const { taxableInc, afterTaxIncome } = forcast[year].user2
    user2TaxableInc = taxableInc
    user2afterTaxInc = afterTaxIncome
  }
  console.log("income:", income)
  return `
                <div style="${tooltipWrapper}">
                   <div style="${topHeader}">
                                        <p> ${d.data.year}</p>
                                        <p> Age: ${d.data.year - user1BirthYear}</p>
                                    </div>
                                    <div  style="${titleRow(color)}">
                                    ${u.asIncome(name, user1FirstName, user2FirstName)}
                                    </div>
                                    <div style="${row(color)} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${u.asCurrency(income[name])}</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p> 
                                          <p style="${value}"> ${u.asCurrency(
    income[name] * (1 - averageRate)
  )}</p>
                                        </div>
                                    </div>
                                    <div  style="${titleRow("grey")}">
                                   ${
                                     selectedUser === "combined" ? "Combined" : `${firstName}'s`
                                   }  Annual Total
                                    </div>
                                    <div style="${row("grey")} ">
                                      <div style="${box}">
                                          <p> Before tax</p>
                                          <p style="${value}"> ${
    selectedUser === "combined"
      ? u.asCurrency(user1TaxableInc + user2TaxableInc)
      : u.asCurrency(taxableInc)
  }</p>
                                        </div>
                                        <div style="${box}">
                                          <p> After tax</p>
                                           <p style="${value}"> ${
    selectedUser === "combined"
      ? u.asCurrency(user1afterTaxInc + user2afterTaxInc)
      : u.asCurrency(afterTaxIncome)
  }</p>
                                        </div>
                                    </div>
                                </div>
                                    `
}
