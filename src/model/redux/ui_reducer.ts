import * as I from "model/types"
import _ from "lodash"

const initialState = {
  colorIndex: 0,
  chartStartYear: 2007,
  chartEndYear: 2095,
  dualSelectValue: true,
  newStream: false,
  hasChildren: true,
  isMarried: true,
  progress: 0,
  selectedAccount: "tfsa",
  selectedId: "dummy",
  selectedScenario: 1,
  selectedPage: "savings",
  selectedUser: "user1",
  scenarios: {
    [1]: "basic",
  },
  users: ["user1" as I.user],
  dummy: "hi",
  dummyNested: {
    dummyNested1: "",
  },
}

export default function ui_reducer(state: I.ui_reducer = initialState, action: I.a): I.ui_reducer {
  const { type, values } = action
  switch (type) {
    case "ui_reducer/SET":
      return _.merge({}, state, { ...values })
    case "ui_reducer/SET_STORE":
      return (state = { ...action.savedState })
    default:
      return state
  }
}
