const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: true,
  isLoading: false,
  user: null,
}

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth_reducer/SET_VALUE":
      return { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
