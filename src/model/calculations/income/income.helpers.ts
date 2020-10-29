import _ from "lodash"
import { insert0 } from "model/calculations/helpers"
import * as I from "model/types"
import { maxTFSAValues } from "./targetIncome/target.data"
import { payment } from "model/services/financialFunctions"

export { getCpp } from "model/calculations/income/CanadaPensionPlan/CPP.function"
export { getCcb } from "model/calculations/income/CanadaChildBenefit/CCB.function"
export { getTargetIncome } from "model/calculations/income/targetIncome/targetIncome.function"
export { getAvgRate, getMargRate } from "model/calculations/income/tax/tax.helpers"

export const insertBenefits = (object: I.incomeForcast, user, year, key3, ccb, cpp, oas, state) => {
  const { birthYear, cppStartAge, oasStartAge } = state.user_reducer[user]
  const cppStartYear = +birthYear + +cppStartAge
  const oasStartYear = +birthYear + +oasStartAge
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: {
        ...object[year][user],
        [key3]: {
          ...object[year][user][key3],
          [`${user}Ccb`]: user === "user1" ? ccb : 0,
          [`${user}Cpp`]: year < cppStartYear ? 0 : cpp,
          [`${user}Oas`]: year < oasStartYear ? 0 : oas,
        },
      },
    },
  })
}

export const getYearRange = ({ user_reducer }) => {
  const startYear = Math.min(user_reducer.user1.birthYear, user_reducer.user2.birthYear)
  return _.range(startYear + 18, startYear + 95)
}

export const getRetirementRange = (user, { user_reducer }) => {
  const startYear = user_reducer[user].birthYear + user_reducer[user].cppStartAge
  return _.range(startYear, startYear + 30)
}

export const sum = (obj, query, streams) =>
  Object.entries(obj).reduce((acc: any, [k, v]) => {
    let stream = streams.find(d => d.name === k)
    return !!stream ? acc + (stream[query] ? v : 0) : acc + v
  }, 0)

export const getAfterTaxIncome = (obj, rate, streams) => {
  let newObj = {}
  Object.entries(obj).forEach(([k, v]) => {
    let stream = streams.find(d => d.name === k)
    return !!stream && !stream.taxable ? (newObj = { ...newObj, [k]: +v }) : (newObj = { ...newObj, [k]: +v * (1 - rate) })
  })
  return newObj
}

export const beforePension = (streams, year) => {
  let income = {}
  streams.map(stream => {
    const value = Math.max(...Object.values(stream.in).map((d: any) => (d.start < year && d.end > year ? d.value : 0)))
    return (income = insert0(income, [stream.name], value))
  })
  const cppEligibleIncome = sum(income, "cppEligible", streams)
  return { income, cppEligibleIncome }
}

export const maxTFSAWithdrawal = (tfsaStartYear, lifeSpan) => {
  const tfsaWithdrawalDuration = lifeSpan - tfsaStartYear
  const tfsaStartValue = maxTFSAValues["" + tfsaStartYear]

  return -payment(0.03, tfsaWithdrawalDuration, tfsaStartValue, 0, null)
}
