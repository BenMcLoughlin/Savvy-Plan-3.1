import _ from "lodash"
import { IMainState } from "types/reducer_types"

const initialState = {
  incomeDummy: {
    name: "My Dummy Income",
    id: "incomeDummy",
    color: "red",
    periods: 0,
    period0StartYear: 2010,
    period0Value: 20000,
    period0EndYear: 2020,
    reg: "employment Income",
    taxable: true,
  },
  savingsDummy: {
    name:"",
    periods:0,
    id: "savingsDummy",
    currentValue:27000,
    period0StartYear:2034,
    period0Value:4800,
    period0EndYear:2046,
    reg:"tfsa",
    taxable:true,
    color:"#72929B",
    owner:"user1",
    streamType:"savings",
    personal:"reg",
  }
}

export const main_reducer = (state: IMainState = initialState, action: any) => {
  switch (action.type) {
    case "main_reducer/remove":
      return _.omit(state, [action.id])
    case "main_reducer/SET_VALUE":
      return action.childId
        ? { ...state, [action.id]: { ...state[action.id], [action.childId]: action.value } } //usually this action is just used to change a value within the object
        : { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
