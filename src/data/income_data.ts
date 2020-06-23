import { IIncomeStream } from "types/reducer_types"
import { createStream, addPeriodToIncomeStream, newIncomeStream } from "services/ui_functions"
import _ from "lodash"

/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income incomeStream such as when they started and how much they earn.
 * It initially consists of an array that returns an income incomeStream with one period.  As the user
 * increments the "periods" number in the incomeStream a set of new objects is added to the incomeStream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createIncomeArray = (instance: IIncomeStream, set: any, state: any, remove: any) => {
  const { periods, id, owner } = instance

  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  const { user1BirthYear, user2BirthYear } = state.user_reducer

  const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

  const { colorIndex } = state.ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'Examples could be if you work as an Engineer, you could say "Engineer Income. Or name if after the employer that pays you, like "Wal Mart Income".',
      component: "TextInput",
      childId: "name",
      chart: "IncomeChart",
      id,
      label: "Source of Income",
      reducer: "main_reducer",
      title: "What do you call this income stream?",
      placeholder: "Income Name",
      type: "text",
    },
    {
      //QUESTION 1 - Type of income
      array: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
      chart: "IncomeChart",
      component: "PickSingleOption",
      childId: "reg",
      id,
      reducer: "main_reducer",
      title: "What kind of income is it?",
      textInput: true,
    },
    {
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: "IncomeChart",
      component: "DualSelect",
      id: "selectedUser",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another income stream to the chart?",
      onClick: function () {
        createStream(colorIndex, incomeStream, set, "income", owner)
      },
      undo(id) {
        remove(id)
      },
    },
  ]

  /** This is the data required to build a component that renders three range bars, a scroll bar and an add button. It is a base object that has an array of other objects attached to it.
   *these other objects are created by mapping through the period numbers on the instance and adding new periods.
   */

  const editIncome = {
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

  array.splice(2, 0, { ...editIncome, slidersArray })
  // for (let i = periods; i > 0; i--) {
  //   let past = currentYear > instance[`year${i}`]
  //   array.splice(
  //     6,
  //     0,
  //     {
  //       ask: `If you think you're income might increase or decrease it's helpful to place that here. It helps us determine when and how much you should contribute to different savings accounts.`,
  //       bottomLabel: `at age ${instance[`year${i}`] - 1988}`,
  //       chart: "IncomeChart",
  //       childId: `year${i}`,
  //       component: "Slider",
  //       id,
  //       max: 2100,
  //       min: instance[`year${i - 1}`],
  //       step: 1,
  //       topLabel: past ? "My income changed in" : "It might change in",
  //       reducer: "main_reducer",
  //       title: past ? "What year did your income change?" : "What year do you think your income will change?",
  //       type: "year",
  //     },
  //     {
  //       ask: `Once again, it doesn't have to be perfect. There's a big difference between 70k and 30k which makes a difference in our plan but small changes won't have much of an impact.`,
  //       bottomLabel: "before tax per year",
  //       chart: "IncomeChart",
  //       childId: `value${i}`,
  //       component: "Slider",
  //       id,
  //       max: 400000,
  //       min: 0,
  //       step: 1000,
  //       topLabel: past ? "I earned?" : "I might earn",
  //       reducer: "main_reducer",
  //       title: past ? "How much did you earn?" : "What would you guess you will earn?",
  //       type: "currency",
  //     },
  //     {
  //       ask: `If you think it will change significantly again, add it in. Examples could be taking a few years off or getting a promotion.`,
  //       chart: "IncomeChart",
  //       component: "DualSelect",
  //       id: "selectedUser",
  //       option1: "yes",
  //       option2: "no",
  //       reducer: "ui_reducer",
  //       title: past ? "Did it change over $5000 again?" : "Did you think it will change over $5000 again?",
  //       onClick: function () {
  //         addPeriodToIncomeStream(instance, periods, id, set)
  //       },
  //     }
  //   )
  // }
  return array
}
