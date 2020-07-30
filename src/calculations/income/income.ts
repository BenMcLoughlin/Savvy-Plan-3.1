import { getdFirstIncomeStreamsObject, getSecondIncomeStreamsObject } from "calculations/income/create/createIncomeObject"
import { getIncomeArrayForChart } from "calculations/income/create/createChartArray"
import { getAfterTaxIncomeStreams } from "calculations/income/tax/tax.function"
import * as I from 'calculations/income/types'

export const calculateIncome = (state: I.state) => {
  const { user1BirthYear, user1LifeSpan, maritalStatus } = state.user_reducer
  const { selectedAccount } = state.ui_reducer

  let yearFirst: any = user1BirthYear + 18 // Our chart begins when the youngest of the two users turns 18, if user is single we just use their values
  let yearLast: any = user1BirthYear + user1LifeSpan //Our chart ends whent the oldest of the users dies,
  let users = [1] //To build a single users income stream we will just use the number 1 in the below for loop, but if they're married we need to do it for both of them

  if (maritalStatus === "married" || maritalStatus === "commonlaw") {
    //IF the user is married we need to compare to find the earliest and latest values
    const { user2BirthYear, user2LifeSpan } = state.user_reducer
    users = [1, 2] //this array will be mapped through to create values for both users
    if (user2BirthYear < user1BirthYear) yearFirst = user2BirthYear + 18
    if (user1LifeSpan < user2LifeSpan) yearLast = user2BirthYear + user2LifeSpan
  }

  //we begin by building an object with all incoem values the user has inputted, the object has income information for each year, these values are used to calculate pensoins
  const firstIncomeObject: I.incomeObject = getdFirstIncomeStreamsObject(state, yearFirst, yearLast, users)

  //next we build a second income object and add in pensions, these are based on the first object
  let secondIncomeObject: I.incomeObject = getSecondIncomeStreamsObject(firstIncomeObject, state, yearFirst, yearLast, users)

  // if (selectedAccount === "afterTax") {
  //   secondIncomeObject = getAfterTaxIncomeStreams(firstIncomeObject, state, yearFirst, yearLast, users)
  // }

  const incomeArrayForChart = getIncomeArrayForChart(state, secondIncomeObject)
//console.log('incomeArrayForChart:', incomeArrayForChart)
  return incomeArrayForChart
}

//Time Test
// const START_TIME = new Date().getTime()
// const END_TIME = new Date().getTime()
//  const function_duration = END_TIME - START_TIME
// console.log("incomeArrayForChart:", incomeArrayForChart)
// console.log("duration:", function_duration)
