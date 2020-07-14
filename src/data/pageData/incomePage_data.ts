import _ from "lodash"
import { newIncomeStream, createStream, addPeriodToStream } from "services/create_functions"

/**
 * incomePage_data receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const incomePage_data = (state: any, set: any, parent: string): any => {
  
  const { selectedId, colorIndex, selectedUser, newStream } = state.ui_reducer

  const { user1BirthYear, user1Name, user2Name } = state.user_reducer

  const data = {
    page: "income",
    chart: "IncomeChart", //determines the chart that will be rendered
    editPanel: "EditPanel", //tells <Display> which edit component to use
    user1Name,
    user2Name,
    addButtonLabel: "Add Income Stream", //Label next to the plus button
    infoCards: [
      //information cards providing insights to the user about their income. These will be mapped through and a card rendered.
      {
        label: "insights",
        array: [
          "Your estimated retirement pension income is is $14,000 a year. That's you Canada Pension Plan and Old age security combined",
          "Since you don't have a large pension income in retirement and you're working earnings are higher than $70k you'll want to focus on your RRSP",
          "The best years to contribute to your RRSP will be 2025-2029 because you're earning more and you're receiving the child Canadd Benefit",
        ],
      },
      {
        label: "action steps",
        array: [
          "Focus on contributing to your RRSP in the years 2024 - 2029",
          "Ensure you have a Canada Revenue Agency my service account set up so you can see what your TFSA and RRSP contribution room is ",
          "Since your spouse earns considerably less you'll want to look into setting up a spousal RRSP",
        ],
      },
    ],
    createStream: function () {
      //when the user clicks "Add new Stream" this function creates a new income stream and sets the id in the ui_reducer to it is displayed
      createStream(colorIndex, set, "income", "employment", selectedUser)
      set("newStream", "ui_reducer", true)
    },
  }

  if (selectedId && !newStream) {
    const instance = state.main_reducer[selectedId] //the object the user is editing. Eg. Wal Mart Income

    const { id, periods, owner } = instance

    const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

    const { user1BirthYear, user2BirthYear } = state.user_reducer

    const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

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
      let past = currentYear > instance[`period${i}StartYear`]

      return {
        component: "MultiSliders",
        num: 3,
        parent,
        slider1: {
          bottomLabel: `at age ${instance[`period${i}StartYear`] - birthYear}`, //eg "at age 26"
          max: 2080,
          min: i === 0 ? birthYear + 17 : instance[`period${i - 1}EndYear`], //if its the first one then just 2020, otherwise its the period priors last year
          step: 1,
          topLabel: i === 0 ? "Starting in" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
          type: "year",
          value: instance[`period${i}StartYear`],
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

    return {
      //add the edit details to the final data object
      ...data,
      editPeriod: {
        ...editPeriod,
        slidersArray,
      },
    }
  }

  return data
}
