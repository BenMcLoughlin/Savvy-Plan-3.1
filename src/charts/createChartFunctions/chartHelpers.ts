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

export const getMax = (dataObject, state) => {
  const {maritalStatus} = state.user_reducer

    //   const beforeTaxIncomeArray = Object.values(dataObject).map(d => {
    //   if (maritalStatus === "married") return d.user2.beforeTaxIncome + d.user1.beforeTaxIncome
    //   else return d.user1.beforeTaxIncome
    // })
return 100000
  }