import _ from "lodash"
import { newIncomeStream, createStream } from "services/ui_functions"

interface IData {
  chart: string
}

export const netWorthPage_data = (state: any, set: any): any => {
  const { selectedId, colorIndex, selectedUser } = state.ui_reducer

  const { user1BirthYear, userName, user2Name } = state.user_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)

  const data = {
    page: "networth",
    chart: "NetWorthChart",
    userEditForm: "EditIncome",
    addButtonLabel: "Add Asset or a liability",
    userName,
    user2Name,
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
      createStream(colorIndex, incomeStream, set, "income", selectedUser)
    },
  }

  if (selectedId) {
    const instance = state.main_reducer[selectedId]

    const { id, periods } = instance

    const editProps = {
      instance,
      id,
      editTitle: false, //this enables the user to change the name of the instance, we want this for income but not for savings accounts
      periods,
      addPeriodLabel: "add different contributions or withdrawals", //this label sits beside a plus button that prompts the user to add a new period
      dropdown: {
        array: ["TFSA", "RRSP", "Nopersonal"],
        id,
        label: "Account",
        reducer: "main_reducer",
        childId: "reg",
      },
      lastSlider: {
        bottomLabel: `in my TFSA`,
        childId: "yearLast",
        id,
        max: 20080,
        min: 0,
        step: 1000,
        title: "1",
        reducer: "main_reducer",
        type: "currency",
        topLabel: "I currently have",
      },
    }

    const periodSliders = _.range(periods + 1).map((d: any, i: number) => {
      const minYear = instance[`year${i - 1}`] ? instance[`year${i - 1}`] : 1990
      const selectedAge = instance[`year${i}`] - 1988
      const value = instance[`value${i}`]
      return {
        sliderLeft: {
          bottomLabel: `per year`,
          childId: `value${i}`,
          id,
          max: 6000,
          min: -10000,
          step: 100,
          title: "1",
          reducer: "main_reducer",
          type: "year",
          topLabel: value >= 0 ? "I can contribute" : "I'd like to withdraw",
        },
        sliderRight: {
          bottomLabel: `at age ${selectedAge}`,
          childId: `year${i}`,
          id,
          max: 2100,
          min: minYear,
          step: 1,
          title: "1",
          reducer: "main_reducer",
          type: "year",
          topLabel: i === 0 ? "Until" : `from ${instance[`year${i - 1}`]}, until`,
        },
      }
    })

    return {
      ...data,
      editProps: {
        ...editProps,
        periodSliders,
      },
    }
  }

  return data
}
