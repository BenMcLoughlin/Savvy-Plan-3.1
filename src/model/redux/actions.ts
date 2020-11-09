import * as I from "model/types"

export const set = (reducer: string, values): I.objects => {
  console.log(values)
  return {
    type: `${reducer}/SET`,
    values,
  }
}

export const setStore = (reducer: I.reducer, savedState: I.savedState): I.objects => {
  return {
    type: `${reducer}/SET_STORE`,
    savedState,
  }
}

export const remove = (id: string, reducer = "stream_reducer"): I.objects => {
  return {
    type: `${reducer}/REMOVE`,
    id,
  }
}
