import * as I from "model/types"
import { store } from "index"

export const stateV2 = "hi" //store.getState()

export const set = (reducer: string, values: I.a): I.a => {

  store.dispatch({
    type: `${reducer}/SET`,
    payload: values,
  })
  return {
    type: `${reducer}/SET`,
    payload: values,
  }
}

export const remove = (id: string, reducer = "stream_reducer"): void => {
  store.dispatch({
    type: `${reducer}/REMOVE`,
    id,
  })
}
