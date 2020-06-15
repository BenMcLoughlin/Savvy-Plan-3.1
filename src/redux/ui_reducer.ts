import { IUiState } from "types/reducer_types"

const initialState: IUiState = {
  change: false,
  selectedId: "incomeDummy",
  colorIndex: 0,
  videoUrl: "",
  progress: 6,
  selectedPage: "taxes",
  selectedAccount: "tfsa",
  selectedUser: "",
}

export function ui_reducer(state: IUiState = initialState, action: any): IUiState {
  switch (action.type) {
    case "ui_reducer/SET_VALUE":
      return { ...state, [action.id]: action.value } //sets a simple id value pair within the reducer object
    default:
      return state
  }
}
