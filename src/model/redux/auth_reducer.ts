import _ from "lodash"

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,

  errors: {},
}

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth_reducer/REMOVE":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.id]: null,
        },
      }
    case "auth_reducer/SET_VALUE":
      return action.childId1
        ? { ...state, [action.id]: { ...state[action.id], [action.childId1]: action.value } } //usually this action is just used to change a value within the object
        : { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance} //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
