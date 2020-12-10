import * as u from "model/utils"


const tooltipWrapper = `

  height: 8rem;
  width: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  opacity: 0.87;
  padding: 1rem;
  z-index: 100;
`
const tooltipTitle = `
    height: 3.5rem;
  font-size: 1.5em;
    border-bottom: 1px solid lightgrey;
  text-align: center;
  padding: .5rem;
`
const row = `
  height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
`
const displayBox = `
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
`
const displayValue1 = `
  height: 3.6rem;
  display: flex;
  align-content: center;
  font-size: 1.4rem;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid lightgrey;
`
const subTitle = `
  height: 2rem;
  font-size: .9rem;
  width: 8rem;
  text-align: center;
`
export const cppCenterTooltipHtml = (allData, selectedAge) => {
  const { chartData: data } = allData
  const d = data.filter(income => income.year === selectedAge)[0]

  return `
      <div style="${tooltipWrapper}">
        <div style="${tooltipTitle}">
             Age ${selectedAge}
        </div>
        <div style="${row}">
          <div style="${displayBox}">
            <div style="${displayValue1}">${u.asCurrency(d.value)}</div>
            <div style="${subTitle}">Annual Income</div>
          </div>
          <div style="${displayBox}">
            <div style="${displayValue1}">${u.asCurrency(d.value / 12)}</div>
            <div style="${subTitle}">Monthly Income</div>
          </div>
        </div>
      </div>
                                    `
}

const axisWrapper = `
  height: 8rem;
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  opacity: 0.87;
  padding: 1rem;
  z-index: 100;
`

const axisBox = `
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
`
const axisValue = `
  height: 4.6rem;
  display: flex;
  align-content: center;
  font-size: 1.6rem;
  padding: 1rem;
  font-weight: bold;
`
export const axisHtml = (d, value) => {
  return `
      <div style="${axisWrapper}">
                <div style="${subTitle}">Age ${value}</div>
        <div style="${axisBox}">
          <div style="${axisValue}">${u.asCurrency(d.value)}</div>
        </div>
      </div>
                                    `
}
