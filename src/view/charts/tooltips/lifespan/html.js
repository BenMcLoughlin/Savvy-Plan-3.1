/* eslint-disable */
import * as u from "model/utils"

const tooltipWrapper = `
  width: 13rem;
  height: 5rem;
  border-radius: 5px;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`
const text = `
  width: 18rem;
  height: 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;

`
const age = `
  width: 15rem;
  height: 2.5rem;
  font-size: 1.2rem;

`

export const lifespanTooltipHtml = d => {
  return `
        <div style="${tooltipWrapper}">
            <div style="${text}">
              ${u.asPercentage(d.male + d.female)} of Women still alive
            </div style="${text}">
            <div style="${text}">
              ${u.asPercentage(d.male)} of Men still alive
            </div style="${text}">
      </div style="${tooltipWrapper}">
   `
}

export const lifespanTooltipHtml2 = d => {
  return `
        <div style="${age}">
                  Age ${d.year}
      </div style="${age}">
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
//                          u.asPercentage(dataObject[d.data.year].user1.income[name]) || u.asPercentage(dataObject[d.data.year].user2.income[name])
//                        }</p>
//                      </div>
//                      <div style="${box}">
//                        <p> After tax</p>
//                        <p style="${value}"> ${
//                          u.asPercentage(dataObject[d.data.year].user1.income[name]) || u.asPercentage(dataObject[d.data.year].user2.income[name])
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
//                          ? u.asPercentage(dataObject[d.data.year].user1.beforeTaxIncome + dataObject[d.data.year].user2.beforeTaxIncome)
//                          : selectedUser === "user2"
//                          ? u.asPercentage(dataObject[d.data.year].user2.beforeTaxIncome)
//                          : u.asPercentage(dataObject[d.data.year].user1.beforeTaxIncome)
//                      }</p>
//                    </div>
//                    <div style="${box}">
//                      <p> After tax</p>
//                      <p style="${value}"> ${
//                        selectedUser === "combined"
//                          ? u.asPercentage(dataObject[d.data.year].user1.afterTaxIncome + dataObject[d.data.year].user2.afterTaxIncome)
//                          : selectedUser === "user2"
//                          ? u.asPercentage(dataObject[d.data.year].user2.afterTaxIncome)
//                          : u.asPercentage(dataObject[d.data.year].user1.afterTaxIncome)
//                      }</p>
//                    </div>
//                  </div>
// </div>
