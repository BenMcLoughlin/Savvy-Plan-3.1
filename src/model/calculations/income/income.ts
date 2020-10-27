import _ from "lodash"
import * as I from "model/types"
import { getCpp, getCcb, getTargetIncome, getAvgRate, getMargRate, getYearRange, insertBenefits, beforePension, getAfterTaxIncome, sum } from "model/calculations/income/income.helpers"
import { insert1, insert2, Helpers, memoize } from "model/calculations/helpers"
import { createSelector } from "reselect"

const lets = new Helpers()

export const buildIncomeForcast = (state: I.state) => {
  // console.time()

  let inc = {}

  const { selectedUser } = state.ui_reducer

  const users: I.owner[] = ["user1", "user2"]

  users.forEach(user => {
    const { streams } = lets.turn(state.main_reducer).intoArray().filteredFor(["streamType", "income"], ["owner", user])
    return getYearRange(state).forEach(year => (inc = insert1(inc, user, year, beforePension(streams, year))))
  })

  users.forEach((user: I.owner) => {
    const cpp = getCpp(inc, user, state)
    const oas = 12000
    getYearRange(state).forEach(year => {
      const ccb = getCcb(inc, year, state)
      return (inc = insertBenefits(inc, user, year, "income", ccb, cpp, oas, state))
    })
  })

  const chartArray = []

  users.forEach((user: I.owner) => {
    const { streams } = lets.turn(state.main_reducer).intoArray().filteredFor(["streamType", "income"], ["owner", user])
    getYearRange(state).forEach(year => {
      const taxableIncome = sum(inc[year][user].income, "taxable", streams)
      const marginalRate = getMargRate(taxableIncome)
      const averageRate: any = getAvgRate(taxableIncome)
      const afterTaxIncome = getAfterTaxIncome(inc[year][user].income, averageRate, streams)
      const targetIncome = getTargetIncome(taxableIncome)
      // const afterTaxIncome = taxableIncome * (1 - averageRate)
      inc = insert2(inc, user, year, { afterTaxIncome, averageRate, marginalRate, taxableIncome, targetIncome })
      if (selectedUser === user) {
        return chartArray.push({ ...inc[year][user].income, year })
      } else if (selectedUser === "combined" && user == "user1") chartArray.push({ ...inc[year].user1.income, ...inc[year].user2.income, year })
    })
  })

  // console.log(JSON.stringify(inc, null, 4))
  // console.timeEnd()
  return { chartArray, inc }
}
