import * as I from "model/types"
import {merge} from "model/utils"

const initialState = {
  colorIndex: 0,
  changeRateAssumptions: true,
  changeRetirementAssumptions: true,
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
  showTargetIncome: true, 
  showAssumptionsPanel: false,
  showRetirementAssumptions: false,
  selectedUser: "user1",
  scenarios: {
    [1]: "basic",
  },
  users: ["user1" as I.user, "user2" as I.user],
  dummy: "hi",
  dummyNested: {
    dummyNested1: "",
  },
}

export default function ui_reducer(state: I.ui_reducer = initialState, action: I.a): I.ui_reducer {
  const { type, payload } = action
  switch (type) {
    case "ui_reducer/SET":
      return merge({}, state, { ...payload })
    default:
      return state
  }
}
