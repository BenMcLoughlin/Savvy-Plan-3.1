import * as I from "model/types"
import { merge } from "model/utils"

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  errors: {},
}

export const auth_reducer = (state = initialState, action: I.a): I.auth_reducer => {
    const { type, payload } = action
  switch (type) {
    case "auth_reducer/SET":
      return merge({}, state, { ...payload })
    case "auth_reducer/REMOVE":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.id]: null,
        },
      }
    default:
      return state
  }
}
