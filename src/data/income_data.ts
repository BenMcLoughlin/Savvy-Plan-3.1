import { IIncomeStream } from "types/reducer_types"
import { createStream, addPeriodToStream, newStream } from "services/ui_functions"
import { colorArray_data } from "styles/color_data"
/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income incomeStream such as when they started and how much they earn.
 * It initially consists of an array that returns an income incomeStream with one period.  As the user
 * increments the "periods" number in the incomeStream a set of new objects is added to the incomeStream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createIncomeArray = (instance: IIncomeStream, setValue_action: any, state: any) => {
  const { periods, id } = instance

  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  let past = currentYear > instance.year0
  let finalPast = currentYear > instance[`yearLast`]

  const { user1BirthYear } = state.user_reducer
  const { colorIndex } = state.ui_reducer

  const incomeStream = newStream(colorArray_data[colorIndex], "Employment", "Wal Mart Income", 0, true, +user1BirthYear + 18, 1500, +user1BirthYear + 40)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'Examples could be if you work as an Engineer, you could say "Engineer Income. Or name if after the employer that pays you, like "Wal Mart Income".',
      component: "TextInput",
      childId: "name",
      chart: "IncomeChart",
      comment: "See how you already have income? This shows some of your government benefits.",
      commentTop: 0,
      commentLeft: 43,
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
      ask: "In order to calculate your pension income we need to know when you started, what you earned, and when you might end.",
      bottomLabel: `at age ${instance.year0 - 1988}`,
      chart: "IncomeChart",
      comment: "As your income changes, we're calculating your Canada Pension income.",
      commentTop: 0,
      commentLeft: 43,
      component: "Slider",
      childId: "year0",
      id,
      max: 2080,
      min: `${+user1BirthYear + 16}`,
      step: 1,
      topLabel: "I started in ",
      reducer: "main_reducer",
      title: past ? "When did you start earning this income?" : "When do you think you'll start earning this income?",
      type: "year",
    },
    {
      //ask: "How much were you earning when you started?",
      ask: "Put in the value when you started. You can add changes in incomelater",
      bottomLabel: "before tax per year",
      chart: "IncomeChart",
      comment: "The more you earn, the more you've contributed and the more you get.",
      commentTop: 0,
      commentLeft: 43,
      childId: "value0",
      component: "Slider",
      id,
      max: 400000,
      min: 0,
      step: 1000,
      topLabel: "I earned ",
      reducer: "main_reducer",
      title: past ? "How much were your average annual earnings when you started?" : "What do you think your average annual earnings will be?",
    },
    {
      ask:
        "Ending could be caused by changing careers or retiring. Even if you're not sure, just guess. It will help us give you an idea of what your pension would be if you did end at that time.",
      bottomLabel: `at age ${instance[`yearLast`] - 1988}`,
      chart: "IncomeChart",
      component: "Slider",
      childId: `yearLast`,
      id,
      max: 2095,
      min: instance[`year${periods}`],
      step: 1,
      topLabel: finalPast ? "It ended in" : "It might end in",
      reducer: "main_reducer",
      title: finalPast ? "When did you stop earning this income?" : "When do you think it will end?",
      type: "year",
    },
    {
      ask: "Your values don't have to be perfect, but we do want to capture large changes as they might impact your pension income.",
      chart: "IncomeChart",
      component: "DualSelect",
      comment: "Adding the changes helps us do a better job esitmating your Canada Pension plan. ",
      commentTop: 0,
      commentLeft: 43,
      id: "selectedUser",
      value1: "yes",
      value2: "no",
      reducer: "ui_reducer",
      title: past ? "Did it ever have a change greater than $5,000?" : "Did you think it will ever have a change greater than $5,000?",
      onClick: function () {
        setValue_action(id, "main_reducer", periods + 1, "periods")
        addPeriodToStream(instance, periods, id, setValue_action)
      },
    },
    //---INSERT HERE
    {
      ask:
        "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      chart: "IncomeChart",
      component: "DualSelect",
      id: "selectedUser",
      value1: "yes",
      value2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another income incomeStream to the chart?",
      onClick: function () {
        createStream(colorIndex, incomeStream, setValue_action, "userIncome")
      },
    },
  ]

  for (let i = periods; i > 0; i--) {
    let past = currentYear > instance[`year${i}`]
    array.splice(
      6,
      0,
      {
        ask: `If you think you're income might increase or decrease it's helpful to place that here. It helps us determine when and how much you should contribute to different savings accounts.`,
        bottomLabel: `at age ${instance[`year${i}`] - 1988}`,
        chart: "IncomeChart",
        childId: `year${i}`,
        component: "Slider",
        id,
        max: 2100,
        min: instance[`year${i - 1}`],
        step: 1,
        topLabel: past ? "My income changed in" : "It might change in",
        reducer: "main_reducer",
        title: past ? "What year did your income change?" : "What year do you think your income will change?",
        type: "year",
      },
      {
        ask: `Once again, it doesn't have to be perfect. There's a big difference between 70k and 30k which makes a difference in our plan but small changes won't have much of an impact.`,
        bottomLabel: "before tax per year",
        chart: "IncomeChart",
        childId: `value${i}`,
        component: "Slider",
        id,
        max: 400000,
        min: 0,
        step: 1000,
        topLabel: past ? "I earned?" : "I might earn",
        reducer: "main_reducer",
        title: past ? "How much did you earn?" : "What would you guess you will earn?",
        type: "currency",
      },
      {
        ask: `If you think it will change significantly again, add it in. Examples could be taking a few years off or getting a promotion.`,
        chart: "IncomeChart",
        component: "DualSelect",
        id: "selectedUser",
        value1: "yes",
        value2: "no",
        reducer: "ui_reducer",
        title: past ? "Did it change over $5000 again?" : "Did you think it will change over $5000 again?",
        onClick: function () {
          addPeriodToStream(instance, periods, id, setValue_action)
        },
      }
    )
  }
  return array
}

