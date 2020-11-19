import * as I from "model/types"
import { onboardQuestions } from "controller/questions/questions.controller"
import { store } from "index"
import { addAssumptionsText } from "controller/assumptions/text"

export const assumptions_props = (display: string, userName: string): I.a => {
  const state = store.getState()
    const {
      user1: { firstName: user1Name },
      user2: { firstName: user2Name },
    } = state.user_reducer

    const user = userName === user1Name ? "user1" : "user2"

  const { isMarried, hasChildren, changeRateAssumptions, changeRetirementAssumptions } = state.ui_reducer
  const slidersArray: I.a = []

  const askUser1 = onboardQuestions(slidersArray, "user1", addAssumptionsText)
  const askUser2 = onboardQuestions(slidersArray, "user2", addAssumptionsText)

  const askUser = user === "user1" ? "askUser1" : "askUser"

  if (display === "rates") {
    askUser1.for.rate1()
    askUser1.for.rate2()
    askUser1.for.inflationRate()
    askUser1.for.managementExpenseRatio()
  }

  if (display === "retirementFactors") {
    const askUser = onboardQuestions(slidersArray, user, addAssumptionsText)

    askUser.for.rrspStartAge()
    askUser.for.tfsaStartAge()
    askUser.for.cppStartAge()
    askUser.for.oasStartAge()
    askUser.for.lifeSpan()
  }
  return {slidersArray, user1Name, user2Name}
}
