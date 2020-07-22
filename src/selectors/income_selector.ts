import { createSelector } from "reselect"
import { calculateIncome } from "calculations/income/income"

import * as I from "types"

const state = (state: I.state) => state //this is the reducer, in object form, pulled from state
const main_reducer = (state: I.state) => state.main_reducer //this is the reducer, in object form, pulled from state

export const income_selector = createSelector(
  //Determines the CPP payment for the user
  state,
  state => calculateIncome(state)
)

export const color_selector = createSelector(
  main_reducer,
  (main_reducer) => {
      const object = {}
      Object.assign(object, ...(Object.values(main_reducer)).map((d:any) => ({[d.name]: d.color})))
      return object
  }
)
