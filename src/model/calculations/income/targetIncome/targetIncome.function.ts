/* eslint-disable */
import * as I from "model/types"
import { getYearRange } from "model/calculations/income/income.helpers"
import { tCon, rCon } from "./target.data"
import { map, meanBy, merge } from "lodash"
import { Finance } from "financejs"
let fin = new Finance()

export const getValues = (u: I.user, r1: number, r2: number, inc, s: number, e: number, showTargetIncome: boolean) => {
  if (!showTargetIncome) {
    return {
      maxTfsa: 0,
      maxRrsp: 0,
      topTenAvg: 0,
    }
  } else {
    const checkMax = (value, year) => (value > (rCon[year] || rCon[2022]) ? rCon[year] || rCon[2022] : value)
    return {
      maxTfsa: -fin.PMT(
        r2,
        30,
        Object.entries(tCon).reduce((a, [k, v]) => a + (+k > +s && +k < +e ? v + a * r1 : 0), 0)
      ),
      maxRrsp: -fin.PMT(
        r2,
        30,
        Object.entries(inc).reduce((a, [k, v]) => a + (+k > +s && +k < +e ? checkMax(v[u].cppEligible * 0.18, k) + a * r1 : 0), 0)
      ),
      topTenAvg: meanBy(
        Object.values(inc)
          .sort((a, b) => b[u].cppEligible - a[u].cppEligible)
          .slice(0, 10),
        (d: I.a) => d[u].cppEligible
      ),
    }
  }
}

export const getTargetIncomeV2 = (endWork, income, incPerc, retIncome, taxableInc, maxTfsa, maxRrsp, topTenAvg, year, user) => {
  let retInc = retIncome * incPerc

  const lowBracketDiff = taxableInc < 41725 ? 41725 - taxableInc : 0
  const totalDiff = retInc > taxableInc ? retInc - taxableInc : 0
  const rrspContAdj = topTenAvg / 70000

  const rrspPerc = (lowBracketDiff / totalDiff) * rrspContAdj

  const tfsaPerc = +retInc < maxTfsa + 41725 ? 1 - rrspPerc : maxTfsa / totalDiff

  const nregPerc = rrspPerc + tfsaPerc < 1 ? 1 - rrspPerc - tfsaPerc : 0

  return {
    ...income,
    [`${user}Rrsp`]: year > endWork ? rrspPerc * totalDiff : 0,
    [`${user}Tfsa`]: year > endWork ? tfsaPerc * totalDiff : 0,
    [`${user}Nreg`]: year > endWork ? nregPerc * totalDiff : 0,
  }
}

// type getTargetIncome = (inc: I.objects, state: I.state) => I.objects

// export const getTargetIncome: getTargetIncome = (inc, state) => {
//   console.time()
//   const { selectedUser, users } = state.ui_reducer

//   const chartArray = []

//   users.forEach((user: I.user) => {
//     const {
//       retIncome,
//       r1,
//       r2,
//       user1: { startWork, endWork },
//     } = state.user_reducer

//     const { maxTfsa, maxRrsp, topTenAvg } = getValues(user, r1, r2, inc, startWork, endWork)

//     getYearRange(state).forEach((year: I.a) => {
//       const { taxableInc } = inc[year][user]
//       const lowBracketDiff = taxableInc < 41725 ? 41725 - taxableInc : 0

//       const totalDiff = retIncome > taxableInc ? retIncome - taxableInc : 0

//       const rrspContAdj = topTenAvg / 70000

//       const rrspPerc = (lowBracketDiff / totalDiff) * rrspContAdj

//       const tfsaPerc = +retIncome < maxTfsa + 41725 ? 1 - rrspPerc : maxTfsa / totalDiff

//       const nregPerc = rrspPerc + tfsaPerc < 1 ? 1 - rrspPerc - tfsaPerc : 0

//       inc = merge({}, inc, {
//         [year]: {
//           [user]: {
//             income: {
//               [`${user}Rrsp`]: year > endWork ? rrspPerc * totalDiff : 0,
//               [`${user}Tfsa`]: year > endWork ? tfsaPerc * totalDiff : 0,
//               [`${user}Nreg`]: year > endWork ? nregPerc * totalDiff : 0,
//             },
//             afterTaxIncome: {
//               [`${user}Rrsp`]: rrspPerc * totalDiff,
//               [`${user}Tfsa`]: tfsaPerc * totalDiff,
//               [`${user}Nreg`]: nregPerc * totalDiff,
//             },
//             taxableInc: 100000,
//             marginalRate: 100000,
//           },
//         },
//       })
//       if (selectedUser === user) {
//         return chartArray.push({ ...inc[year][user].income, year })
//       } else if (selectedUser === "combined" && user === "user1") chartArray.push({ ...inc[year].user1.income, ...inc[year].user2.income, year })
//     })
//   })
//   console.timeEnd()
//   return { chartArray2: chartArray, inc2: inc }
// }
