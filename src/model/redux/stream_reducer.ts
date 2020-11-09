import _ from "lodash"
import * as I from "model/types"

const initialState = {}

export const stream_reducer = (state: I.stream_reducer = initialState, action: I.a): I.stream_reducer => {
  const { type, values } = action
  switch (type) {
    case "stream_reducer/SET":
      return _.merge({}, state, values)
    case "stream_reducer/REMOVE":
      return _.omit(state, [action.id])
    default:
      return state
  }
}
