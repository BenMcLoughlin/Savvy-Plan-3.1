import { useCallback } from "react"
import * as I from "model/types"
import { set } from "model/redux/actions"

export const useHttpClient = (): I.useHttpClient => {
  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    if (method !== "PATCH") {
      set("auth_reducer", { isLoading: true })
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

      set("auth_reducer", { isLoading: false })
      return responseData
    } catch (err) {
      set("auth_reducer", { isLoading: false })
      set("auth_reducer", { errors: { msg: err.message } })
      setTimeout(() => set("auth_reducer", { errors: {} }), 4000)
    }
  }, [])

  return { sendRequest }
}
