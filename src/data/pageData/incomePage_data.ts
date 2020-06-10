import _ from "lodash"
import { newStream, createStream } from "services/ui_functions"
import { colorArray_data } from "styles/color_data"

interface IData {
  chart: string
}

export const incomePage_data = (state: any, setValue_action: any): any => {
  const { selectedId, colorIndex } = state.ui_reducer

  const {birthYear, userName, spouseName} = state.user_reducer

  const incomeStream = newStream(colorArray_data[colorIndex], "Employment", "Income Name", 0, true, +birthYear + 18, 15000, +birthYear + 40, )

  const data = {
    chart: "UserIncomeChart",
    userEditForm: "EditIncome",
    addButtonLabel: "Add Income Strem",
    userName,
    spouseName,
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
      createStream(colorIndex, incomeStream, setValue_action, "income")
    },
  }

  if (selectedId) {
    const instance = state.main_reducer[selectedId]

    const { id, periods } = instance

    const lastAge = instance[`yearLast`] - 1988

    const editProps = {
      instance,
      id,
      periods,
      dropdown: {
        array: ["Employment Income", "Business Income", "Pension Income", "Retirement Income", "Non-Taxable Income"],
        id,
        label: "Type",
        reducer: "main_reducer",
        childId: "reg",
      },
      lastSlider: {
        bottomLabel: `At age ${lastAge}`,
        childId: "yearLast",
        id,
        max: 2080,
        min: 1990,
        step: 1,
        title: "1",
        reducer: "main_reducer",
        type: "year",
        topLabel: "And ended in",
      },
    }

    const periodSliders = _.range(periods + 1).map((d: any, i: number) => {
      const minYear = instance[`year${i - 1}`] ? instance[`year${i - 1}`] : 1990
      const selectedAge = instance[`year${i}`] - 1988
      return {
        yearSlider: {
          bottomLabel: `at age ${selectedAge}`,
          childId: `year${i}`,
          id,
          max: 2080,
          min: minYear,
          step: 1,
          title: "1",
          reducer: "main_reducer",
          type: "year",
          topLabel: i === 0 ? "I started in" : "It changed in",
        },
        valueSlider: {
          bottomLabel: `Before taxes, per year}`,
          childId: `value${i}`,
          id,
          max: 300000,
          min: 1000,
          step: 1000,
          title: "1",
          reducer: "main_reducer",
          type: "year",
          topLabel: i === 0 ? "Earning" : "To Earning",
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
