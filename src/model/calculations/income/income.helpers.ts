import _ from "lodash"
import { insert0 } from "model/calculations/helpers"
import * as I from "model/types"
import { maxTFSAValues } from "./targetIncome/target.data"
import { payment } from "model/services/financialFunctions"
export { getCpp } from "model/calculations/income/CanadaPensionPlan/CPP.function"
export { getCcb } from "model/calculations/income/CanadaChildBenefit/CCB.function"
export { getTargetIncome } from "model/calculations/income/targetIncome/targetIncome.function"
export { getAvgRate, getMargRate } from "model/calculations/income/tax/tax.helpers"

export const insertBenefits = (object: I.incomeForcast, user: I.user, year:I.n, key3: string, ccb:I.n, cpp:I.n, oas:I.n, state:I.state): I.objects => {
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

export const getYearRange = (state: I.state): I.n[] => {
  const { chartStartYear, chartEndYear } = state.ui_reducer
  return _.range(chartStartYear, chartEndYear)
}

export const getRetirementRange = (user: I.user, { user_reducer }: I.state): I.n[] => {
  const startYear = user_reducer[user].birthYear + user_reducer[user].cppStartAge
  return _.range(startYear, startYear + 30)
}

export const sum = (obj: I.objects, query: string, streams: I.stream[]): I.n =>
  Object.entries(obj).reduce((acc: any, [k, v]) => {
    const stream: I.stream = streams.find(d => d.name === k)
    return !!stream ? acc + (stream[query] ? v : 0) : acc + v
  }, 0)

export const getAfterTaxIncome = (obj: I.objects, rate: I.n, streams: I.stream[]): I.a => {
  let newObj = {}
  Object.entries(obj).forEach(([k, v]) => {
    const stream: I.stream = streams.find(d => d.name === k)
    return !!stream && !stream.taxable ? (newObj = { ...newObj, [k]: +v }) : (newObj = { ...newObj, [k]: +v * (1 - rate) })
  })
  return newObj
}

export const beforePension = (streams: I.stream[], year: I.n): I.objects => {
  let income = {}
  streams.map(stream => {
    const value = Math.max(...Object.values(stream.in).map((d: any) => (d.start <= year && d.end > year ? d.value : 0)))
    return (income = insert0(income, stream.name, value))
  })
  const cppEligibleIncome = sum(income, "cppEligible", streams)
  return { income, cppEligibleIncome }
}

export const maxTFSAWithdrawal = (tfsaStartYear: I.n, lifeSpan: I.n): I.n => {
  const tfsaWithdrawalDuration = lifeSpan - tfsaStartYear
  const tfsaStartValue = maxTFSAValues["" + tfsaStartYear]

  return -payment(0.03, tfsaWithdrawalDuration, tfsaStartValue, 0, null)
}
