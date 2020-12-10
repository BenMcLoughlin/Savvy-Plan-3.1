import * as I from "model/types"
import { store } from "index"

export const streamsExist = (streamType): boolean => {
  const state = store.getState()
  return (
    Object.values(state.stream_reducer).filter((d: I.a) => d.streamType === streamType).length > 0
  )
}
