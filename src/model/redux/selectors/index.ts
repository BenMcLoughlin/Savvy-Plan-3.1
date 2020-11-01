import { createSelector } from "reselect"

import * as I from "model/types"
const streams_reducer = (state: I.state) => state.streams_reducer //this is the reducer, in object form, pulled from state

// export const savings_selector = createSelector(
//   //Determines the CPP payment for the user
//   state,
//   state => getSavings(state)
// )

// export const savingsDataForArray = createSelector(
//   //Determines the CPP payment for the user
//   state,
//   savings_selector,
//   savings_selector =>  getSavingsData(state, savings_selector)
// )

export const color_selector = createSelector(streams_reducer, streams_reducer => {
  const object = {}
  Object.assign(object, ...Object.values(streams_reducer).map((d: any) => ({ [d.name]: d.color })))
  return object
})
