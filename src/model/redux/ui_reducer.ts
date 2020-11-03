import * as I from "model/types"

const initialState = {
  colorIndex: 0,
  dualSelectValue: true,
  newStream: false,
  progress: 0,
  selectedAccount: "tfsa",
  selectedId: "dummy",
  selectedScenario: 1,
  selectedPage: "savings",
  selectedUser: "user1",
  scenarios: {
    [1]: "basic",
  },
}

export default function ui_reducer(state: I.ui_reducer = initialState, action: I.a): I.ui_reducer {
  switch (action.type) {
    case "ui_reducer/SET_STORE":
      return (state = { ...action.savedState })
    case "ui_reducer/SET_VALUE":
      return { ...state, [action.id]: action.value } //sets a simple id value pair within the reducer object
    default:
      return state
  }
}
