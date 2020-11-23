import * as I from "model/types"
import { getCpp, getCcb, getAvgRate, getMargRate, getYearRange, addPensions, beforePension, getAfterTaxIncome, sum, getValues, getTargetIncome } from "model/calculations/income/income.helpers"
import { merge } from "model/utils"
import { filter, startCase, take } from "lodash"
import { set } from "model/redux/actions"

const PV = (n, r, v) => v / (1 + r) ** n

const setTargetSavings = (inc, r, endWork, user) => {
  const keys = ["tfsa", "rrsp", "nreg"]
  const array = []
  Object.entries(inc).forEach(([year, v]) => (year > endWork ? array.push({ ...v[user].income, year: +year }) : 0))
  return array.reduce((a, v, i) => {
    return (
      keys.map(s => {
        const pv = PV(i + 1, r, v[`${user}${startCase(s)}`])
        return (a[`${s}NestEgg`] = a[`${s}NestEgg`] + pv || pv)
      }),
      a
    )
  }, {})
}



const getTargetWithdrawals = (inc, endWork, user) => ["tfsa", "rrsp", "nreg"].reduce((a, n) => ((a[`${n}Inc`] = inc[endWork + 5][user].income[`${user}${startCase(n)}`]), a), {})

export const buildIncomeForcast = (state: I.state): I.objects => {
  console.time('incomeV2')
  let inc = {}
  const showTargetInc = true
  const { selectedUser, users } = state.ui_reducer
  const { r1, r2, retIncome } = state.user_reducer

  users.forEach(user => {
    const streams = filter(state.stream_reducer, d => d.streamType === "income" && d.owner === user)
    return getYearRange(state).forEach(year => {
      inc = merge({}, inc, { [year]: { [user]: beforePension(streams, year) } })
    })
  })

  const chartArray = []

  users.forEach((user: I.user) => {
    const streams = filter(state.stream_reducer, d => d.streamType === "income" && d.owner === user)
    const cpp = getCpp(inc, user, state)
    const oas = 12000
    const {startWork, rrspStartAge, tfsaStartAge, endWork} = state.user_reducer[user]
    const { maxTfsa, maxRrsp, topTenAvg } = getValues(user, r1, r2, inc, startWork, endWork, showTargetInc)

    getYearRange(state).forEach(year => {
      const ccb = getCcb(inc, year, state)
      const inc0 = addPensions(cpp, oas, ccb, inc, year, user)
      const taxableInc0 = sum(inc0, "taxable", streams)
      const income = showTargetInc ? getTargetIncome(endWork, inc0, 1/users.length, retIncome, taxableInc0, maxTfsa, maxRrsp, topTenAvg, year, user,) : inc0
      const taxableInc = sum(income, "taxable", streams)
      const marginalRate = getMargRate(taxableInc)
      const averageRate: any = getAvgRate(taxableInc)
      const afterTaxIncome = getAfterTaxIncome(income, averageRate, streams)
      inc = merge({}, inc, {
        [year]: {
          [user]: {
            income,
            taxableInc,
            marginalRate,
            averageRate,
            afterTaxIncome,
          },
        },
      })
      if (selectedUser === user) {
        return chartArray.push({ ...inc[year][user].income, year })
      } else if (selectedUser === "combined" && user === "user2") chartArray.push({ ...inc[year].user1.income, ...inc[year].user2.income, year })
    })
    set("calc_reducer", { [user]: setTargetSavings(inc, r2, endWork, user) })
    set("calc_reducer", { [user]: getTargetWithdrawals(inc, endWork, user) })
    set("calc_reducer", { [user]: { cppPayment: cpp } })
  })

 //console.log("{ chartArray, inc }:", JSON.stringify(chartArray, null, 4))
 //console.log(JSON.stringify(inc, null, 4))
 // console.timeEnd()
  //console.log(chartArray)
   console.timeEnd("incomeV2")
  return { chartArray, inc }
}
