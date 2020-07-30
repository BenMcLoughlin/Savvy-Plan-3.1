import { beforePensionIncome } from "calculations/income/support/beforePensionIncome"
import { getdFirstIncomeStreamsObject, getSecondIncomeStreamsObject } from "calculations/income/create/createIncomeObject"
import { getIncomeArrayForChart } from "calculations/income/create/createChartArray"
import { getAfterTaxIncomeStreams } from "calculations/income/tax/tax.function"
import * as I from "types"


export const calculateIncome = (state: I.state) => {

  const { user1BirthYear, user1LifeSpan, maritalStatus } = state.user_reducer
  const { selectedAccount } = state.ui_reducer

  let yearFirst = user1BirthYear + 18 // Our chart begins when the youngest of the two users turns 18
  let yearLast = user1BirthYear + user1LifeSpan //Our chart ends whent the oldest of the users dies
  let userNumber = [1] //To build a single users income stream we will just use the number 1 in the below for loop, but if they're married we need to do it for both of them

  if (maritalStatus === "married" || maritalStatus === "commonlaw") {
    //IF the user is married we need to compare to find the earliest and latest values
    const { user2BirthYear, user2LifeSpan } = state.user_reducer
    userNumber = [1, 2]
    if (user2BirthYear < user1BirthYear) yearFirst = user2BirthYear + 18
    if (user1LifeSpan < user2LifeSpan) yearLast = user2BirthYear + user2LifeSpan
  }

  const firstIncomeObject = getdFirstIncomeStreamsObject(state, yearFirst, yearLast, userNumber)

  let secondIncomeObject = getSecondIncomeStreamsObject(firstIncomeObject, state, yearFirst, yearLast, userNumber)

  if (selectedAccount === "afterTax") {
    secondIncomeObject = getAfterTaxIncomeStreams(firstIncomeObject, state, yearFirst, yearLast, userNumber)
  }

  const incomeArrayForChart = getIncomeArrayForChart(state, secondIncomeObject)



  return incomeArrayForChart
}

//Time Test
// const START_TIME = new Date().getTime()
// const END_TIME = new Date().getTime()
//  const function_duration = END_TIME - START_TIME
// console.log("incomeArrayForChart:", incomeArrayForChart)
// console.log("duration:", function_duration)
