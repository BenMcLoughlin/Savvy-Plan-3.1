import _ from "lodash"
import * as d3 from "d3"

export const round = number => {
  if (number !== undefined) return (Math.round(number / 1000) * 1000) / 1000
  else return null
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
const getSavingsMinMax = (dataObject, query) => {
  const savingsByYear = Object.values(dataObject)
  const arrayOfContributionAndWithdrawalTotals = savingsByYear.map(year => {
    const transaction = query === "max" ? "contribute" : "withdraw"
    let total = 0
    Object.values(year).map(user => {
      Object.values(user).map(account => {
        if (typeof account === "object") {
          //because the account contains a total value it returns undefined if it isn't removed
          return (total += account[transaction])
        }
      })
    })
    return total
  })
  return d3.max(arrayOfContributionAndWithdrawalTotals)
}

/**
 * returns the maximum value for the charts x axis
 **/
export const getMax = (className, dataObject, state) => {
  const { maritalStatus } = state.user_reducer
  const { selectedAccount } = state.ui_reducer

  switch (className) {
    case "incomeChart": {
      const beforeTaxIncomeArray = Object.values(dataObject).map((d: any) => {
        if (maritalStatus === "married") return d.user2.beforeTaxIncome + d.user1.beforeTaxIncome
        else return d.user1.beforeTaxIncome
      })
      const max = d3.max(beforeTaxIncomeArray)
      return max > 100000 ? max + 30000 : 100000
    }
    case "savingsBarChart": return 20000 //getSavingsMinMax(dataObject, "max")

  return 100000
}
}


export const getMin = (className, dataObject, state) => {
  const { maritalStatus } = state.user_reducer
  const { selectedAccount } = state.ui_reducer

  switch (className) {
    case "incomeChart": return 0
    case "savingsBarChart": return -40000  // -getSavingsMinMax(dataObject, "min")
  }

  return 100000
}

//   .reduce((total, currentValue) => {
//     return total + currentValue.contribute
// }, 0))
