import { newSavingsStream, createStream } from "services/create_functions"
import _ from "lodash"

export const createSavingsArray = (instance: any, set: any, state: any, remove: any, parent: string) => {
  const { periods, id, reg, owner } = instance

  const { selectedId, colorIndex, selectedUser, selectedAccount, newStream } = state.ui_reducer

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? user1BirthYear : user2BirthYear

  const savingsStream = newSavingsStream(selectedAccount.toLowerCase(), 2020)
console.log(parent);
  const wizardArray: any = [
    {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg.toUpperCase()}`,
      childId: "currentValue",
      component: "Slider",
      id,
      max: 120000,
      min: 0,
      step: 1000,
      topLabel: "I have around ",
      reducer: "main_reducer",
      title: `How much do you currently have in your ${reg.toUpperCase()}?`,
    },
  ]
  

  if (parent != "onboard") {
    wizardArray.unshift({
      array: ["TFSA", "RRSP", "Personal", "RESP", "LIRA"], //wizardArray of options shown in component
      ask: "We want to ensure our planning process is inclusive.",
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      id: "selectedAccount",
      reducer: "ui_reducer", //reducer we want the information stored in
      title: "What kind of account is it?",
      onClick: d => {
        set(id, "main_reducer", d, "reg")
        set("selectedAccount", "ui_reducer", d)
      },
    })
  }
  if (parent != "onboard") {
    wizardArray.unshift(    {
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: parent === "onboard" ? "IncomeChart" : null,
      component: "DualSelect",
      id: "videoUrl",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another Savings Account?",
      onClick1: () => createStream(colorIndex, savingsStream, set, "income", owner),
      onClick2: () => {
        set("newStream", "ui_reducer", false)
        set("selectedId", "ui_reducer", false)
      },
    },)
  }

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
   *these other objects are created by mapping through the period numbers on the instance and adding new periods.
   */

  const editPeriod = {
    ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    id,
    childId: "period0StartYear",
    reducer: "main_reducer",
    title: `How much do you contribute?`,
    addLabel: `Add a period when these contributions change`,
  }

  const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
    return {
      component: "MultiSliders",
      num: 3,
      slider1: {
        bottomLabel: `at age ${instance[`period${i}StartYear`] - birthYear}`, //eg "at age 26"
        childId: `period${i}StartYear`, //the value being changed
        id, //id of the instance
        max: 2080, //max year
        min: i === 0 ? 2020 : instance[`period${i - 1}EndYear`], //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: i === 0 ? "From" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        reducer: "main_reducer",
        type: "year",
      },
      slider2: {
        bottomLabel: "per year",
        childId: `period${i}Value`,
        id,
        max: instance.reg === "TFSA" ? 6000 : 25000, //tfsa has a max contribution per year of 6000
        min: 0,
        step: 100,
        topLabel: i === 0 ? "I aim to contribute" : "I might contribute",
        reducer: "main_reducer",
        type: "currency",
      },
      slider3: {
        bottomLabel: `at age ${instance[`period${i}EndYear`] - birthYear}`,
        childId: `period${i}EndYear`,
        id,
        max: 2080,
        min: instance[`period${i}StartYear`],
        step: 1,
        topLabel: "Until ",
        reducer: "main_reducer",
        type: "year",
      },
    }
  })

  wizardArray.splice(2, 0, { ...editPeriod, slidersArray })

  return {
    wizardType: "savings",
    wizardArray,
  }
}
