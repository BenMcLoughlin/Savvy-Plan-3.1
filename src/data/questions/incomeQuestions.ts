import { IIncomeStream } from "types/reducer_types"
import { createStream, addPeriodToStream, newIncomeStream } from "services/create_functions"
import { ageAtSelectedYear } from "services/ui_functions"
import _ from "lodash"

/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income incomeStream such as when they started and how much they earn.
 * It initially consists of an array that returns an income incomeStream with one period.  As the user
 * increments the "periods" number in the incomeStream a set of new objects is added to the incomeStream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const incomeQuestions = (instance: IIncomeStream, set: any, state: any, remove: any, parent: string) => {
  const { periods, id, owner } = instance

  const { ui_reducer } = state
  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

  const { colorIndex, progress } = state.ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)


  const questions: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
      component: "TextInput",
      chart: parent === "Questions" ? "IncomeChart" : null,
      label: "Source of Income",
      title: "Where does this income come from?",
      placeholder: "Income Name",
      type: "text",
      valid: true,
      handleChange: (value: string) => set(id, "main_reducer", value, "name"),
    },
    {
      //QUESTION 1 - Type of income
      array: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
      chart: parent === "Questions" ? "IncomeChart" : null,
      component: "PickSingleOption",
      title: "What kind of income is it?",
      textInput: true,
      valid: instance.reg.length > 1,
      value: instance.reg,
      handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "reg"),
    },
    {
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: parent === "Questions" ? "IncomeChart" : null,
      component: "DualSelect",
      option1: "yes",
      option2: "no",
      value: ui_reducer.dualSelectValue,
      valid: true,
      title: "Would you like to add another income source?",
      handleChange: () => {
        set("dualSelectValue", "ui_reducer", true)
        createStream(colorIndex, incomeStream, set, "income", owner)
      },
      handleChange2: () => {
        set("newStream", "ui_reducer", false)
        set("selectedId", "ui_reducer", false)
        if (parent === "display") set("progress", "ui_reducer", 0)
        set("dualSelectValue", "ui_reducer", false)
      },
    },
  ]

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
   *these other objects are created by mapping through the period numbers on the instance and adding new periods.
   */

  const editPeriod = {
    ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    valid: true,
    addLabel: "Add a period where it changed",
    title: `Tell us about your ${instance.name} income`,
    handleChange: () => addPeriodToStream(instance, periods, id, set),
  }

  const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
    const startYear = instance[`period${i}StartYear`]
    const endYear = instance[`period${i}EndYear`]

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
        bottomLabel: `before tax per year`,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: past ? "I earned" : "I might earn",
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

  questions.splice(2, 0, { ...editPeriod, slidersArray })

  return {
    questionsType: "income",
    questions,
  }
}
