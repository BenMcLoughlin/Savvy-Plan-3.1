import * as u from "model/utils"

export const asIncome = (name: string, user1Name?: string, user2Name?: string): string => {
  switch (name) {
    case "user1Cpp":
      return `${user1Name}'s Canada Pension Plan`
    case "user2Cpp":
      return `${user2Name}'s Canada Pension Plan`
    case "user1Rrsp":
      return `${user1Name}'s RRSP Income`
    case "user2Rrsp":
      return `${user2Name}'s RRSP Income`
    case "user1Tfsa":
      return `${user1Name}'s TFSA Income`
    case "user2Tfsa":
      return `${user2Name}'s TFSA Income`
    case "user1Nreg":
      return `${user1Name}'s Non-Registered Income`
    case "user2Nreg":
      return `${user2Name}'s Non-Registered Income`
    case "user1Oas":
      return `${user1Name}'s Old Age Security`
    case "user2Oas":
      return `${user2Name}'s Old Age Security`
    case "user1Ccb":
      return `Canada Child Benefit`
    case "rrsp":
      return `R.R.S.P`
    case "tfsa":
      return `T.F.S.A`
    case "nreg":
      return `Non-Registered Savings`
  }
  return u.startCase(name)
}
