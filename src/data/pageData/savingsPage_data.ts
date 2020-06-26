import _ from "lodash"
import { newSavingsStream, createStream } from "services/create_functions"

interface IData {
  chart: string
}

export const savingsPage_data = (state: any, set: any): any => {
  const { selectedId, colorIndex, selectedAccount, selectedUser, newStream } = state.ui_reducer

  const { userName, user2Name } = state.user_reducer

  const savingsStream = newSavingsStream(selectedAccount.toLowerCase(), 2020)

  const data = {
    page: "savings",
    chart: "SavingsChart",
    userEditForm: "EditPanel",
    addButtonLabel: "Add Savings Account",
    userName,
    user2Name,
    chartNavOptions: ["tfsa", "rrsp", "nopersonal", "all accounts"],
    infoCards: [
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
      //when the user clicks "Add new Stream" this function creates a new income stream and sets the id in the ui_reducer to it is displayed along with setting new stream to be true so it knows to edit a new stream
      createStream(colorIndex, savingsStream, set, "savings", selectedUser)
      set("newStream", "ui_reducer", true)
    },
  }

  if (selectedId && !newStream) {
    const instance = state.main_reducer[selectedId]

    const { id, periods, owner } = instance

    const { user1BirthYear, user2BirthYear } = state.user_reducer

    const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

    const editPeriod = {
      ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
      component: "TripleSliderSelector", //very special advanced component tailored for this type of object
      periods: periods,
      id,
      childId: "period0StartYear",
      reducer: "main_reducer",
      title: `Lets gather some details about your ${instance.reg} contributions`,
      addLabel: `Add a period when these contributions change`,
      dualSelectorProps:    {
        ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
        component: "DualSelect",
        id: "selectedTransaction",
        option1: "contributions",
        option2: "withdrawals",
        reducer: "ui_reducer",
        title: "Would you like to add another income source?",
      },
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
          max: instance.reg === "tfsa" ? 6000 : 25000, //tfsa has a max contribution per year of 6000
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
