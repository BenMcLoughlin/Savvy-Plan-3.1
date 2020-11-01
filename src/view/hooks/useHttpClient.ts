import { useCallback, useRef, useEffect } from "react"
import * as I from "model/types"

export const useHttpClient = (set: I.set): I.useHttpClient => {
  const activeHttpRequests = useRef([])

  //'Authorization': 'Bearer ' +eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWRiMDc0NjBjYjY0YjRkNDE5NGNiMiIsImlhdCI6MTYwNDE2OTk5MCwiZXhwIjoxNjA1ODk3OTkwfQ.cVL3CLAErLoTwElV2yN19vInV8HbJblSdYaGGoWjixw"
  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    set("isLoading", "auth_reducer", true)

    const httpAbortCtrl = new AbortController()
    activeHttpRequests.current.push(httpAbortCtrl)
    console.log(headers)
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
