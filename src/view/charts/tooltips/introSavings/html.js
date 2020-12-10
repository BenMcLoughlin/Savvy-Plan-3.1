/* eslint-disable */
import * as u from "model/utils"

const wrapTwo = `
  height: 30rem;
  width: 44rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
`
const wrapper = `
  background: #eff5fb;
  height: 14rem;
  width: 44rem;
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
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 1rem;
  margin-top: 1rem;
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

const buildUserToolTip = (year, user, data) => `<div style="${wrapper}">
          <div style="${header}">
              <div style="${title}"> Average person with${user === "user2" ? "out" : ""} a plan...</div>
              <div style="${headerText}">${data[year][`${user}Explanation`]}</div>
          </div>
          <div style="${main}">
             <div style="${displayBox(data[year][`${user}Highlight`] === "income")}">
                <div style="${displayValue}">${u.asCurrency(data[year][`${user}Income`])}</div>
                <div style="${displayTitle}">income</div>
             </div>
             <div style="${displayBox(data[year][`${user}Highlight`] === "taxes")}">
                <div style="${displayValue}">${u.asCurrency(data[year][`${user}Taxes`])}</div>
                <div style="${displayTitle}">taxes</div>
             </div>
             <div style="${displayBox(data[year][`${user}Highlight`] === "spending")}">
                <div style="${displayValue}">${u.asCurrency(data[year][`${user}Spending`])}</div>
                <div style="${displayTitle}">spending</div>
             </div>
             <div style="${displayBox(data[year][`${user}Highlight`] === "investments")}">
                <div style="${displayValue}">${u.asCurrency(data[year][`${user}TotalSavings`])}</div>
                <div style="${displayTitle}">Investments</div>
             </div>
             <div style="${displayBox(data[year][`${user}Highlight`] === "networth")}">
                <div style="${displayValue}">${u.asCurrency(data[year][`${user}Networth`])}</div>
                <div style="${displayTitle}">networth</div>
             </div>
          </div>
      </div>
      `

export const stackedTooltipHtml = (d, allData) => {
  const { rawData: data } = allData
  if (data[d.year]) {
    return `
   <div style="${wrapTwo}">
     ${buildUserToolTip(d.year, "user1", data)}
     ${buildUserToolTip(d.year, "user2", data)}
   </div>
                                    `
  }
}

const wrapper2 = `
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

export const stackedTooltipValuesHtml = (d, dataObject, user) => {
  return null
  // let total = dataObject[d.year][user].totalSavings
  // return `
  //                                   <div style="${wrapper2}">
  //                                     <div style="${left}">
  //                                       <p style="${largeValue}">
  //                                       ${u.asCurrency(total)}
  //                                       <p>
  //                                     </div>
  //                                   </div>
  //                                   `
}
