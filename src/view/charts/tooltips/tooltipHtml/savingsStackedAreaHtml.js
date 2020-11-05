/* eslint-disable */
import { comparisonData as data } from "data/planComparisonData"
import { round } from "view/charts/createChartFunctions/chartHelpers"

const wrapTwo = `
  height: 30rem;
  width: 42rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
`
const wrapper = `
  background: #eff5fb;
  height: 14rem;
  width: 42rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  opacity: 0.87;
  padding: 1rem;
  z-index: 100;
`
const header = `
  height: 5rem;
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`
const headerText = `
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1rem;
  margin-top: -0.4rem;
  height: 3rem;
`
const headerAge = `
  font-size: 1rem;
  position: absolute;
  top: .5rem;
  right: .5rem;
`
const main = `
  height: 7rem;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 1.4rem;
`
const displayBox = highlighted => `
  height: 6rem;
  flex: 1;
  display: flex;
  align-content: center;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
  transition: all 2s;
${
  highlighted
    ? `
border-radius: 5px;
background: #eff5fb;
box-shadow:  11px 11px 22px #d5dadf, 
             -11px -11px 22px #ffffff;
  `
    : "none"
};
`
const displayValue = `
  height: 3rem;
  display: flex;
  align-content: center;
  font-size: 1.4rem;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid lightgrey;
`
const title = `

`
const displayTitle = `
  height: 2rem;
  font-size: 1rem;
`

const buildUserToolTip = (year, user) => `<div style="${wrapper}">
          <div style="${header}">
              <div style="${title}"> Average person with${user === "user2" ? "out" : ""} a plan...</div>
              <div style="${headerText}">${data[year][user].explanation}</div>
              <div style="${headerAge}"> Age ${data[year][user].age}</div>
          </div>
          <div style="${main}">
             <div style="${displayBox(data[year][user].highlight === "income")}">
                <div style="${displayValue}">${round(data[year][user].income)}</div>
                <div style="${displayTitle}">income</div>
             </div>
             <div style="${displayBox(data[year][user].highlight === "taxes")}">
                <div style="${displayValue}">${round(data[year][user].taxes)}</div>
                <div style="${displayTitle}">taxes</div>
             </div>
             <div style="${displayBox(data[year][user].highlight === "spending")}">
                <div style="${displayValue}">${round(data[year][user].spending)}</div>
                <div style="${displayTitle}">spending</div>
             </div>
             <div style="${displayBox(data[year][user].highlight === "debts")}">
                <div style="${displayValue}">${round(data[year][user].debt)}</div>
                <div style="${displayTitle}">debt</div>
             </div>
             <div style="${displayBox(data[year][user].highlight === "totalSavings")}">
                <div style="${displayValue}">${round(data[year][user].totalSavings)}</div>
                <div style="${displayTitle}">totalSavings</div>
             </div>
             <div style="${displayBox(data[year][user].highlight === "networth")}">
                <div style="${displayValue}">${round(data[year][user].networth)}</div>
                <div style="${displayTitle}">networth</div>
             </div>
          </div>
      </div>
      `

export const savingsStackedAreaHtml = (d, dataObject, state) => {
  if (data[d.year]) {
    return `
   <div style="${wrapTwo}">
     ${buildUserToolTip(d.year, "user1")}
     ${buildUserToolTip(d.year, "user2")}
   </div>
                                    `
  }
}