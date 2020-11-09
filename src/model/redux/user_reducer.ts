import * as I from "model/types"
import _ from "lodash"

const initialState = {
  retIncome: 0,
  hasChildrenStatus: "",
  inflationRate: 2,
  maritalStatus: "married",
  MER: 2,
  numberOfChildren: 1,
  province: "britishColumbia",
  rate1: 6,
  rate2: 4.5,
  user1: {
    birthYear: 1990,
    cppStartAge: 65,
    endWorking: 2050,
    firstName: "Ben",
    gender: "male",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
    startWorking: 2007,
  },
  user2: {
    birthYear: 1990,
    cppStartAge: 65,
    endWorking: 2050,
    firstName: "Kelsey",
    gender: "female",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
    startWorking: 2007,
  },
}

export default function user_reducer(state: I.user_reducer = initialState, action: I.a): I.user_reducer {
  const { type, values } = action
  switch (type) {
    case "user_reducer/SET":
      return _.merge({}, state, values)
    case "user_reducer/SET_STORE":
      return (state = { ...action.savedState })
    default:
      return state
  }
}
