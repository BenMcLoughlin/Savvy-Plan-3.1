import { IIncomeStream } from "types/reducer_types"
import { createStream, addPeriodToIncomeStream, newIncomeStream } from "services/create_functions"
import _ from "lodash"

/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income incomeStream such as when they started and how much they earn.
 * It initially consists of an array that returns an income incomeStream with one period.  As the user
 * increments the "periods" number in the incomeStream a set of new objects is added to the incomeStream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createIncomeArray = (instance: IIncomeStream, set: any, state: any, remove: any, parent: string) => {
  const { periods, id, owner } = instance

  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

  const { colorIndex } = state.ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)

  const wizardArray: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
      component: "TextInput",
      childId: "name",
      chart: parent === "onboard" ? "IncomeChart" : null,
      id,
      label: "Source of Income",
      reducer: "main_reducer",
      title: "Where does this income come from?",
      placeholder: "Income Name",
      type: "text",
    },
    {
      //QUESTION 1 - Type of income
      array: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
      chart: parent === "onboard" ? "IncomeChart" : null,
      component: "PickSingleOption",
      childId: "reg",
      id,
      reducer: "main_reducer",
      title: "What kind of income is it?",
      textInput: true,
    },
    {
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: parent === "onboard" ? "IncomeChart" : null,
      component: "DualSelect",
      id: "selectedUser",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another income source?",
      onClick1: () =>  createStream(colorIndex, incomeStream, set, "income", owner),
      onClick2: () => {
        set("newStream", "ui_reducer", false)
        set("selectedId", "ui_reducer", false)
      },
    },
  ]

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
   *these other objects are created by mapping through the period numbers on the instance and adding new periods.
   */

  const editPeriod = {
    ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods: periods,
    id,
    childId: "period0StartYear",
    reducer: "main_reducer",
    title: `Tell us about your ${instance.name} income`,
    addLabel: `Add a period when your income changed.`,
  }

  const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
    let past = currentYear > instance[`period${i}StartYear`]

    return {
      component: "MultiSliders",
      num: 3,
      parent, 
      slider1: {
        bottomLabel: `at age ${instance[`period${i}StartYear`] - birthYear}`, //eg "at age 26"
        childId: `period${i}StartYear`, //the value being changed
        id, //id of the instance selected in the ui_reducer
        max: 2080,
        min: i === 0 ? birthYear + 17 : instance[`period${i - 1}EndYear`], //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: i === 0 ? "Starting in" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        reducer: "main_reducer",
        type: "year",
      },
      slider2: {
        bottomLabel: `before tax per year`,
        childId: `period${i}Value`, //`contributionValue${i}`,
        id,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: past ? "I earned" : "I might earn",
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

  wizardArray.splice(2, 0, { ...editPeriod, slidersArray })

  return {
    wizardType: "income",
    wizardArray,
  }
}
