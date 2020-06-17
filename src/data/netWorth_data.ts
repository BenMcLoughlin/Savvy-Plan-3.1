import { createStream, addPeriodToStream, newStream } from "services/ui_functions"
import { colorArray_data } from "styles/color_data"
/**
 * createPropertyArray() returns an array of objects that each represent a detail of the income propertyStream such as when they started and how much they earn.
 * It initially consists of an array that returns an income propertyStream with one period.  As the user
 * increments the "periods" number in the propertyStream a set of new objects is added to the propertyStream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createPropertyArray = (instance, setValue_action: any, state: any) => {
  const { periods, id } = instance

  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  let past = currentYear > instance.year0
  let finalPast = currentYear > instance[`yearLast`]

  const { user1BirthYear } = state.user_reducer
  const { colorIndex } = state.ui_reducer

  const propertyStream = newStream(colorArray_data[colorIndex], "property", "Primary Residence", 0, true, +user1BirthYear + 18, 1500, +user1BirthYear + 40)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'Examples could be Primary Residence, home, rental property or the address".',
      component: "TextInput",
      childId: "name",
      id,
      label: "Property Name",
      reducer: "main_reducer",
      title: "What do you call this property",
      placeholder: "",
      type: "text",
    },
    {
      //QUESTION 1 - Type of income
      array: ["Primary Residence", "Vacation Property", "Rental Property", "Business", "Other"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "If its rental property there could be some tax advantages we could look at.",
      component: "PickSingleOption",
      childId: "reg",
      id,
      reducer: "main_reducer",
      title: "What kind of property is it?",
      textInput: true,
    },
    {
      ask: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
      bottomLabel: `at age ${instance.year0 - 1988}`,
      component: "Slider",
      childId: "year0",
      id,
      max: 2080,
      min: `${+user1BirthYear + 16}`,
      step: 1,
      topLabel: "I bought it in ",
      reducer: "main_reducer",
      title: past ? "When did you purchase it?" : "When do you plan to purchase it?",
      type: "year",
    },
    {
      ask: "Put in the value when you started. You can add changes in incomelater",
      bottomLabel: "",
      childId: "value0",
      component: "Slider",
      id,
      max: 150000,
      min: 0,
      step: 1000,
      topLabel: "purchase price ",
      reducer: "main_reducer",
      title: past ? "How much did you buy it for?" : "How much do you think you'll buy it for?",
    },
    {
      ask: "We want to add the impact of capital gains into your tax calculations",
      bottomLabel: "",
      childId: "value0",
      component: "Slider",
      id,
      max: 150000,
      min: 0,
      step: 1000,
      topLabel: "purchase price ",
      reducer: "main_reducer",
      title: past ? "How much is it worth now?" : "How much do you think you'll buy it for?",
    },
    {
      ask:
        "Ending could be caused by changing careers or retiring. Even if you're not sure, just guess. It will help us give you an idea of what your pension would be if you did end at that time.",
      bottomLabel: `at age ${instance[`yearLast`] - 1988}`,
      component: "Slider",
      childId: `yearLast`,
      id,
      max: 2095,
      min: instance[`year${periods}`],
      step: 1,
      topLabel: finalPast ? "I sold it in" : "It might sell it in",
      reducer: "main_reducer",
      title: finalPast ? "When did you sell it?" : "When do you think you might sell it?",
      type: "year",
    },
    {
      ask:
        "Ending could be caused by changing careers or retiring. Even if you're not sure, just guess. It will help us give you an idea of what your pension would be if you did end at that time.",
      bottomLabel: `at age ${instance[`yearLast`] - 1988}`,
      component: "Slider",
      childId: `yearLast`,
      id,
      max: .6,
      min: 0,
      step: .01,
      topLabel: finalPast ? "I sold it in" : "It might sell it in",
      reducer: "main_reducer",
      title: "what growth rate would you like to use?",
      type: "percentage",
    },
    //---INSERT HERE
    {
      ask:
        "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      component: "DualSelect",
      id: "selectedUser",
      value1: "yes",
      value2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add another property to the chart?",
      onClick: function () {
        createStream(colorIndex, propertyStream, setValue_action, "userIncome")
      },
    },
  ]

  return array
}
