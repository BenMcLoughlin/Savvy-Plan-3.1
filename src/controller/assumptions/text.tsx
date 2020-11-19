import * as I from "model/types"
import { store } from "index"

export const addAssumptionsText = (textKey: string, user: I.user, n?: number): I.a => {
  const state = store.getState()
  const isUser1 = user === "user1"
  const { birthYear, firstName, rrspStartAge, tfsaStartAge, cppStartAge, oasStartAge } = state.user_reducer[user]

  const data = {
    cppStartAge: {
      bottomLabel: `in ${birthYear + cppStartAge}`,
      topLabel: "Collect CPP at age ",
    },
    oasStartAge: {
      bottomLabel: `in ${birthYear + oasStartAge}`,
      topLabel: "and start OAS at age ",
    },
    inflationRate: {
      bottomLabel: `Deducted from return`,
      topLabel: "With inflation of",
    },
    lifeSpan: {
      type: "age",
      bottomLabel: `years old`,
      topLabel: "And live until",
    },
    managementExpenseRatio: {
      bottomLabel: `Deducted from return`,
      topLabel: "A Management fee of ",
    },
    rate1: {
      bottomLabel: `Before Retirement`,
      topLabel: "I hope to get ",
    },
    rate2: {
      bottomLabel: `After Retirement`,
      topLabel: "And then",
    },
    rrspStartAge: {
      bottomLabel: `in ${birthYear + rrspStartAge}`,
      topLabel: "Start RRSP at Age ",
    },
    tfsaStartAge: {
      bottomLabel: `in ${birthYear + tfsaStartAge}`,
      topLabel: "Start TFSA At Age",
    },
  }
  return data[textKey]
}
