/* eslint-disable */
import * as I from "model/types"
import { getCpp, getCcb, getAvgRate, getMargRate, getYearRange, insertBenefits, beforePension, getAfterTaxIncome, sum } from "model/calculations/income/income.helpers"
import { insert1, insert2, insert3, Helpers } from "model/calculations/helpers"
import {tfsaContribution} from "./target.data"
//import { maxTFSAWithdrawal } from "model/calculations/income/income.helpers"
//import _ from "lodash"

// const payment = function (rate, nperiod, pv, fv, type) {
//   if (!fv) fv = 0
//   if (!type) type = 0

//   if (rate === 0) return -(pv + fv) / nperiod

//   var pvif = Math.pow(1 + rate, nperiod)
//   var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

//   if (type === 1) {
//     pmt /= 1 + rate
//   }

//   return Math.round(pmt)
// }

// const maxPossibleRRSP = (income, year) => {

// }

// const maxTFSAWithdrawal = (tfsaStartYear, lifeSpan) => {
//   const tfsaWithdrawalDuration = lifeSpan - tfsaStartYear
//   const tfsaStartValue = maxTFSAValues["" + tfsaStartYear]

//   return payment(0.03, tfsaWithdrawalDuration, tfsaStartValue, 0, null)
// }
// const retirementAge = 65
// const retirementYear = 2067
// const maxRRSPPayment = 18000
// const maxTFSAPayment = 18000
// const benfits = 20000

const getTfsaMax = birthYear => tfsaContribution[+birthYear+18]
const getRrspMax = () => 18000

const getRrsp = (inc, max, year) => 100
const getTfsa = (inc, max, year) => 100
const getNreg = (inc, year) => 100

type getTargetIncome = (inc: I.objects, state: I.state) => I.objects

export const getTargetIncome: getTargetIncome = (inc, state) => {
  const { selectedUser, users } = state.ui_reducer
  const chartArray = []
  users.forEach((user: I.user) => {
    const { birthYear } = state.user_reducer[user]

    const maxTfsa = getTfsaMax(birthYear)
    const maxRrsp = getRrspMax()

console.log('maxTfsa:', maxTfsa)

    getYearRange(state).forEach((year: I.a) => {
      const rrsp = getRrsp(inc, maxTfsa, year)
      const tfsa = getTfsa(inc, maxRrsp, year)
      const nreg = getNreg(year, inc)
      inc = insert3(inc, year, user, "income", {
        [`${user}Rrsp`]: rrsp,
        [`${user}Tfsa`]: tfsa,
        [`${user}Nreg`]: nreg,
      })
      if (selectedUser === user) {
        return chartArray.push({ ...inc[year][user].income, year })
      } else if (selectedUser === "combined" && user === "user1") chartArray.push({ ...inc[year].user1.income, ...inc[year].user2.income, year })
    })
  })

  //console.log(inc)
  // Object.values(inc).map((year) => {
  //   users.map(user => {
  //     const rrsp = 2000
  //     const tfsa = 2000
  //     return inc = {
  //       ...inc,
  //       [year]: {
  //         ...inc.year,
  //         [user]: {
  //           ...inc.year[user],
  //           income: {
  //             ...inc.year[user].income,
  //             user1rrsp: rrsp,
  //             user1tfsa: tfsa,
  //           }
  //         },
  //       },
  //     }
  //   })
  //   return inc
  // }, {})
  // const { income } = annualIncome
  // const RetIncome = 40000
  // const bracketDiff = 41725 - +taxableIncome
  // const totalDiff = RetIncome - +taxableIncome
  // const top5IncomeAverage = 40000
  // const rrspContAdj = top5IncomeAverage / 70000
  // const rrsp = (bracketDiff / totalDiff) * rrspContAdj
  // const tfsa = year < 2050 ? 0 : maxTFSA / totalDiff
  // const nReg = 1 - rrsp - tfsa > 0 ? 1 - rrsp - tfsa : 0
  // const targetIncome = { ...income, rrspInc: rrsp * totalDiff, tfsaInc: tfsa * totalDiff, nRegInc: nReg * totalDiff }
  // return targetIncome

  return { chartArray2: chartArray }
}

// export const getTargetIncome = income => {
//   return _.range(2050, 2080).map(year => targetIncome(income[year].user1))[10]
// }
