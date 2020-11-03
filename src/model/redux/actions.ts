import * as I from "model/types"

export const set = (id: string, reducer: string, value: I.a, childId1?: string, childId2?: string, childId3?: string): I.objects => {
  return {
    type: `${reducer}/SET_VALUE`,
    childId1, // child id in the id value pair of the object nested within the parent object,
    childId2, // child id in the id value pair of the object nested within the parent object,
    childId3,
    id, // parent id is the id to the lower level child object
    value,
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
