import * as I from "model/types"
import { set, remove } from "model/redux/actions"
import { store } from "index"
import * as u from "model/utils"
import _ from "lodash"

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

export const efficientIncome = (): string => {
  const { ui_reducer, user_reducer, calc_reducer } = store.getState()
  const { user1, user2, retIncome } = calc_reducer
  const {
    user1: { firstName: u1FirstName },
    user2: { firstName: u2FirstName },
  } = user_reducer
  const { isMarried } = ui_reducer
  if (!isMarried && user1.nregInc < 100) {
    return `If you draw ${u.asCurrency(user1.rrspInc)} from your RRSPs you'll still be in the lowest tax bracket in retirement. Then since you want ${u.asCurrency(
      retIncome
    )} total income, the remaining ${u.asCurrency(user1.tfsaInc)} could come from your TFSA.`
  }
  if (!isMarried && user1.nregInc > 100) {
    return `If you draw ${u.asCurrency(user1.rrspInc)} from your RRSPs you'll still be in the lowest tax bracket in retirement. Then since you want ${u.asCurrency(
      retIncome
    )} total income, ${u.asCurrency(user1.tfsaInc)} could come from your TFSA along with ${u.asCurrency(user1.nregInc)} from your Non-registered savings.`
  }
  if (isMarried && user1.nregInc < 100) {
    return `If you draw ${u.asCurrency(user1.rrspInc)} from ${u1FirstName}'s RRSPs and ${u.asCurrency(user2.rrspInc)} from ${u2FirstName}
    }'s RRSPs you'll both still be in the lowest tax bracket in retirement. Then since you want ${u.asCurrency(retIncome)} total income, the remaining ${u.asCurrency(
      user1.tfsaInc + user2.tfsaInc
    )} could come from both your TFSA's.`
  }
  if (isMarried && user1.nregInc > 100) {
    return `If you draw ${u.asCurrency(user1.rrspInc)} from ${u1FirstName}'s RRSPs and ${u.asCurrency(user2.rrspInc)} from ${u2FirstName}
    }'s RRSPs you'll both still be in the lowest tax bracket in retirement. Then since you want ${u.asCurrency(retIncome)} total income, ${u.asCurrency(
      user1.tfsaInc + user2.tfsaInc
    )} could come from both your TFSA's along with ${u.asCurrency(user1.nregInc + user2.nregInc)} from your Non-registered savings.`
  }
}

export const formatNestEggData = ({ calc_reducer, ui_reducer, user_reducer }: I.state): I.a => {
  const { users } = ui_reducer
  const searchValues = ["rrspNestEgg", "tfsaNestEgg", "nregNestEgg"]
  return users.reduce(
    (a, user) =>
      a.concat(
        searchValues.map(v => ({
          owner: user_reducer[user].firstName,
          account: v.slice(0, 4),
          income: calc_reducer[user][v.slice(0, 4) + "Inc"],
          value: calc_reducer[user][v],
        }))
      ),
    []
  )
}
