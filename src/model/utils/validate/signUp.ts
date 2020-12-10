import * as I from "model/types"

/** signUp
 * checks if there are any errors in the sign up text inputs, if there are it returns true
 *@param state
 *@returns boolean
 **/

export const signUp = (state: I.state): boolean => {
  const { auth_reducer } = state
  const names = ["email", "password", "passwordConfirm"]
  const errors = Object.keys(auth_reducer.errors).filter(d => names.includes(d) && auth_reducer.errors[d] !== null)
  return errors.length === 0
}
