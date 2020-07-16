import { ageAtSelectedYear } from "services/ui_functions"
import { addPeriodToStream } from "services/create_functions"
import _ from "lodash"
import * as I from "types"

export const createTripleSliders = (data, instance: I.instance, set: I.set, state: I.appState) => {
  const { streamType } = data
  const { id, periods, owner } = instance

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

  const editPeriod = {
    explanation: data.slidersInput.explanation,
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    valid: true,
    addLabel: "Add a period where it changed",
    question: data.slidersInput.question,
    handleChange: () => addPeriodToStream(instance, periods, id, set),
  }

  const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
    const startYear = instance[`period${i}StartYear`]
    const endYear = instance[`period${i}EndYear`]
    const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

    let past = currentYear > instance[`period${i}StartYear`]

    return {
      component: "MultiSliders",
      num: 3,
      slider1: {
        bottomLabel: `at age ${ageAtSelectedYear(startYear, birthYear)}`, //eg "at age 26"
        max: 2080,
        min: i === 0 ? birthYear + 17 : instance[`period${i - 1}EndYear`], //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: i === 0 ? "Starting in" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: startYear,
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}StartYear`),
      },
      slider2: {
        bottomLabel: data.slidersInput.bottomLabel,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: past ? data.slidersInput.topLabelPast : data.slidersInput.topLabelFuture,
        value: instance[`period${i}Value`],
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}Value`),
      },
      slider3: {
        bottomLabel: `at age ${ageAtSelectedYear(endYear, birthYear)}`, //eg "at age 26"
        max: 2080,
        min: startYear,
        step: 1,
        topLabel: "Until ",
        type: "year",
        value: endYear,
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}EndYear`),
      },
    }
  })
  return { ...editPeriod, slidersArray }
}

export const createPropertySliders = (instance, set) => {
  const { id } = instance
  const editPeriod = {
    explanation: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    valid: true,
    addLabel: "Add a period where it changed",
    question: "Tell us about the value of the house",
    slider1: {
      bottomLabel: "year",
      max: 2030,
      min: 1990,
      step: 1,
      topLabel: "I bought it in ",
      type: "year",
      value: instance[`purchaseYear`],
      handleChange: (value: number) => set(id, "main_reducer", value, `purchaseYear`),
    },
    slider2: {
      bottomLabel: "purchase price",
      max: 1500000,
      min: 100000,
      step: 5000,
      topLabel: "For About ",
      value: instance[`purchasePrice`],
      handleChange: (value: number) => set(id, "main_reducer", value, `purchasePrice`),
    },
    slider3: {
      bottomLabel: "current value",
      max: 1500000,
      min: 100000,
      step: 5000,
      topLabel: "And now its worth ",
      value: instance[`currentValue`],
      handleChange: (value: number) => set(id, "main_reducer", value, `currentValue`),
    },
  }

  return editPeriod
}

export const createMortgageSliders = (instance: I.instance, set: I.set) => {
  const { id } = instance

  const editPeriod = {
    explanation:  "We can add the debt to your networth and show you how it will play out in your plan.",
    component: "MultiSliders",
    num: 3,
    valid: true,
    addLabel: "Add a period where it changed",
    question:`We need some mortgage details for ${instance.name}`,
    slider1: {
      bottomLabel: "on the balance",
      max: 1000000,
      min: 0,
      step: 1000,
      topLabel: "I currently owe",
      value: instance[`mortgageBalance`],
      handleChange: (value: number) => set(id, "main_reducer", value, `mortgageBalance`),
    },
    slider2: {
      bottomLabel: "mortgage rate",
      max: 5,
      min: 0,
      step: 0.1,
      topLabel: "With a rate of",
      type: "percentage",
      value: instance[`mortgageRate`],
      handleChange: (value: number) => set(id, "main_reducer", value, `mortgageRate`),
    },
    slider3: {
      bottomLabel: "Years Remaining ",
      max: 35,
      min: 0,
      step: 1,
      topLabel: "And have",
      value: instance[`mortgageAmortization`],
      handleChange: (value: number) => set(id, "main_reducer", value, `mortgageAmortization`),
    },
  }

  return editPeriod
}

export const createDebtSliders =  (instance: any, set: I.set) => {

  const { balance, id, payment, rate } = instance

  const editPeriod = {
    explanation:   "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    valid: true,
    addLabel: "Add a period where it changed",
    question: "Tell us about the debt",
    slider1: {
      bottomLabel: "on the balance",
      max: 1000000,
      min: 0,
      step: 1000,
      topLabel:  "I carry about ",
      value: balance,
      handleChange: (value: number) => set(id, "main_reducer", value, `balance`),
    },
    slider2: {
      bottomLabel: "per year",
      max: 30,
      min: 0,
      step: 1,
      topLabel: "My Interest rate is",
      type: "percentage",
      value: rate,
      handleChange: (value: number) => set(id, "main_reducer", value, `rate`),
    },
    slider3: {
      bottomLabel: "per month",
      max: 10000,
      min: 0,
      step: 100,
      topLabel: "I make payments of ",
      value: payment,
      handleChange: (value: number) => set(id, "main_reducer", value, `payment`),
    },
  }

  return editPeriod
}