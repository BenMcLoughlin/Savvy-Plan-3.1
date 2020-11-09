import * as I from "model/types"
import _ from "lodash"

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  errors: {},
}

export const auth_reducer = (state = initialState, action: I.a): I.auth_reducer => {
    const { type, values } = action
  switch (type) {
    case "auth_reducer/SET":
      return _.merge({}, state, values)
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
