import { createSelector } from "reselect"
import {chartColors} from "model/styles/color_data"
import * as I from "model/types"
const stream_reducer = (state: I.state) => state.stream_reducer //this is the reducer, in object form, pulled from state
const calc_reducer = (state: I.state) => state.calc_reducer //this is the reducer, in object form, pulled from state

export const color_selector = createSelector(stream_reducer, stream_reducer => {
  const object = {}
  Object.assign(object, ...Object.values(stream_reducer).map((d: any) => ({ [d.name]: d.color })))
  return {...object, ...chartColors}
})

export const nestEgg_selector = createSelector(calc_reducer, calc_reducer => {
  const object = {}
  Object.assign(object, ...Object.values(stream_reducer).map((d: any) => ({ [d.name]: d.color })))
  return {...object, ...chartColors}
})
