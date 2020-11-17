import * as I from "model/types"
import { merge } from "model/utils"

const initialState = {
  retIncome: 50000,
  hasChildrenStatus: "",
  inflationRate: 2,
  maritalStatus: "married",
  mer: 2,
  r1: 0.04,
  r2: 0.02,
  numberOfChildren: 1,
  province: "britishColumbia",
  rate1: 6,
  rate2: 4.5,
  user1: {
    avgIncome: 40000,
    birthYear: 1990,
    cppStartAge: 65,
    cppPayment: 9000,
    endWork: 2050,
    firstName: "Ben",
    gender: "male",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
    startWork: 2007,
    rrspInc: 0,
    rrspNestEgg: 0,
    rrspStartAge: 65,
    tfsaInc: 0,
    tfsaNestEgg: 0,
    tfsaStartAge: 65,
    nregInc: 0,
    nregNestEgg: 0,
  },
  user2: {
    avgIncome: 40000,
    birthYear: 1990,
    cppStartAge: 65,
    cppPayment: 9000,
    endWork: 2050,
    firstName: "Kelsey",
    gender: "female",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
    startWork: 2007,
    rrspInc: 0,
    rrspNestEgg: 0,
    rrspStartAge: 65,
    tfsaInc: 0,
    tfsaNestEgg: 0,
    tfsaStartAge: 65,
    nregInc: 0,
    nregNestEgg: 0,
  },
}

export default function user_reducer(state: I.user_reducer = initialState, action: I.a): I.user_reducer {
  const { type, payload } = action
  switch (type) {
    case "user_reducer/SET":
      return merge({}, state, { ...payload })
    default:
      return state
  }
}
