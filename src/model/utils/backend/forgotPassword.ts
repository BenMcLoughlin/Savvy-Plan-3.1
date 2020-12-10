import { useHttpClient } from "model/utils/backend/useHttpClient"
import { store } from "index"

/** saveStore
 * sends the latest version of state to the backend to be saved as a store in the store collection
 *@param formData data input by the user, includeing email and password
 *@returns no return, saves store
 **/

export const forgotPassword = async email => {
  const state = store.getState()

  const { sendRequest } = useHttpClient()

  await sendRequest(`/api/users/forgotPassword`, "POST", JSON.stringify({ email }), {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + state.auth_reducer.token,
  })
}
