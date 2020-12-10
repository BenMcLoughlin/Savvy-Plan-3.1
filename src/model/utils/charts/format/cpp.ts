import { adjustCpp } from "model/utils"
import _ from "lodash"
import * as I from "model/types"

/** format.cpp
 * formats data to be used in the cpp chart.
 * each object has a year and is adjusted for the cpp amount
 *@param state
 *@param user
 *@returns array of data formatted for the cpp chart
 **/

export const cpp = (state: I.state, user: I.user): cppChartValues => {
  const { cppPayment } = state.user_reducer[user]
  const data = _.range(60, 71).map(age => ({
    year: age,
    user: user,
    value: adjustCpp(cppPayment, age),
  }))
  return { chartData: data, rawData: null, state, user }
}

//Types
interface cppYear {
  year: number
  user: I.user
  value: number
}

type chartData = cppYear[]

interface cppChartValues {
  chartData: chartData
  rawData: any
  state: I.state
  user: I.user
}
