export const banan = "hi"
// import { add, years } from "model/utils"
// import * as I from "model/types"
// import { startCase, meanBy, range } from "lodash"
// import { getAvgRate, getMargRate } from "model/calculations/income/tax/tax.helpers"
// import { cpp, oas } from "model/calculations/income/CanadaPensionPlan/CPP.function"
// import { getCcb } from "model/calculations/income/CanadaChildBenefit/CCB.function"
// import { tCon, rCon } from "model/calculations/income/data"
// import { Finance } from "financejs"
// import { set } from "model/redux/actions"

// /** buildIncomeForcast
//  * This takes the stream objects and converts them into a chart array that can be manipulated by the user to see their income breakdown for each year of their life.
//  * @param state the current state containing all income streams
//  */
// export const buildIncomeForcast = (state: I.state) => {
//   // const returnValue = getForcast(state)
//   //   .setStreams("income")
//   //   .forEachYearAndUser(get(income))
//   //   .calculate(cpp, oas, targetSavings)
//   //   .forEachYearAndUser(get(afterTaxIncomeDetails))
//   //   .addDetailsToChartData()
//   //   .calculate(targetNestEgg, targetWithdrawals)
//   //   .setCaculationResultsInReducer()

//   return "hi" //returnValue
// }

// /** getForcast
//  *
//  *@param
//  *@returns
//  **/
// function getForcast(state) {
//   const { stream_reducer } = state

//   const { selectedUser } = state.ui_reducer

//   let d = {
//     addDetailsToChartData: () =>
//       add(d, {
//         chartArray:
//           selectedUser === "combined"
//             ? Object.entries(d.yearRange).map(([k, v]: I.a) => ({ ...v.user1.income, ...v.user2.income, year: k }))
//             : Object.entries(d.yearRange).map(([k, v]) => ({ ...v[selectedUser].income, year: k })),
//       }),
//     chartArray: [],
//     state,
//     streams: [],
//     yearRange: {},
//     calcResults: {},

//     /** setStreams
//      * takes a type like "Income", filters through the streams reducer and adds all streams of that type to the local d.streams value
//      *  @param type - the type of the stream this forcase is working with, eg income, savings, netWorth
//      *  @returns an array of matching streams, these will form tha basis of all remaining calculations
//      * "streams": [
//         {
//             "amortization": 0,
//             "color": "#72929B",
//             "cppEligible": true,
//             "createdAt": 1605292584157,
//             "currentValue": 0,
//             "flow": "in",
//             "in": {
//                 "1": {
//                     "start": 2014,
//                     "value": 67000,
//                     "end": 2050
//                 }
//             },
//             "id": "user1Income_36237",
//             "owner": "user1",
//             "out": {
//                 "1": {
//                     "start": 2020,
//                     "value": 0,
//                     "end": 2030
//                 }
//             },
//             "name": "Wal Mart",
//             "payment": 0,
//             "streamType": "income",
//             "rate": 0,
//             "reg": "Regular Employment",
//             "taxable": true,
//             "scenarios": 0,
//             "startValue": 0,
//             "startYear": 0,
//             "periodIn": 1,
//             "periodOut": 1
//         }
//     ],
//      */
//     setStreams: type => add(d, { streams: Object.values(stream_reducer).filter((d: I.a) => d.streamType === type) }),

//     /** forEachYearAndUser
//      * takes a function that groups other functions into an object and returns that object with values pertaining to each user
//      *  @param get - the function that groups other functions into one object with all information for a year and user
//      *  @returns an object with sub ojects for each year and then split for each user
//      * "yearRange": {
//         "2008": {
//             "user1": {},
//             "user2": {}
//         },
//         "2009": {
//             "user1": {},
//             "user2": {}
//         },
//         "2010": {
//             "user1": {},
//             "user2": {}
//         },
//         "2011": {
//             "user1": {},
//             "user2": {}
//         },
//         "2012": {
//             "user1": {},
//             "user2": {}
//         },
//         "2013": {
//             "user1": {},
//             "user2": {}
//         },
//      */
//     forEachYearAndUser: fn => add(d, { yearRange: years(state, 'income').reduce((a, year) => ({ ...a, [year]: forEachUser(fn, d, year) }), {}) }),

//     /** calculate
//      * takes any number of functions,loops over them and places their results, by user, into the calcResults object
//      * @param  fns - takes any number of functions, fires them for each user
//      * @return  An object containing the results of all functions fired
//      */
//     calculate: (...fns: I.a) => {
//       return add(
//         d,
//         fns.map(fn => add(d, { calcResults: forEachUser(fn, d) }))
//       )
//     },
//     setCaculationResultsInReducer: () => (set("calc_reducer", { ...d.calcResults }), d),
//   }

//   return d
// }

// /**  forEachUser
//  *
//  * takes one function that will return an object and unkown arguments
//  * It will fire the function, passing in user and the other arugments
//  * @param get in order to get the final object in the range all the funtions must be fired and grouped into one object
//  * @param args could be the proto object or the year
//  * @returns {
//  * user1: {
//  * ,
//  * user2: {
//  * }}
//  * }
//  */
// function forEachUser(fn, ...args) {
//   return ["user1", "user2"].reduce((a, user) => {
//     return { ...a, [user]: fn(user, ...args) }
//   }, {})
// }

// /** get
//  * @param  fns - Takes any number of functions that return obects and merges them all together into one object so they can be placed into the main range
//  * @return  An object containing the results of all functions fired
//  */
// function get(...fns) {
//   return (d, user, year) => fns.reduce((a, fn) => add(a, fn(d, user, year)), {})
// }

// /** afterTaxIncomeDetails
//  * This runs all the calculations that will be valuable for the user to see.
//  * It takes cpp and oas and, if they are being collected in the selected year will add them to the array
//  * @param user
//  * @param fnState
//  * @param year
//  */
// function afterTaxIncomeDetails(user, fnState, year) {
//   const { birthYear, cppStartAge, oasStartAge, tfsaStartAge, rrspStartAge } = fnState.state.user_reducer[user],
//     { hasChildren } = fnState.state.ui_reducer,
//     { calcResults, yearRange } = fnState,
//     ccb = hasChildren ? getCcb(user, fnState, year) : 0,
//     cpp = year >= birthYear + cppStartAge ? calcResults[user].cpp : 0,
//     oas = year >= birthYear + oasStartAge ? calcResults[user].oas : 0,
//     taxableInc = yearRange[year][user].cppEligible + oas + cpp || 0,
//     { tfsa, rrsp, nreg } = getTargetIncome(user, fnState, year, taxableInc),
//     marginalRate = getMargRate(taxableInc),
//     averageRate = getAvgRate(taxableInc),
//     afterTaxIncome = taxableInc * (1 - averageRate)

//   return {
//     income: {
//       [`${user}Ccb`]: ccb,
//       [`${user}Cpp`]: cpp,
//       [`${user}Oas`]: oas,
//       [`${user}Nreg`]: nreg,
//       [`${user}Rrsp`]: rrsp,
//       [`${user}Tfsa`]: tfsa,
//     },
//     afterTaxIncome,
//     taxableInc,
//     marginalRate,
//     averageRate,
//   }
// }

// /** income
//  * @param user - Either "user1" or "user2", passed in from the forEachUser function
//  * @param protoObject - The object containing all functions and state, it destruces out the streams array because thats all it needs
//  * @param year - The year for which income is being calculated, passed in from the year range
//  * @return  An object containing another object with all income streams and a cppElgigibleValue which will be used later
//  */
// function income(user, { streams }, year) {
//   return streams
//     .filter(stream => stream.owner === user)
//     .reduce(
//       (a, stream) => {
//         const value = Math.max(...Object.values(stream.in).map((d: I.a) => (d.start <= year && d.end > year ? d.value : 0)))
//         a.cppEligible = value + (a.cppEligible || 0)
//         a = { ...a, income: { ...a.income, [stream.name]: value } }
//         return a
//       },
//       { cppEligible: 0 }
//     )
// }

// let fin = new Finance()

// /** targetSavings
//  * used to calculate the ideal income they could draw from their TFSA or RRSP
//  * @param user
//  * @param state
//  */

// function targetSavings(user, { yearRange: inc, state: { ui_reducer, user_reducer } }) {
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

// /** setNestEggs
//  * This determines the present value of a series of cashflows, the amount calculated as their income for RRSP and TFSA
//  * and then reccomends how much the user should have saved to fund their retirement
//  * @param inc
//  * @param r
//  * @param endWork
//  * @param user
//  */
// function targetNestEgg(user, fnState) {
//   const { yearRange, state } = fnState,
//     { rrspStartAge } = state.user_reducer[user],
//     { r2 } = state.user_reducer

//   const PV = (n, r, v) => v / (1 + r) ** n
//   const keys = ["tfsa", "rrsp", "nreg"]
//   const array = []
//   Object.entries(yearRange).forEach(([year, v]) => (year > rrspStartAge ? array.push({ ...v[user].income, year: +year }) : 0))
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
// const targetWithdrawals = (user, fnState) => {
//   const { yearRange, state } = fnState
//   const { birthYear, tfsaStartAge, rrspStartAge } = state.user_reducer[user]
//   const startIncAge = {
//     tfsa: tfsaStartAge + birthYear,
//     nreg: tfsaStartAge + birthYear,
//     rrsp: rrspStartAge + birthYear,
//   }
//   return ["tfsa", "rrsp", "nreg"].reduce((a, n) => ((a[`${n}Inc`] = yearRange[startIncAge[n] + 5][user].income[`${user}${startCase(n)}`]), a), {})
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

// function getTargetIncome(user, fnState, year, taxableInc) {
//   const { retIncome } = fnState.state.user_reducer
//   const { birthYear, rrspStartAge, tfsaStartAge } = fnState.state.user_reducer[user]
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
