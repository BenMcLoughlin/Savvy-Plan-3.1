/* eslint-disable */
import _ from "lodash"
import * as d3 from "d3"
import * as I from "../src/model/utils/validate/node_modules/model/types"
import { store } from "index"

export const round = (number: I.n): I.a => {
  if (number <= 0.1) {
    return `${(number * 100).toFixed(2)}%`
  }
  if (number <= 1) {
    return `${(number * 100).toFixed()}%`
  }
  if (number !== undefined && number <= 10000) return `${(Math.round(number / 100) * 100) / 1000} k`
  if (number !== undefined && number <= 1000000) return `${(Math.round(number / 1000) * 1000) / 1000} k`
  if (number > 1000000) return `${(Math.round(number / 10000) * 10000) / 1000000} M`
  return null
}
export const formatCurrency = (number: I.n): string => {
  if (number <= 10000) {
    return `${number / 100} K`
  }
  if (number < 100000) {
    return `${number / 1000} `
  }
  if (number >= 100000) {
    return `${number / 1000} K`
  }
  if (number >= 10000) {
    return `${number / 100} K`
  }
}

export const formatIncomeName = (name: string, user1Name?: string, user2Name?: string): string => {
  switch (name) {
    case "user1Cpp":
      return `${user1Name}'s Canada Pension Plan`
    case "user2Cpp":
      return `${user2Name}'s Canada Pension Plan`
    case "user1Rrsp":
      return `${user1Name}'s RRSP Income`
    case "user2Rrsp":
      return `${user2Name}'s RRSP Income`
    case "user1Tfsa":
      return `${user1Name}'s TFSA Income`
    case "user2Tfsa":
      return `${user2Name}'s TFSA Income`
    case "user1Nreg":
      return `${user1Name}'s Non-Registered Income`
    case "user2Nreg":
      return `${user2Name}'s Non-Registered Income`
    case "user1Oas":
      return `${user1Name}'s Old Age Security`
    case "user2Oas":
      return `${user2Name}'s Old Age Security`
    case "user1Ccb":
      return `Canada Child Benefit`
    case "rrsp":
      return `R.R.S.P`
    case "tfsa":
      return `T.F.S.A`
    case "nreg":
      return `Non-Registered Savings`
  }
  return _.startCase(name)
}

/**
 * returns the maximum value for the view/charts x axis
 **/
export const getMax = (className: string, allData): I.n => {

  switch (className) {
    case "incomeChart": {
      if (allData.calcResults.user2.topTenAvg) return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 10000
      return allData.calcResults.user1.topTenAvg + 10000
    }
    case "cppChart":
      return 20000
    case "oasChart":
      return 12000
    case "lifespanChart":
      return 0.9
    case "savingsBarChart":
      return allData.calcResults.user1.chartMax
    case "savingsChart": 
     return allData.calcResults.user1.chartMax
    //   if (allData.calcResults.user2.topTenAvg) return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 10000
    //   return allData.calcResults.user1.topTenAvg + 10000
    // }
    case "savingsStackedChart":
        return allData.calcResults.user1.chartMax
    case "overviewChart":
      return 100000

      return 100000
  }
}

export const getMin = (className: string, dataObject: I.objects): I.n => {
  switch (className) {
    case "incomeChart":
      return 0
  }

  return 100000
}
