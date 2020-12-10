import { useHttpClient } from "model/utils/backend/useHttpClient"
import * as isValid from "model/utils/validate"
import { set } from "model/redux/actions"
import { store } from "index"
import * as I from "model/types"

/** login
 * sends the users form data to the backend api which will check if the user exists and if so, log the user in
 * checks to see if there are errors with the format of the users form data, eg password don't match
 * if there are no errors it will send a Post request to signup
 * if there is a response it will send a Gret request for the user to get the store
 * reducer state
 * it will then set the users token in the auth reducer
 *@param formData data input by the user, includeing email and password
 *@returns no return, sets values in state which cause a redirect for the user
 **/

export const login = async formData => {
  const state = store.getState()
  const noErrors = isValid.signUp(state)
  const { sendRequest } = useHttpClient()

  if (noErrors) {
    const res = await sendRequest(`api/users/login`, "POST", JSON.stringify(formData), {
      "Content-Type": "application/json",
    })
    if (res) {
      const response: I.a = await sendRequest(`api/store/getStore`, "GET", null, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + res.token,
      })
      await set("calc_reducer", { ...response.data.data.calc_reducer })
      await set("ui_reducer", { ...response.data.data.ui_reducer })
      await set("user_reducer", { ...response.data.data.user_reducer })
      await set("stream_reducer", { ...response.data.data.stream_reducer })
    }
    res && set("auth_reducer", { token: res.token })
  }
}
