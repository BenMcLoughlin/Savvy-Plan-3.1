import { newSavingsStream, addPeriodToStream, createStream } from "services/create_functions"
import _ from "lodash"

export const savingsQuestions = (instance: any, set: any, state: any, remove: any, parent: string) => {
  const { periods, id, reg, owner } = instance

  const { selectedId, colorIndex, selectedUser, selectedAccount, newStream } = state.ui_reducer

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? user1BirthYear : user2BirthYear

  const savingsStream = newSavingsStream(selectedAccount.toLowerCase(), 2020)

  const questions: any = [
    {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg.toUpperCase()}`,
      component: "Slider",
      max: 120000,
      min: 0,
      step: 1000,
      topLabel: "I have around ",
      title: `How much do you currently have in your ${reg.toUpperCase()}?`,
      selectedFocus: true,
      value: instance[`currentValue`],
      valid: true,
      handleChange: (value: string) => set(id, "main_reducer", value, "currentValue"),
    },
  ]

  if (parent != "onboard") {
    questions.unshift({
      array: ["TFSA", "RRSP", "Personal", "RESP", "LIRA"], //questions of options shown in component
      ask: "We want to ensure our planning process is inclusive.",
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      id: "selectedAccount",
      reducer: "ui_reducer", //reducer we want the information stored in
      title: "What kind of account is it?",
      valid: instance.reg.length > 1,
      value: instance.reg,
      handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "reg"),
    })
  }
  if (parent != "onboard") {
    questions.push({
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: parent === "Questions" ? "IncomeChart" : null,
      component: "DualSelect",
      id: "videoUrl",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another Savings Account?",
      handleChange: () => {
        set("dualSelectValue", "ui_reducer", true)
        createStream(colorIndex, savingsStream, set, "income", owner)
      },
      handleChange2: () => {
        set("newStream", "ui_reducer", false)
        set("selectedId", "ui_reducer", false)
        if (parent === "display") set("progress", "ui_reducer", 0)
        set("dualSelectValue", "ui_reducer", false)
      },
    })
  }

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
   *these other objects are created by mapping through the period numbers on the instance and adding new periods.
   */

  const editPeriod = {
    ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    valid: true,
    reducer: "main_reducer",
    title: `How much do you contribute?`,
    addLabel: `Add a period when these contributions change`,
    handleChange: () => addPeriodToStream(instance, periods, id, set),
  }

  const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
    return {
      component: "MultiSliders",
      num: 3,
      slider1: {
        bottomLabel: `at age ${instance[`period${i}StartYear`] - birthYear}`, //eg "at age 26"
        max: 2080, //max year
        min: i === 0 ? 2020 : instance[`period${i - 1}EndYear`], //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: i === 0 ? "From" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: instance[`period${i}StartYear`],
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}StartYear`),
      },
      slider2: {
        bottomLabel: "per year",
        max: instance.reg === "TFSA" ? 6000 : 25000, //tfsa has a max contribution per year of 6000
        min: 0,
        step: 100,
        topLabel: i === 0 ? "I aim to contribute" : "I might contribute",
        value: instance[`period${i}Value`],
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}Value`),
      },
      slider3: {
        bottomLabel: `at age ${instance[`period${i}EndYear`] - birthYear}`,
        max: 2080,
        min: instance[`period${i}StartYear`],
        step: 1,
        topLabel: "Until ",
        type: "year",
        value: instance[`period${i}EndYear`],
        handleChange: (value: number) => set(id, "main_reducer", value, `period${i}EndYear`),
      },
    }
  })

  questions.splice(2, 0, { ...editPeriod, slidersArray })

  return {
    questionsType: "savings",
    questions,
  }
}
