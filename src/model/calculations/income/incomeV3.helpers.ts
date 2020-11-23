import * as I from "model/types"
import { tCon, rCon } from "model/calculations/income/data"
import { meanBy, merge } from "lodash"
import { Finance } from "financejs"

/**
 * @param  fns - Takes any number of functions that return obects and merges them all together into one object
 * @return  An object containing the results of all functions fired
 */

export const add = (...fns: I.a): I.objects => (user, obj, year) => {
  const returnValue = fns.reduce((a, fn) => merge({}, a, fn(user, obj, year)), {})
  console.log("returnValue:", returnValue)
  return returnValue
}

/**
 * @param user - Either "user1" or "user2", passed in from the forEachUser function
 * @param protoObject - The object containing all functions and state, it destruces out the streams array because thats all it needs
 * @param year - The year for which income is being calculated, passed in from the year range
 * @return  An object containing another object with all income streams and a cppElgigibleValue which will be used later
 */

export const income = (user: I.user, { streams }, year: number): I.objects => {
  const returnValue = streams
    .filter(stream => stream.owner === user)
    .reduce((a, stream) => {
      const value = Math.max(...Object.values(stream.in).map((d: I.a) => (d.start <= year && d.end > year ? d.value : 0)))
      a.cppEligible = value + (a.cppEligible || 0)
      a = { ...a, income: { ...a.income, [stream.name]: value } }
      return a
    }, {})
  return returnValue
}

let fin = new Finance()

/**
 * @param
 * @param
 * @param
 * @return
 */

export const getSavingsAccountMaximums = (user, { yearRange: inc, state: { ui_reducer, user_reducer } }) => {
  const { showTargetIncome } = ui_reducer
  const { r1, r2 } = user_reducer
  const { birthYear, startWork, tfsaStartAge, rrspStartAge } = user_reducer[user]
  if (!showTargetIncome) {
    return {
      maxTfsa: 0,
      maxRrsp: 0,
      topTenAvg: 0,
    }
  }
  const checkMax = (value, year) => (value > (rCon[year] || rCon[2022]) ? rCon[year] || rCon[2022] : value)
  const topTenAvg = meanBy(
    Object.values(inc)
      .sort((a, b) => b[user].cppEligible - a[user].cppEligible)
      .slice(0, 10),
    (d: I.a) => d[user].cppEligible
  )

  //set("user_reducer", { [u]: { avgIncome: +topTenAvg } })

  return {
    maxTfsa: -fin.PMT(
      r2,
      30,
      Object.entries(tCon).reduce((a, [k, v]) => a + (+k > startWork && +k < birthYear + tfsaStartAge ? v + a * r1 : 0), 0)
    ),
    maxRrsp: -fin.PMT(
      r2,
      30,
      Object.entries(inc).reduce((a, [k, v]) => a + (+k > startWork && +k < birthYear + rrspStartAge ? checkMax(v[user].cppEligible * 0.18, k) + a * r1 : 0), 0)
    ),
    topTenAvg,
    incPerc: 1,
  }
}
