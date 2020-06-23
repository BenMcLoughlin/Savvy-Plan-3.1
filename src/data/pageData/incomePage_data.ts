import _ from "lodash"
import { newIncomeStream, createStream } from "services/ui_functions"

interface IData {
  chart: string
}

/**
 * incomePage_data receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const incomePage_data = (state: any, set: any): any => {
  const { selectedId, colorIndex, selectedUser, newStream } = state.ui_reducer

  const { user1BirthYear, userName, user2Name } = state.user_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)

  const data = {
    page: "income",
    chart: "IncomeChart", //determines the chart that will be rendered
    userEditForm: "EditPanel", //tells <Display> which edit component to use
    userName,
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
      createStream(colorIndex, incomeStream, set, "income", selectedUser)
      set("newStream", "ui_reducer", true)
    },
  }

  if (selectedId && newStream) {
      console.log('WAHOO!');
  }


  if (selectedId && !newStream) {
    const instance = state.main_reducer[selectedId] //the object the user is editing. Eg. Wal Mart Income

    const { id, periods, owner } = instance

    const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

    const { user1BirthYear, user2BirthYear } = state.user_reducer

    const birthYear = owner === "user1" ? +user1BirthYear : +user2BirthYear

    const editProps = {
      ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
      component: "TripleSliderSelector", //very special advanced component tailored for this type of object
      periods: periods,
      id,
      childId: "period0StartYear",
      reducer: "main_reducer",
      title: `Tell us about your ${instance.name} income`,
      addLabel: `Add a period where it changed`,
    }

    const slidersArray = _.range(periods + 1).map((d: any, i: number) => {
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
          topLabel: i === 0 ? "I earned" : "I might earn",
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

        return {
      //add the edit details to the final data object
      ...data,
      editProps: {
        ...editProps,
        slidersArray,
      },
    }
  }

  // //THese are the props used to build the edit income component
  // if (selectedId) {
  //   //When the user selects an income stream to edit it is set in the selectedId of ui_reducer, the data to build the component is then passed to <Display/>
  //   const instance = state.main_reducer[selectedId] //the object the user is editing. Eg. Wal Mart Income

  //   const { id, periods } = instance

  //   const lastAge = instance[`yearLast`] - 1988 //Age at the last year of when the income will ge going too

  // const editProps = {
  //   //this object will be passed to the edit box that pops up and enables the user to change the income
  //   instance, //passes all details from the selected instance
  //   id,
  //   editTitle: true, //this enables the user to change the name of the instance, we want this for income but not for savings accounts
  //   periods,
  //   addPeriodLabel: "Add a period where your income changed", //this label sits beside a plus button that prompts the user to add a new period
  //   dropdown: {
  //     //a dropdown panel is shown in the header enabling the user to change the type of income
  //     array: ["Employment Income", "Business Income", "Pension Income", "Retirement Income", "Non-Taxable Income"],
  //     id,
  //     label: "Type",
  //     reducer: "main_reducer",
  //     childId: "reg",
  //   },
  //   lastSlider: {
  //     //There is one slider on the righ that it always visible asking when the user would like to input their income until
  //     bottomLabel: `At age ${lastAge}`,
  //     childId: "yearLast",
  //     id,
  //     max: 2080,
  //     min: 1990,
  //     step: 1,
  //     title: "1",
  //     reducer: "main_reducer",
  //     type: "year",
  //     topLabel: "And ended in",
  //   },
  // }

  // const periodSliders = _.range(periods + 1).map((d: any, i: number) => {
  //   const minYear = instance[`year${i - 1}`] ? instance[`year${i - 1}`] : 1990
  //   const selectedAge = instance[`year${i}`] - 1988
  //   return {
  //     sliderLeft: {
  //       bottomLabel: `at age ${selectedAge}`,
  //       childId: `year${i}`,
  //       id,
  //       max: 2080,
  //       min: minYear,
  //       step: 1,
  //       title: "1",
  //       reducer: "main_reducer",
  //       type: "year",
  //       topLabel: i === 0 ? "I started in" : "It changed in",
  //     },
  //     sliderRight: {
  //       bottomLabel: `Before taxes, per year}`,
  //       childId: `value${i}`,
  //       id,
  //       max: 300000,
  //       min: 1000,
  //       step: 1000,
  //       title: "1",
  //       reducer: "main_reducer",
  //       type: "year",
  //       topLabel: i === 0 ? "Earning" : "To Earning",
  //     },
  //   }
  // })

  //   return {
  //     //add the edit details to the final data object
  //     ...data,
  //     editProps: {
  //       ...editProps,
  //       periodSliders,
  //     },
  //   }
  // }

  return data
}
