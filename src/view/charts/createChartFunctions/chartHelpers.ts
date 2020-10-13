import _ from "lodash"
import * as d3 from "d3"

export const round = number => {
  if (number !== undefined && number <= 1000000) return `${(Math.round(number / 1000) * 1000) / 1000} k`
  if (number > 1000000) return `${(Math.round(number / 1000) * 1000) / 1000000} m`
  else return null
}
export const formatCurrency = number => {
  if (number < 100000) {
    return `${number / 1000} `
  }
  if (number >= 100000) {
    return `${number / 1000} K`
  }
}

export const formatIncomeName = (name, user1Name, user2Name) => {
  switch (name) {
    case "user1CppBenefit":
      return `${user1Name}'s Canada Pension Plan`
    case "user1OasBenefit":
      return `${user1Name}'s Old Age Security`
    case "user2CppBenefit":
      return `${user2Name}'s Canada Pension Plan`
    case "user2OasBenefit":
      return `${user2Name}'s Old Age Security`
    case "ccbBenefit":
      return `Canada Child Benefit`
  }
  return _.startCase(name)
}

/**
 * used to sum all both the contributions and withdrawals for all accounts and both users in a year. It returns an array that d3.max is applied to creating the maximum value.
 **/
const getSavingsBarMax = dataObject => {
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
    if ("user2" in year) return year.user1.totalSavings + year.user2.totalSavings
    else return year.user1.totalSavings
  })
  const max = d3.max(arrayOfSavingsTotals)
  return max + 10000
}

/**
 * returns the maximum value for the view/charts x axis
 **/
export const getMax = (className, dataObject, state) => {
  const { maritalStatus } = state.user_reducer

  switch (className) {
    case "incomeChart": {
      const beforeTaxIncomeArray = Object.values(dataObject).map((d: any) => {
        if (maritalStatus === "married") return d.user2.beforeTaxIncome + d.user1.beforeTaxIncome
        else return d.user1.beforeTaxIncome
      })
      const max = d3.max(beforeTaxIncomeArray)
      return max > 100000 ? max + 30000 : 100000
    }
    case "savingsBarChart":
      return getSavingsBarMax(dataObject)
    case "savingsAreaChart":
      return getSavingsAreaMinMax(dataObject)
    case "overviewAreaChart":
      return getSavingsAreaMinMax(dataObject) + 100000

      return 100000
  }
}

export const getMin = (className, dataObject, state) => {
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

export const getPeakYear = (dataObject, state) => {
  const dataArray: any = Object.values(dataObject)

  dataArray.sort((a: any, b: any) => b.user1.tfsa.total - a.user1.tfsa.total)
  return dataArray[0]
}
//   .reduce((total, currentValue) => {
//     return total + currentValue.contribute
// }, 0))
