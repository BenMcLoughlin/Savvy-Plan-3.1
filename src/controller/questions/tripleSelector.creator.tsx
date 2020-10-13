import { ageAtSelectedYear } from "model/services/ui_functions"
import { addPeriodToStreamV2 } from "model/services/create_functions"
import { round } from "model/services/ui_functions"
import _ from "lodash"
import * as I from "model/types"

export const createTripleSliders = (flow, text: any, set: I.set,  state: I.state, stream: any, ) => {
  const { id, owner, period, streamType} = stream

  const periods = +Object.keys(stream[flow]).pop()

  const optionArray = _.range(1, periods + 1).map(d => round(stream[flow][d].value) / 1000 + "K")

  const labelArray = _.range(1, periods + 1).map(d => `${stream[flow][d].start} - ${stream[flow][d].end}`)

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

  const editPeriod = {
    explanation: text.explanation,
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    chart: text.chart,
    showChart: text.showChart,
    valid: true,
    question: text.question,
    period,
    selectorProps: {
      title: "Different Earning period",
      explainer: text.explainer,
      optionArray,
      value: period,
      handleChange: e => set(id, "main_reducer", e, "period"),
      addNew: () => addPeriodToStreamV2(flow, id, period, set, stream),
      labelArray,
    },
  }

  const slidersArray = _.range(periods).map((d: any, i: number) => {
    const startYear = stream[flow][period].start
    const endYear = stream[flow][period].end
    const value = stream[flow][period].value

    const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

    let past = currentYear > startYear

    return {
      component: "MultiSliders",
      num: 3,
      slider1: {
        bottomLabel: `at age ${startYear - birthYear}`, //eg "at age 26"
        max: 2080,
        min: birthYear + 18, //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: period === 1 ? "starting in" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: startYear,
        handleChange: (value: number) => set(id, "main_reducer", value, flow, period, "start"),
      },
      slider2: {
        bottomLabel: text.bottomLabel,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: past ? text.topLabelPast : text.topLabelFuture,
        value: value,
        handleChange: (value: number) => set(id, "main_reducer", value, flow, period, "value"),
      },
      slider3: {
        bottomLabel: `at age ${endYear - birthYear}`, //eg "at age 26"
        max: 2080,
        min: startYear,
        step: 1,
        topLabel: "Until ",
        type: "year",
        value: endYear,
        handleChange: (value: number) => set(id, "main_reducer", value, flow, period, "end"),
      },
    }
  })

  return { ...editPeriod, slidersArray }
}
