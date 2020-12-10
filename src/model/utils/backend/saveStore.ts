import { useHttpClient } from "model/utils/backend/useHttpClient"
import { store } from "index"

/** saveStore
 * sends the latest version of state to the backend to be saved as a store in the store collection
 *@param formData data input by the user, includeing email and password
 *@returns no return, saves store
 **/

export const saveStore = async () => {
  const state = store.getState()

  const { sendRequest } = useHttpClient()

  await sendRequest(`/api/stores/saveStore`, "PATCH", JSON.stringify(state), {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + state.auth_reducer.token,
  })
}
