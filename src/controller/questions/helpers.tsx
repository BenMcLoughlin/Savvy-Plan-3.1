import * as I from "model/types"
import { set, remove } from "model/redux/actions"
import { store } from "index"
import { round } from "model/services/ui_functions"
import { getCpp, getCcb, getAvgRate, getMargRate, addPensions, beforePension, getAfterTaxIncome, sum, getValues, getTargetIncome } from "model/calculations/income/income.helpers"


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

export const efficientIncome = () => {
  const { ui_reducer, user_reducer } = store.getState()
  const { user1, user2, retIncome } = user_reducer
  const {  isMarried, } = ui_reducer

  if (!isMarried && user1.nregInc < 100) {
    return `If you draw ${round(user1.rrspInc)} from your RRSPs you'll still be in the lowest tax bracket in retirement. Then since you want ${round(retIncome)} total income, the remaining ${round(
    user1.tfsaInc
  )} could come from your TFSA.`}
  if (!isMarried && user1.nregInc > 100) {
    return `If you draw ${round(user1.rrspInc)} from your RRSPs you'll still be in the lowest tax bracket in retirement. Then since you want ${round(retIncome)} total income, ${round(
      user1.tfsaInc
    )} could come from your TFSA along with ${round(user1.nregInc)} from your Non-registered savings.`}
  if (isMarried && user1.nregInc < 100) {
    return `If you draw ${round(user1.rrspInc)} from ${user1.firstName}'s RRSPs and ${round(user2.rrspInc)} from ${
    user2.firstName
  }'s RRSPs you'll both still be in the lowest tax bracket in retirement. Then since you want ${round(retIncome)} total income, the remaining ${round(
    user1.tfsaInc + user2.tfsaInc
  )} could come from both your TFSA's.`
  }
  if (isMarried && user1.nregInc > 100) {
    return `If you draw ${round(user1.rrspInc)} from ${user1.firstName}'s RRSPs and ${round(user2.rrspInc)} from ${
    user2.firstName
  }'s RRSPs you'll both still be in the lowest tax bracket in retirement. Then since you want ${round(retIncome)} total income, ${round(
    user1.tfsaInc + user2.tfsaInc
  )} could come from both your TFSA's along with ${round(
    user1.nregInc + user2.nregInc
  )} from your Non-registered savings.`
  }

}

export const efficientIncomeExplanation = () => {
    const { ui_reducer, user_reducer } = store.getState()
    const { user1, user2, retIncome } = user_reducer
    const { isMarried } = ui_reducer
    const totalIncome = user1.rrspIncome + user1.tfsaIncome
 return `If you only saved in your RRSP's all your income in retirement would be taxable. Your marginal rate would then be 40% and you'd be paying 9k in taxes. With this strategy your marginal rate is 20% and you're only paying $4000 a year in taxes in retirement. `
}

export const formatNestEggData = ({ ui_reducer, user_reducer }) => {
  const { users } = ui_reducer
  const searchValues = ["rrspNestEgg", "tfsaNestEgg", "nregNestEgg"]
  return users.reduce(
    (a, user) =>
      a.concat(
        searchValues.map(v => ({
          owner: user_reducer[user].firstName,
          account: v.slice(0, 4),
          income: user_reducer[user][v.slice(0, 4) + "Inc"],
          value: user_reducer[user][v],
        }))
      ),
    []
  )
}