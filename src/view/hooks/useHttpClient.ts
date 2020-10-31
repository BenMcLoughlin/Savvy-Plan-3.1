import { useCallback, useRef, useEffect } from "react"
import * as I from "model/types"

export const useHttpClient = (set: I.set): I.useHttpClient => {
  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    set("isLoading", "auth_reducer", true)

    const httpAbortCtrl = new AbortController()
    activeHttpRequests.current.push(httpAbortCtrl)

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
       // signal: httpAbortCtrl.signal,
      })

      const responseData = await response.json()

      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)

      if (!response.ok) {
        throw new Error(responseData.message)
      }

      set("isLoading", "auth_reducer", false)
      return responseData
    } catch (err) {
      set("isLoading", "auth_reducer", false)
      set("errors", "auth_reducer", err.message)
      throw err
    }
  }, [])

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { sendRequest }
}
