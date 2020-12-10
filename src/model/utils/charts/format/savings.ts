import * as u from "model/utils"
import * as I from "model/types"

/** savingsForcast
 * creates a forcast of the account values for each user for their lifetime
 *@param state the reduce state
 *@returns an object containing a year range with estimates of account values for each year
 **/

export const savings = givenState => {
  console.log("givenState:", givenState)
  let state = u.addToPrototype(givenState, u.forcastMethods, u.helperMethods)

  return state
    .selectStreams({ stream_reducer: { streamType: "savings" } }) //creates an array on the state object of all relevent streams
    .buildForcast("savings", forEachAccount(addTransaction, addPrinciple, addInterest)) //builds an object forcast for each year seperated by user then adds values
    .calculate(forEachAccount(peakValues))
    .calculate(chartMax)
    .buildChartArray()
}

/** forEachAccount
 * takes any number of functions and reduces their answers into one object
 *@param fns any number of functions
 *@returns an object with three sub objects for tfsa, rrsp and nreg
 **/

function forEachAccount(...fns) {
  return (...args) =>
    ["tfsa", "rrsp", "nreg"].reduce(
      (a, account) => ({
        ...a,
        [account]: fns.reduce((a, fn) => ({ ...a, ...fn(account, ...args) }), {}),
      }),
      {}
    )
}

/** addTransaction
 *
 *@param account
 *@param state
 *@param user
 *@param year
 *@returns
 **/

function addTransaction(account, state, user, year) {
  const stream = state.releventStreams.match({ owner: user, reg: account })
  return {
    contribution: u.getValue(stream, year, "out"),
    withdrawal: u.getValue(stream, year, "in"),
  }
}

/** addPrinciple
 * adds the princple, the total amount up to that year that the user has contributied to the savings account
 * when the user withdraws we reduce principle by the proportion of the account that is principle vs interest
 *@param account the account for which we're calculating, s
 *@param state
 *@param user
 *@param year
 *@returns object eg. {principle: 100}
 **/

function addPrinciple(account, state, user, year) {
  const { principle, contribution, withdrawal, interest } = u.getLastYear(state, year, user, "savings", account)
  const interestPerc = u.pos(interest / principle)
  return { principle: u.pos(principle + contribution - withdrawal * (1 - interestPerc)) }
}

/** addInterest
 * adds the interest, uses last years principle and interest values to calculate the amount of interest it will grow by
 * when the user withdraws we reduce interest by the proportion of the account that is principle vs interest
 *@param account the account for which we're calculating, s
 *@param state
 *@param user
 *@param year
 *@returns object eg. {intereste: 100}
 **/

function addInterest(account, state, user, year) {
  const { principle, interest, withdrawal } = u.getLastYear(state, year, user, "savings", account),
    earnings = (principle + interest) * u.interestRate(account, state, user, year),
    interestPerc = u.pos(interest / principle)

  return { interest: u.pos(interest + earnings - withdrawal * interestPerc) }
}

/** peakValue
 * determines the peak value of each account along with its year for simple display in the chart
 *@param account
 *@param state
 *@param user
 *@returns object eg: {tfsa: {peakValue: 100000, year: 2035}}
 **/

function peakValues(account, { forcast }, user) {
  let max = { peak: 0, peakYear: "" }
  let low = { final: 0, finalYear: "" }
  for (const year in forcast) {
    const { principle, interest } = forcast[year][user][account]
    const value = principle + interest
    if (max.peak < value) {
      max = { peak: value, peakYear: year }
    }
    if (low.final >= value && +year > +max.peakYear) {
      low = { final: value, finalYear: year }
    }
  }
  return { ...max, ...low }
}

/** chartMax
 * determines the peak value of each account along with its year for simple display in the chart
 *@param account
 *@param state
 *@param user
 *@returns object eg: {tfsa: {peakValue: 100000, year: 2035}}
 **/

function chartMax(state, user) {
  const { selectedAccount } = state.ui_reducer

  if (selectedAccount !== "combined") {
    return { chartMax: state.calcResults[user][selectedAccount].peak }
  }

  return {
    chartMax: ["tfsa", "rrsp", "nreg"].reduce((a, account) => a + state.calcResults[user][account].peak, 0),
  }
}
