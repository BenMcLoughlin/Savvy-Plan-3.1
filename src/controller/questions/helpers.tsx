import * as I from "model/types"

export const numberOfStreams = (state: I.state, user: I.user, streamType: I.streamType): number => {
  return Object.values(state.stream_reducer as I.stream_reducer).filter((d: I.stream) => d.owner === user && d.streamType === streamType).length
}

export const streams = (state: I.state, user: I.user, streamType: I.streamType): I.stream[] => {
  return Object.values(state.stream_reducer as I.stream_reducer).filter((d: I.stream) => d.owner === user && d.streamType === streamType)
}

export const removeMostRecentStream = (state: I.state, user: I.user, remove: I.remove, set: I.set, streamType: I.streamType): void => {
  const streams: I.stream[] = Object.values(state.stream_reducer as I.stream_reducer)
    .filter((d: I.stream) => d.owner === user && d.streamType === streamType)
    .sort((a: I.stream, b: I.stream) => b.createdAt - a.createdAt)
  set("selectedId", "ui_reducer", streams[1].id)
  remove(streams[0].id)
}

export const clean = (str: string): string => {
  switch (str) {
    case "tfsa":
      return "T.F.S.A"
    case "rrsp":
      return "R.R.S.P"
    case "personal":
      return "Personal Savings"

      break

    default:
      break
  }
}
