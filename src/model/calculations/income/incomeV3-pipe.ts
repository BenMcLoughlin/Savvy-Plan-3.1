import { merge, pipe } from "model/utils"
import * as I from "model/types"
import _ from "lodash"
import { getCpp, getCcb, getAvgRate, getMargRate, addPensions, beforePension, getAfterTaxIncome, sum, getValues, getTargetIncome } from "model/calculations/income/income.helpers"

const getStreams = streamType => state => ({ streams: Object.values(state.stream_reducer).filter((d: I.a) => d.streamType === streamType) })

export const getYearRange = ({ ui_reducer: { chartStartYear, chartEndYear } }: I.state): I.n[] => _.range(chartStartYear, chartEndYear)

const buildYearRange = fn => state => ({
  yearRange: getYearRange(state).reduce((a, year) => {
    a[year] = { ...a[year], ...fn(state, year) }
    return a
  }, {}),
})

const forEachUser = fn => (state, year) =>
  ["user1", "user2"].reduce((a, user) => {
    a[user] = { ...a[user], ...fn(state, year, user) }
    return a
  }, {})

const income = (state, year, user) => {
  const value = state.streams
    .filter(stream => stream.owner === user)
    .reduce((a, stream) => {
      const value = Math.max(...Object.values(stream.in).map((d: I.a) => (d.start <= year && d.end > year ? d.value : 0)))
      a = { ...a, totalCppEligible: 53000, income: { ...a.income, [stream.name]: value }  }
      return a
    }, {})
  return value
}

const add = (...fns) => (state, year, user) => {
  const value = fns.reduce((a, fn) => {
    a = { ...a, ...fn(state, year, user) }
    return a
  }, {})
  return value
}

const calculate = (...fns) => (state, year, user) => fns.reduce((a, fn) => ({ ...a, ...fn(state, user) }), {})

const showTargetIncome = true

const savingAccountMaximums = state => ({ tfsa: 1000, rrsp: 3000, nreg: 4000 })

const cpp = (state, user) => ({
  cpp:  getCpp(state.yearRange, user, state),
}) //({ cpp: 100 });
const oas = (state, user) => ({ oas: 100 })

const governmentBenefits = (state, year, user) => ({
  oas: 1200,
  cpp: 1200,
})
const taxRates = () => ({
  taxRates: "ya",
})
const afterTaxIncome = () => ({
  afterTaxIncome: "ya",
})
const savingsIncome = () => {
  hi: "ya"
}

const mapYearRange = fn => state => ({
  yearRange: getYearRange(state).reduce((a, year) => {
    a[year] = merge({}, state.yearRange, {
      [year]: { ...fn(year) },
    })
    return a
  }, {}),
})

const to = (key, fn) => (state, year, user) =>
  merge({}, state.yearRange, {
    [key]: { ...fn(year) },
  })
export const incomeForcastV3 = state => {
  console.time()
  const value = pipe(
    getStreams("income"),
    buildYearRange(forEachUser(add(income))),
    forEachUser(calculate(cpp, oas, showTargetIncome ? savingAccountMaximums : null)),
    mapYearRange(forEachUser(to("income", add(governmentBenefits, taxRates, afterTaxIncome))))
    //forEachUser(addToEachYear(governmentBenefits, taxRates, afterTaxIncome, showTargetIncome ? savingsIncome : null))
  )(state)
  console.timeEnd()

  return value.user2
}
