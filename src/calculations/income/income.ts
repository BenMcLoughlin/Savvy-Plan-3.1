import { beforePensionIncome } from "calculations/income/support/beforePensionIncome"
import { calculateCCB } from "calculations/income/CanadaChildBenefit/CCB.function"
import _ from "lodash"

// import {tfsaIncome, rrspIncome } from "calculations/income/savingsIncome"

const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: _.omit(item, ["year", "age"]), //ensures that year and age are not included in the income
    }
  }, initialValue)
}

export const calculateIncome = state => {
  const START_TIME = new Date().getTime()

  const user = state.ui_reducer.selectedUser
  const { hasChildren } = state.user_reducer

  //Step 1. Determine the users Regular Income

  const regularIncome = beforePensionIncome(user, state)

  const combinedIncome_object = convertArrayToObject(beforePensionIncome("combined", state), "year")

  //Step 2: Determine income when Canada Child Benefit is added
  let incomeWithCCB = {}

  if (hasChildren === "yes" || hasChildren === "hope to eventually") {
    incomeWithCCB = calculateCCB(combinedIncome_object, state)
  }
console.log('incomeWithCCB:', incomeWithCCB)
  // const array = []

  // for(let i = 0; i <= 100000000; i++) {
  //   array.push(i)
  // }

  const END_TIME = new Date().getTime()
  const function_duration = END_TIME - START_TIME
  console.log("duration:", function_duration)

  return regularIncome
  //Step 2. Determine the users Business Income

  //Step 5. Determine if the user has Canada Child Benefit Income

  //      ccbIncome(state)

  // //Step 6. Determine Users Retirement TFSA Income

  //      tfsaIncome(state)

  // //Step 7. Determine Users Retirement RRSP Income

  //      rrspIncome(state)

  // //Step 8. Determine Users Retirement Canada Pension Plan

  //      cppIncome(state)

  // //Step 9. Determine Users Old Age Security

  //      oasIncome(state)

  //Step 10. Combine all Income into one array
}
