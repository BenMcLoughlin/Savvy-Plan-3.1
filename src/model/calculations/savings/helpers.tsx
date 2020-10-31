import { getAllByAltText } from "@testing-library/react"

import { payment } from "model/services/financialFunctions"
import { useCallback } from "react"

export const getOptimimWithdrawal = (savingsObject, set, state, streamType) => {
  const birthYear = state.user_reducer.user1.birthYear
  const retirementAge = 65
  const retirementYear = +birthYear + +retirementAge
  console.log("retirementYear:", retirementYear)
  const retirementPV = savingsObject[retirementYear].user1.tfsa.total
  return payment(0.04, 30, retirementPV, 0, null)
}
