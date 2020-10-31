import { round } from "view/charts/createChartFunctions/chartHelpers"

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

export const savingsBarHtml = (d, dataObject, n, state) => {
  const { user1BirthYear } = state.user_reducer

  const value = Object.values(d.data)[1]

  const color = "red"
  return `
                                   <div style="${topHeader}">
                                    <p> ${d.data.year}</p>
                                    <p> Age: ${+d.data.year - +user1BirthYear}</p>
                                    </div>
                                    <div  style="${titleRow(color)}">
                                    ${value > 0 ? "Contribution" : "Withdrawal"}
                                    </div>
                                    <div style="${row(color)} ">
                                       <div style="${box}">
                                        <p style="${value}"> ${round(value)}</p>
                                      </div>
                                       <div style="${box}">
                                      </div>
                                    </div>
                                    <div class="title-row">
                                    Total
                                    </div>
                                    <div class="row">
                                       <div style="${box}">
                                        <p> Before tax</p>
                                        <p style="${value}"> ${1000} K</p>
                                      </div>
                                       <div style="${box}">
                                        <p> After tax</p>
                                        <p style="${value}"> ${1000} K</p>
                                      </div>
                                    </div>
                                    `
}
