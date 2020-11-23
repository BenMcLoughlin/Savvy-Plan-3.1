import { merge, pipe } from "model/utils"
import * as I from "model/types"
import _, { functions } from "lodash"
import { getCcb, getAvgRate, getMargRate, addPensions, beforePension, getAfterTaxIncome, sum, getValues } from "model/calculations/income/income.helpers"

import { getSavingsAccountMaximums } from "model/calculations/income/incomeV3.helpers"
import { getCpp, getOas } from "model/calculations/income/CanadaPensionPlan/CPPV3.function"
import { ccb } from "model/calculations/income/CanadaChildBenefit/CCBV3"

interface take {
  state: any
  streams: any
}

class TurnStreamsIntoData {
  state: any
  streams: any
  yearRange: any
  results: any

  constructor(state) {
    this.state = state
    this.streams = []
    this.yearRange = {}
    this.results = {}
  }

  setReleventStreams(streamType) {
    this.streams = Object.values(this.state.stream_reducer).filter((d: I.a) => d.streamType === streamType)
    return this
  }

  mapYears(fn) {
    const yearRange = years(this.state).reduce((a, year) => ({ ...a, [year]: merge({}, a[year], forEachUser(fn, this, year)) }), {})
    this.yearRange = merge({}, this.yearRange, yearRange)
    return this
  }

  /**
   * @param fns - any number of functions that return objects
   * @return adds to the results object the values calucated by the functions, eg Canada Pension Plan Payment
   */

  calculate(...fns) {
    fns.forEach(fn => (this.results = merge({}, this.results, forEachUser(fn, this))))
    return this
  }

  functionLongerMaker() {
    return this
  }
}

export const add = (...fns: I.a): I.objects => (user, obj, year) => {
  const returnValue = fns.reduce((a, fn) => merge({}, a, fn(user, obj, year)), {})
  console.log("returnValue:", returnValue)
  return returnValue
}

export const income = (user: I.user, { streams }, year: number): I.objects => {
  const returnValue = streams
    .filter(stream => stream.owner === user)
    .reduce((a, stream) => {
      const value = Math.max(...Object.values(stream.in).map((d: I.a) => (d.start <= year && d.end > year ? d.value : 0)))
      a.cppEligible = value + (a.cppEligible || 0)
      a = { ...a, income: { ...a.income, [stream.name]: value } }
      return a
    }, {})
  return returnValue
}

export const forEachUser = (fn, ...args) => ["user1", "user2"].reduce((a, user) => ({ ...a, [user]: fn(user, ...args) }), {})

export const years = ({ ui_reducer: { chartStartYear, chartEndYear } }: I.state): number[] => _.range(chartStartYear, chartEndYear)

const cpp = (user, state) => ({ cpp: getCpp(user, state) })
const oas = (user, state) => ({ oas: getOas(user, state) })
//const oas = (user, state) => ({ oas: getOas(user, state) })
const savingsAccountMaximums = (user, state) => getSavingsAccountMaximums(user, state)

const benefits = (user, { results }) => ({ income: results[user] })

// const ccb = (user, fnState, year) => ({ ccb: 100 })

const taxRates = (user, { yearRange }, year) => ({ taxRate1: 0.3, taxRate2: 0.3 })

export const buildIncomeForcast = state => {
  const turnStreamsIntoData = new TurnStreamsIntoData(state)

  console.time("incomeV3")

  const returnValue = turnStreamsIntoData
    .setReleventStreams("income")
    .mapYears(add(income))
    .calculate(cpp, oas, savingsAccountMaximums)
    .mapYears(add(ccb, benefits, taxRates))
    .functionLongerMaker()
    .functionLongerMaker()
  console.timeEnd("incomeV3")

  return returnValue.yearRange
}
