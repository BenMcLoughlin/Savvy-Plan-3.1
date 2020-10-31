//import { maxTFSAWithdrawal } from "model/calculations/income/income.helpers"
import _ from "lodash"

const payment = function (rate, nperiod, pv, fv, type) {
  if (!fv) fv = 0
  if (!type) type = 0

  if (rate === 0) return -(pv + fv) / nperiod

  var pvif = Math.pow(1 + rate, nperiod)
  var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= 1 + rate
  }

  return Math.round(pmt)
}

// const maxPossibleRRSP = (income, year) => {

// }

// const maxTFSAWithdrawal = (tfsaStartYear, lifeSpan) => {
//   const tfsaWithdrawalDuration = lifeSpan - tfsaStartYear
//   const tfsaStartValue = maxTFSAValues["" + tfsaStartYear]

//   return payment(0.03, tfsaWithdrawalDuration, tfsaStartValue, 0, null)
// }
const retirementAge = 65
const retirementYear = 2067
const maxRRSPPayment = 18000
const maxTFSAPayment = 18000
const benfits = 20000

export const getTargetIncome = (annualIncome, maxTFSA, state, taxableIncome, year) => {
  const { income } = annualIncome
  const RetIncome = 40000
  const bracketDiff = 41725 - +taxableIncome
  const totalDiff = RetIncome - +taxableIncome
  const top5IncomeAverage = 40000
  const rrspContAdj = top5IncomeAverage / 70000

  const rrsp = (bracketDiff / totalDiff) * rrspContAdj
  const tfsa = year < 2050 ? 0 : maxTFSA / totalDiff
  const nReg = 1 - rrsp - tfsa > 0 ? 1 - rrsp - tfsa : 0

  const targetIncome = { ...income, rrspInc: rrsp * totalDiff, tfsaInc: tfsa * totalDiff, nRegInc: nReg * totalDiff }
  return targetIncome
}

// export const getTargetIncome = income => {
//   return _.range(2050, 2080).map(year => targetIncome(income[year].user1))[10]
// }
