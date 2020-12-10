/* eslint-disable */
import * as u from "model/utils"

const wrapper = `
  background: #eff5fb;
  height: 4rem;
  width: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 25px;
  align-items: center;
  opacity: 0.87;
  padding: 1rem;
  z-index: 100;
`
const header = `
  height: 5rem;
  width: 100%;
  display: flex;
  margin-left: 1rem;
  align-content: center;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

// const buildUserToolTip = (year, user, data, text) => `
// <div style="${wrapper}">
//           <div style="${header}">
//             ${text} ${u.asCurrency(data[year][`${user}TotalSavings`])}
//           </div>
//  </div>
//       `

export const stackedTooltipHtml = (d, allData, user, text) => {
  const { rawData: data } = allData
  if (data[d.year]) {
    return `
      <div style="${wrapper}">
                <div style="${header}">
                  ${text} $${u.asCurrency(data[d.year][`${user}TotalSavings`])}
                </div>
      </div>
                                    `
  }
}
