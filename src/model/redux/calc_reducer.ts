import * as I from "model/types"
import { merge } from "model/utils"

const initialState = {
  user1: {
    avgIncome: 40000,
    cppPayment: 9000,
    rrspInc: 0,
    rrspNestEgg: 0,
    tfsaInc: 0,
    tfsaNestEgg: 0,
    nregInc: 0,
    nregNestEgg: 0,
  },
  user2: {
    avgIncome: 40000,
    cppPayment: 9000,
    rrspInc: 0,
    rrspNestEgg: 0,
    tfsaInc: 0,
    tfsaNestEgg: 0,
    nregInc: 0,
    nregNestEgg: 0,
  },
}

export const calc_reducer = (state = initialState, action: I.a): I.a => {
  const { type, payload } = action
  switch (type) {
    case "calc_reducer/SET":
      return merge({}, state, { ...payload })
    default:
      return state
  }
}
