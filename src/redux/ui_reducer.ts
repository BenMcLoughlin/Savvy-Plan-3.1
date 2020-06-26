import { IUiState } from "types/reducer_types"

const initialState: IUiState = {
  change: false,
  selectedId: "",
  colorIndex: 0,
  videoUrl: "",
  progress: 8,
  selectedPage: "income",
  selectedAccount: "tfsa",
  selectedUser: "user1",
  selectedTransaction: "contribution",
  newStream: false,
}

export function ui_reducer(state: IUiState = initialState, action: any): IUiState {
  switch (action.type) {
    case "ui_reducer/SET_VALUE":
      return { ...state, [action.id]: action.value } //sets a simple id value pair within the reducer object
    default:
      return state
  }
}
