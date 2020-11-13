import * as I from "model/types"
import { set, remove } from "model/redux/actions"
import { store } from "index"

export const streams = (state: I.state, user: I.user, streamType: I.streamType): I.stream[] => {
  return Object.values(state.stream_reducer as I.stream_reducer).filter((d: I.stream) => d.owner === user && d.streamType === streamType)
}

export const removeMostRecentStream = (user: I.user, streamType: I.streamType): void => {
  const state = store.getState()
  const streams: I.stream[] = Object.values(state.stream_reducer as I.stream_reducer)
    .filter((d: I.stream) => d.owner === user && d.streamType === streamType)
    .sort((a: I.stream, b: I.stream) => b.createdAt - a.createdAt)
  set("ui_reducer", { selectedId: streams[1].id })
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

export const getYearRange = (state: I.state, user: I.user): I.objects => {
  const { user_reducer } = state
  const {
    user1: { birthYear: by1, lifeSpan: ls1 },
    user2: { birthYear: by2, lifeSpan: ls2 },
  } = user_reducer
  const startWork = user === "user1" ? by1 + 18 : by2 + 18
  const endWork = user === "user1" ? by1 + 65 : by2 + 65
  const chartStartYear = (user === "user1" ? +by1 : Math.min(+by1, +by2)) + 18
  const chartEndYear = user === "user1" ? +by1 + +ls1 : Math.max(+by1 + ls1, +by2 + ls2)
  return { chartStartYear, chartEndYear, startWork, endWork }
}

export const showTargetIncome = () => {
  const {
    user_reducer,
    ui_reducer: { isMarried },
  } = store.getState()
  return "hi"
}
