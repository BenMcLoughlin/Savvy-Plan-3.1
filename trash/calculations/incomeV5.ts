export const banan = "hi"
// import * as u from "model/utils"
// import * as I from "model/types"
// import { startCase, meanBy, range } from "lodash"
// import { getAvgRate, getMargRate } from "model/calculations/income/tax/tax.helpers"
// import { store } from "index"
// import { cpp, oas } from "model/calculations/income/CanadaPensionPlan/CPP.function"
// import { getCcb } from "model/calculations/income/CanadaChildBenefit/CCB.function"
// import { tCon, rCon } from "model/calculations/income/data"
// import { Finance } from "financejs"

// /** incomeForcast
//  * creates a forcast of the account values for each user for their lifetime
//  *@param state the reduce state
//  *@returns an object containing a year range with estimates of account values for each year
//  **/

// export const incomeForcast = () => {
//   let state = u.addToPrototype(store.getState(), u.forcastMethods, u.helperMethods)

//   return state
//     .selectStreams({ stream_reducer: { streamType: "income" } }) //creates an array on the state object of all relevent streams
//     .buildForcast("income", get(income)) //builds an object forcast for each year seperated by user then adds values
//     .calculate(get(cpp, oas, targetSavings))
//     .mapForcast(get(afterTaxIncomeDetails))
//     .buildChartArray()
//     .calculate(get(targetNestEgg, targetWithdrawals))
//   //     .buildChartArray()
// }

// /** get
//  * @param  fns - Takes any number of functions that return obects and merges them all together into one object so they can be placed into the main range
//  * @return  An object containing the results of all functions fired
//  */
// // function get(...fns) {
// //   return (d, user, year) => fns.reduce((a, fn) => u.merge(a, fn(d, user, year)), {})
// // }

// function get(...fns) {
//   return (...args) => fns.reduce((a, fn) => ({ ...a, ...fn(...args) }), {})
// }

// /** income
//  * @param user - Either "user1" or "user2", passed in from the forEachUser function
//  * @param protoObject - The object containing all functions and state, it destruces out the streams array because thats all it needs
//  * @param year - The year for which income is being calculated, passed in from the year range
//  * @return  An object containing another object with all income streams and a cppElgigibleValue which will be used later
//  */
// function income(state, user, year) {
//   const streams = state.releventStreams.filterStreams({ owner: user })

//   const value = streams.reduce(
//     (a, stream) => {
//       const value = u.getValue(stream, year, "in")
//       a.cppEligible = value + (a.cppEligible || 0)
//       a = { ...a, income: { ...a.income, [stream.name]: value } }
//       return a
//     },
//     { cppEligible: 0 }
//   )
//   return value
// }

// /** afterTaxIncomeDetails
//  * This runs all the calculations that will be valuable for the user to see.
//  * It takes cpp and oas and, if they are being collected in the selected year will add them to the array
//  * @param user
//  * @param fnState
//  * @param year
//  */
// function afterTaxIncomeDetails(fnState, user, year) {
//   const { birthYear, cppStartAge, oasStartAge, tfsaStartAge, rrspStartAge } = fnState.user_reducer[user],
//     { hasChildren } = fnState.ui_reducer,
//     { calcResults, forcast } = fnState,
//     ccb = hasChildren ? getCcb(user, fnState, year) : 0,
//     cpp = year >= birthYear + cppStartAge ? calcResults[user].cpp : 0,
//     oas = year >= birthYear + oasStartAge ? calcResults[user].oas : 0,
//     taxableInc = forcast[year][user].cppEligible + oas + cpp || 0,
//     { tfsa, rrsp, nreg } = getTargetIncome(fnState, user, year, taxableInc),
//     marginalRate = getMargRate(taxableInc),
//     averageRate = getAvgRate(taxableInc),
//     afterTaxIncome = taxableInc * (1 - averageRate)

//   return {
//     income: {
//       ccb,
//       cpp,
//       oas,
//       nreg,
//       rrsp,
//       tfsa,
//     },
//     afterTaxIncome,
//     taxableInc,
//     marginalRate,
//     averageRate,
//   }
// }

// let fin = new Finance()

// function targetSavings({ forcast: inc, ui_reducer, user_reducer }, user) {
//   const { showTargetIncome, users } = ui_reducer
//   const { r1, r2 } = user_reducer
//   const { birthYear, startWork, tfsaStartAge, rrspStartAge } = user_reducer[user]
//   if (!showTargetIncome) {
//     return {
//       maxTfsa: 0,
//       maxRrsp: 0,
//       topTenAvg: 0,
//     }
//   }
//   const checkMax = (value, year) => (value > (rCon[year] || rCon[2022]) ? rCon[year] || rCon[2022] : value)
//   const topTenAvg = meanBy(
//     Object.values(inc)
//       .sort((a, b) => b[user].cppEligible - a[user].cppEligible)
//       .slice(0, 10),
//     (d: I.a) => d[user].cppEligible
//   )

//   return {
//     maxTfsa: -fin.PMT(
//       r2,
//       30,
//       Object.entries(tCon).reduce((a, [k, v]) => a + (+k > startWork && +k < birthYear + tfsaStartAge ? v + a * r1 : 0), 0)
//     ),
//     maxRrsp: -fin.PMT(
//       r2,
//       30,
//       Object.entries(inc).reduce((a, [k, v]) => a + (+k > startWork && +k < birthYear + rrspStartAge ? checkMax(v[user].cppEligible * 0.18, k) + a * r1 : 0), 0)
//     ),
//     topTenAvg,
//     incPerc: 1 / users.length,
//   }
// }

// /** getTargetIncome
//  * Determines the most efficient amounts to draw from ones RRSP, TFSA and Non Registered Accounts.
//  * @param user
//  * @param fnState
//  * retIncome is the desired retirement income input by the user, eg 70 k
//  * we need to know the years the user will start withdrawing so we take their birthYear and tfsa & rrsp start years from the user reducer
//  * Theres only so much RRSP and TFSA they could be able to withdraw, those maximums were already calculated and stored in the calc_reducer
//  * We'll use the average top 10 years of earnings to guage if they were in a high tax bracket and should focus on RRSPs
//  * We want to fill up the lowest tax bracket with RRSP income, so we calculate the low bracket diff
//  */

// function getTargetIncome(fnState, user, year, taxableInc) {
//   const { retIncome } = fnState.user_reducer
//   const { birthYear, rrspStartAge, tfsaStartAge } = fnState.user_reducer[user]
//   const { maxTfsa, maxRrsp, topTenAvg, incPerc } = fnState.calcResults[user]
//   const userRetInc = retIncome * incPerc

//   const v = {
//     rrsp: 0,
//     tfsa: 0,
//     nreg: 0,
//   }

//   if (userRetInc < taxableInc) return v

//   const lowBracketDiff = taxableInc < 41725 ? 41725 - taxableInc : 1

//   const totalDiff = userRetInc > 41725 ? userRetInc - taxableInc : lowBracketDiff

//   const rrspContAdj = topTenAvg / 80000

//   const rrspPerc = (lowBracketDiff / totalDiff) * rrspContAdj

//   const rrspPercMax = rrspPerc > 0.9 ? 0.9 : rrspPerc

//   const tfsaPerc = +userRetInc < maxTfsa + 41725 ? 1 - rrspPercMax : maxTfsa / totalDiff

//   const nregPerc = rrspPerc + tfsaPerc < 1 ? 1 - rrspPerc - tfsaPerc : 0

//   return {
//     rrsp: year >= birthYear + rrspStartAge ? (rrspPerc * totalDiff < maxRrsp ? rrspPerc * totalDiff : maxRrsp) : 0,
//     tfsa: year >= birthYear + tfsaStartAge ? tfsaPerc * totalDiff : 0,
//     nreg: year >= birthYear + tfsaStartAge ? nregPerc * totalDiff : 0,
//   }
// }

// /** setNestEggs
//  * This determines the present value of a series of cashflows, the amount calculated as their income for RRSP and TFSA
//  * and then reccomends how much the user should have saved to fund their retirement
//  * @param inc
//  * @param r
//  * @param endWork
//  * @param user
//  */
// function targetNestEgg(fnState, user) {
//   const { forcast, user_reducer } = fnState,
//     { rrspStartAge } = user_reducer[user],
//     { r2 } = user_reducer

//   const PV = (n, r, v) => v / (1 + r) ** n
//   const keys = ["tfsa", "rrsp", "nreg"]
//   const array = []
//   Object.entries(forcast).forEach(([year, v]) => (year > rrspStartAge ? array.push({ ...v[user].income, year: +year }) : 0))
//   return array.reduce((a, v, i) => {
//     return (
//       keys.map(s => {
//         const pv = PV(i + 1, r2, v[`${user}${startCase(s)}`])
//         return (a[`${s}NestEgg`] = a[`${s}NestEgg`] + pv || pv)
//       }),
//       a
//     )
//   }, {})
// }

// /** targetWithdrawals
//  * used to calculate the most efficient income withdrawals
//  * @param user
//  * @param fnState
//  */
// const targetWithdrawals = (fnState, user) => {
//   const { forcast, user_reducer } = fnState
//   const { birthYear, tfsaStartAge, rrspStartAge } = user_reducer[user]
//   const startIncAge = {
//     tfsa: tfsaStartAge + birthYear,
//     nreg: tfsaStartAge + birthYear,
//     rrsp: rrspStartAge + birthYear,
//   }
//   return ["tfsa", "rrsp", "nreg"].reduce((a, n) => ((a[`${n}Inc`] = forcast[startIncAge[n] + 5][user].income[`${user}${startCase(n)}`]), a), {})
// }
