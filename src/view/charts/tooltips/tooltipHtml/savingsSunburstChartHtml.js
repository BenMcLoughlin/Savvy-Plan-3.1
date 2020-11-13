/* eslint-disable */
import { round } from "view/charts/createChartFunctions/chartHelpers"

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

export const savingsSunburstChartHtml = (d) => {
console.log(d)
  return `
                                    <div style="${wrapper}">
                                      <div style="${left}">
                                        <p style="${largeValue}">
                                        ${d.data.name}
                                        <p>
                                      </div>
                                      <div style="${right}">
                                        <p>
                                            ${round(d.data.value) || round(d.value)}
                                        <p>
                                       </div>
                                    </div>
                                    `
}
