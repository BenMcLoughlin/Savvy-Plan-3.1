import _ from "lodash"
import { newStream, createStream } from "services/ui_functions"
import { colorArray_data } from "styles/color_data"

interface IData {
  chart: string
}

/**
 * incomePage_data receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const incomePage_data = (state: any, setValue_action: any): any => {
  const { selectedId, colorIndex } = state.ui_reducer

  const { user1BirthYear } = state.user_reducer

  const incomeStream = newStream(colorArray_data[colorIndex], "Employment", "Income Name", 0, true, +user1BirthYear + 18, 15000, +user1BirthYear + 40)

  const data = {
    chart: "IncomeChart", //determines the chart that will be rendered
    userEditForm: "EditIncome", //tells <Display> which edit component to use
    addButtonLabel: "Add Income Strem", //Label next to the plus button
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
      createStream(colorIndex, incomeStream, setValue_action, "income")
    },
  }

  if (selectedId) {
    //When the user selects an income stream to edit it is set in the selectedId of ui_reducer, the data to build the component is then passed to <Display/>
    const instance = state.main_reducer[selectedId] //the object the user is editing. Eg. Wal Mart Income

    const { id, periods } = instance

    const lastAge = instance[`yearLast`] - 1988 //Age at the last year of when the income will ge going too

    const editProps = {
      //this object will be passed to the edit box that pops up and enables the user to change the income
      instance, //passes all details from the selected instance
      id,
      editTitle: true, //this enables the user to change the name of the instance, we want this for income but not for savings accounts
      periods,
      addPeriodLabel: "Add a period where your income changed", //this label sits beside a plus button that prompts the user to add a new period
      dropdown: {
        //a dropdown panel is shown in the header enabling the user to change the type of income
        array: ["Employment Income", "Business Income", "Pension Income", "Retirement Income", "Non-Taxable Income"],
        id,
        label: "Type",
        reducer: "main_reducer",
        childId: "reg",
      },
      lastSlider: {
        //There is one slider on the righ that it always visible asking when the user would like to input their income until
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
        sliderLeft: {
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
        sliderRight: {
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
      //add the edit details to the final data object
      ...data,
      editProps: {
        ...editProps,
        periodSliders,
      },
    }
  }

  return data
}
