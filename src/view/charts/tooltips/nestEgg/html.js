/* eslint-disable */
import * as u from "model/utils"

const tooltipWrapper = `
  background: #eff5fb;
  height: 22rem;
  width: 19rem;
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
    height: 4rem;
  font-size: 1.5em;
  text-align: center;
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
  height: 4.6rem;
  display: flex;
  align-content: center;
  font-size: 2.6rem;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid lightgrey;
`
const subTitle = `
  height: 4rem;
  font-size: 1rem;
  width: 8rem;
  text-align: center;
`
const centerTitle = `
  height: 2rem;
  font-size: 1rem;
  width: 12rem;
  text-align: center;
  font-style: italic;
`

export const nestEggDonutHtml = d => {

  if (d.data) {
    return `
          <div style="${tooltipWrapper}">
            <div style="${tooltipTitle}">${d.data.owner}'s Target ${u.asIncome(d.data.account)}</div>
            <div style="${displayBox}">
              <div style="${displayValue1}">${u.asCurrency(d.data.value)}</div>
              <div style="${subTitle}">Ideal Value at age 65</div>
            </div>
            <div style="${centerTitle}">So it can provide</div>
            <div style="${displayBox}">
              <div style="${displayValue1}">${u.asCurrency(d.data.income)}</div>
              <div style="${subTitle}">Income per year till age 95</div>
            </div>
          </div>
                                        `
  }
}
