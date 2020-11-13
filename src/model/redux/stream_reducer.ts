import _ from "lodash"
import { merge } from "model/utils"
import * as I from "model/types"

const initialState = {}

export const stream_reducer = (state: I.stream_reducer = initialState, action: I.a): I.stream_reducer => {
  const { type, payload } = action
  switch (type) {
    case "stream_reducer/SET":
        return merge({}, state, { ...payload })
    case "stream_reducer/REMOVE":
      return _.omit(state, [action.id])
    default:
      return state
  }
}
