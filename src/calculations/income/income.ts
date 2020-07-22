
import {beforePensionIncome} from "calculations/income/support/beforePensionIncome"
// import {ccbIncome, cppIncome, oasIncome } from "calculations/income/government_CCB_CPP_OAS"
// import {tfsaIncome, rrspIncome } from "calculations/income/savingsIncome"



export const calculateIncome = (state) => {

 const user = state.ui_reducer.selectedUser

  //Step 1. Determine the users Employment Income

    const array = beforePensionIncome(user, state)
 

    return array
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