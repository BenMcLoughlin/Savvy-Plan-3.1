import * as I from "model/types"

const initialState = {
  desiredRetirementIncome: 0,
  hasChildrenStatus: "",
  hasChildren: true,
  inflationRate: 2,
  isMarried: true,
  maritalStatus: "married",
  MER: 2,
  numberOfChildren: 1,
  province: "britishColumbia",
  rate1: 6,
  rate2: 4.5,
  user1: {
    birthYear: 1990,
    cppStartAge: 65,
    firstName: "Ben",
    gender: "male",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
  },
  user2: {
    birthYear: 1990,
    cppStartAge: 65,
    firstName: "Kelsey",
    gender: "female",
    lastName: "",
    lifeSpan: 95,
    oasStartAge: 65,
  },
}

export default function user_reducer(state: I.user_reducer = initialState, action: I.a): I.user_reducer {
  switch (action.type) {
    case "user_reducer/SET_STORE":
      return (state = { ...action.savedState })
    case "user_reducer/SET_VALUE":
      return action.childId1
        ? { ...state, [action.id]: { ...state[action.id], [action.childId1]: action.value } } //usually this action is just used to change a value within the object
        : { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
