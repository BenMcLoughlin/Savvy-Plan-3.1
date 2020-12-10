import * as I from "model/types"
import { adjustCpp, adjustOas } from "model/utils/index"
import lifespanData from "data/LifeSpanData.json"
import _ from "lodash"
import * as d3 from "d3"
import planComparisonData from "data/introPlanComparison.json"

export const formatCpp = (state: I.state, user: I.user): I.a => {
  return () => {
    const { cppPayment } = state.user_reducer[user]
    const data = _.range(60, 71).map(age => ({
      year: age,
      user: user,
      value: adjustCpp(cppPayment, age),
    }))
    return { chartData: data, rawData: null, state, user }
  }
}

export const formatOas = (state: I.state, user: I.user): I.a => {
  return () => {
    const data = _.range(65, 71).map(age => ({
      year: age,
      user: user,
      value: adjustOas(7200, age),
    }))

    return { chartData: data, rawData: null, state, user }
  }
}

export const formatLifespan = () => {
  //data retrieved from https://www.osfi-bsif.gc.ca/Eng/oca-bac/as-ea/Pages/mpsspc.aspx
  return () => {
    const data = lifespanData.map(d => {
      return {
        year: d.age,
        male: d.men2025,
        female: d.women2025 - d.men2025,
      }
    })
    return { chartData: data, rawData: lifespanData }
  }
}

export const formatNestEgg = (state: I.state): I.a => {
  const { calc_reducer, ui_reducer, user_reducer } = state
  return () => {
    const { users } = ui_reducer
    const searchValues = ["rrspNestEgg", "tfsaNestEgg", "nregNestEgg"]
    const data = users.reduce(
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
    return { chartData: data, rawData: null }
  }
}

export const formatIntroductionChart = () => {
  const chartData = []
  const rawData = planComparisonData.reduce((a, d) => {
    chartData.push({ year: d.year, user2: d.user2TotalSavings, user1: d.user1TotalSavings - d.user2TotalSavings })
    return { ...a, [d.year]: d }
  }, {})
  return {
    chartData,
    rawData,
  }
}
