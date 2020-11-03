import { useCallback } from "react"
import * as I from "model/types"
import { validateBackendErrors } from "model/services/validation/validators"

export const useHttpClient = (set: I.set): I.useHttpClient => {
  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    if (method !== "PATCH") {
      set("isLoading", "auth_reducer", true)
    }
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      set("isLoading", "auth_reducer", false)
      return responseData
    } catch (err) {
      set("isLoading", "auth_reducer", false)
      set("errors", "auth_reducer", { msg: err.message })
      setTimeout(() => set("errors", "auth_reducer", {}), 4000)
    }
  }, [])

  return { sendRequest }
}
