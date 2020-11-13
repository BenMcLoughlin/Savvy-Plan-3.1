import userEvent from "@testing-library/user-event"
import _ from "lodash"
import { insert0 } from "model/calculations/helpers"
import * as I from "model/types"
export { getCpp } from "model/calculations/income/CanadaPensionPlan/CPP.function"
export { getCcb } from "model/calculations/income/CanadaChildBenefit/CCB.function"
export { getTargetIncomeV2 } from "model/calculations/income/targetIncome/targetIncome.function"
export { getAvgRate, getMargRate } from "model/calculations/income/tax/tax.helpers"
import { tCon, rCon } from "model/calculations/income/data"
import { map, meanBy, merge } from "lodash"
import { Finance } from "financejs"
import { set } from "model/redux/actions"

export const addPensions = (cpp, oas, ccb, inc, year, user) => ({
  ...inc[year][user].income,
  [`${user}Ccb`]: user === "user1" ? ccb : 0,
  [`${user}Cpp`]: year < 2050 ? 0 : cpp,
  [`${user}Oas`]: year < 2050 ? 0 : oas,
})

export const getYearRange = ({ ui_reducer: { chartStartYear, chartEndYear } }): I.n[] => _.range(chartStartYear, chartEndYear)

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

export const beforePensionV2 = (streams, y) =>
  streams.reduce((a, n) => {
    const value = Math.max(...Object.values(n.in).map((d: I.a) => (d.start <= y && d.end > y ? d.value : 0)))
    a[n.name] = value
    a.cppEligibleIncome = a.cppEligibleIncome + value || value
    return a
  }, {})

let fin = new Finance()

export const getValues = (u: I.user, r1: number, r2: number, inc, s: number, e: number, showTargetIncome: boolean) => {
  if (!showTargetIncome) {
    return {
      maxTfsa: 0,
      maxRrsp: 0,
      topTenAvg: 0,
    }
  }
  const checkMax = (value, year) => (value > (rCon[year] || rCon[2022]) ? rCon[year] || rCon[2022] : value)
  const topTenAvg = meanBy(
    Object.values(inc)
      .sort((a, b) => b[u].cppEligibleIncome - a[u].cppEligibleIncome)
      .slice(0, 10),
    (d: I.a) => d[u].cppEligibleIncome
  )

  set("user_reducer", { [u]: { avgIncome: topTenAvg } })

  return {
    maxTfsa: -fin.PMT(
      r2,
      30,
      Object.entries(tCon).reduce((a, [k, v]) => a + (+k > +s && +k < +e ? v + a * r1 : 0), 0)
    ),
    maxRrsp: -fin.PMT(
      r2,
      30,
      Object.entries(inc).reduce((a, [k, v]) => a + (+k > +s && +k < +e ? checkMax(v[u].cppEligibleIncome * 0.18, k) + a * r1 : 0), 0)
    ),
    topTenAvg,
    incPerc: 0.5,
  }
}

export const getTargetIncome = (endWork, income, incPerc, retIncome, taxableInc, maxTfsa, maxRrsp, topTenAvg, year, user) => {
  const retInc = retIncome * incPerc

  const lowBracketDiff = taxableInc < 41725 ? 41725 - taxableInc : 0
  const totalDiff = retInc > taxableInc ? retInc - taxableInc : 0
  const rrspContAdj = topTenAvg / 70000

  const rrspPerc = (lowBracketDiff / totalDiff) * rrspContAdj
  const rrspWithdrawal = year > endWork ? rrspPerc * totalDiff : 0

  const tfsaPerc = +retInc < maxTfsa + 41725 ? 1 - rrspPerc : maxTfsa / totalDiff
  const tfsaWithdrawal = year > endWork ? tfsaPerc * totalDiff : 0

  const nRegPerc = rrspPerc + tfsaPerc < 1 ? 1 - rrspPerc - tfsaPerc : 0
  const nRegWithdrawal = year > endWork ? nRegPerc * totalDiff : 0

  return {
    ...income,
    [`${user}Rrsp`]: rrspWithdrawal > 0 ? rrspWithdrawal : 0,
    [`${user}Tfsa`]: tfsaWithdrawal > 0 ? tfsaWithdrawal : 0,
    [`${user}Nreg`]: nRegWithdrawal > 0 ? nRegWithdrawal : 0,
  }
}


export const getAccountPresentValues = (values, r, retYear) => {
  return values.reduce((a, n, i) => (a.user1Tfsa = (a.user1Tfsa + (n.year > retYear ? a.user1Tfsa / (1 + r) ** (i + 1) : 0) || 0), 0))
}