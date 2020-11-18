/* eslint-disable */
import _ from "lodash"
import * as d3 from "d3"
import * as I from "model/types"
import { store } from "index"

export const round = (number: I.n): I.a => {
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
 * used to sum all both the contributions and withdrawals for all accounts and both users in a year. It returns an array that d3.max is applied to creating the maximum value.
 **/
const getSavingsBarMax = (dataObject: I.objects): I.n => {
  const savingsByYear = Object.values(dataObject)
  const arrayOfContributionAndWithdrawalTotals = savingsByYear.map(year => {
    let total = 0
    Object.values(year).map(user => {
      return Object.values(user).map((account: any) => {
        if (typeof account === "object") {
          //because the account contains a total value it returns undefined if it isn't removed
          return (total += account.contribute + account.withdraw)
        }
        return null
      })
    })
    return total
  })
  const max = d3.max(arrayOfContributionAndWithdrawalTotals)
  return max + 10000
}

const getSavingsAreaMinMax = dataObject => {
  const savingsByYear = Object.values(dataObject)
  const arrayOfSavingsTotals = savingsByYear.map((year: any) => {
    if ("user2" in year) return +year.user1.totalSavings + +year.user2.totalSavings
    return year.user1.totalSavings
  })
  const max = d3.max(arrayOfSavingsTotals)
  return max + 10000
}

/**
 * returns the maximum value for the view/charts x axis
 **/
export const getMax = (className: string, dataObject: I.objects): I.n => {
  const { isMarried } = store.getState().ui_reducer

  switch (className) {
    case "incomeChart": {
      const beforeTaxIncomeArray = Object.values(dataObject).map((d: any) => {
        if (isMarried) return d.user2.taxableInc + d.user1.taxableInc
        return d.user1.taxableInc
      })
      const max = d3.max(beforeTaxIncomeArray)
      return max > 100000 ? max + 30000 : 100000
    }
    case "cppAreaChart":
      return 20000
    case "oasAreaChart":
      return 12000
    case "savingsBarChart":
      return getSavingsBarMax(dataObject)
    case "savingsAreaChart":
      return getSavingsAreaMinMax(dataObject)
    case "savingsStackedAreaChart":
      return getSavingsAreaMinMax(dataObject)
    case "overviewAreaChart":
      return getSavingsAreaMinMax(dataObject) + 100000

      return 100000
  }
}

export const getMin = (className: string, dataObject: I.objects): I.n => {
  switch (className) {
    case "incomeChart":
      return 0
    case "savingsBarChart":
      return -getSavingsBarMax(dataObject)
    case "savingsAreaChart":
      return 0 //getSavingsAreaMinMax(dataObject)
    case "overviewAreaChart":
      return -getSavingsBarMax(dataObject)
  }

  return 100000
}

export const getPeakYear = (dataObject: I.objects): I.a => {
  const dataArray: any = Object.values(dataObject)

  dataArray.sort((a: any, b: any) => b.user1.tfsa.total - a.user1.tfsa.total)
  return dataArray[0]
}
//   .reduce((total, currentValue) => {
//     return total + currentValue.contribute
// }, 0))