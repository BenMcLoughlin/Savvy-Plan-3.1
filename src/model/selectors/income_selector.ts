import { createSelector } from "reselect"
import { getIncome } from "model/calculations/income/income"
import { getSavings } from "model/calculations/savings/savings.function"

import * as I from "model/types"

const state = (state: I.state) => state //this is the reducer, in object form, pulled from state
const main_reducer = (state: I.state) => state.main_reducer //this is the reducer, in object form, pulled from state

export const income_selector = createSelector(
  //Determines the CPP payment for the user
  state,
  state => getIncome(state)
)

export const savings_selector = createSelector(
  //Determines the CPP payment for the user
  state,
  state => getSavings(state)
)

// export const savingsDataForArray = createSelector(
//   //Determines the CPP payment for the user
//   state,
//   savings_selector,
//   savings_selector =>  getSavingsData(state, savings_selector)
// )

export const color_selector = createSelector(main_reducer, main_reducer => {
  const object = {}
  Object.assign(object, ...Object.values(main_reducer).map((d: any) => ({ [d.name]: d.color })))
  return object
})
