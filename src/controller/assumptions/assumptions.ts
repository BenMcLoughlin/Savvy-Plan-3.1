import * as I from "model/types"
import { assumptions } from "controller/assumptions/assumptions.controller"
import { store } from "index"

export const assumptions_props = (): I.a => {
  const state = store.getState()
  const { isMarried, } = state.ui_reducer
  const q: I.a = []

 return q

}
