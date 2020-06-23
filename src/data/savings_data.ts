import { addPeriodToStream } from "services/ui_functions"
import _ from "lodash"

export const createSavingsArray = (instance: any, set: any, state: any, remove: any) => {
  const { periods, id, reg, owner } = instance

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? user1BirthYear : user2BirthYear

  const array: any = [
    {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg}`,
      childId: "currentValue",
      component: "Slider",
      id,
      max: 120000,
      min: 0,
      step: 1000,
      topLabel: "I have around ",
      reducer: "main_reducer",
      title: `How much do you currently have in your ${reg}?`,
    },

  ]

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
  *these other objects are created by mapping through the period numbers on the instance and adding new periods. 
  */
  const editSavingAccount = {
    ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    id,
    childId: "period0StartYear",
    reducer: "main_reducer",
    title: `Lets gather some details about your ${instance.reg} contributions`,
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

  array.push({ ...editSavingAccount, slidersArray })

  return array
}
