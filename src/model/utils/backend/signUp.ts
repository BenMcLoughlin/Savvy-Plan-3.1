import { useHttpClient } from "model/utils/backend/useHttpClient"
import * as isValid from "model/utils/validate"
import { set } from "model/redux/actions"
import { store } from "index"

/** signUp
 * sends the users form data to the backend api which will create a new user and store it in the database
 *checks to see if there are errors with the format of the users form data, eg password don't match
 *if there are no errors it will send a Post request to signup
 * if there is a response it will send the state, which was created as soon as the user entered the site, as the basis for their
 * reducer state
 * it will then set the users token in the auth reducer
 *@param formData data input by the user, includeing email and password
 *@returns no return, sets values in state which cause a redirect for the user
 **/

export const signUp = async formData => {
  const state = store.getState()
  const noErrors = isValid.signUp(state)
  const { sendRequest } = useHttpClient()
  if (noErrors) {
    const res = await sendRequest(`api/users/signUp`, "POST", JSON.stringify(formData), {
      "Content-Type": "application/json",
    })
    if (res) {
      console.log("res:", res)
      await sendRequest(`api/stores/createStore`, "POST", JSON.stringify(state), {
        "Content-Type": "application/json",
        Authorization: "Bearer " + res.token,
      })
    }
    res && set("auth_reducer", { token: res.token })
  }
}
