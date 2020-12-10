import * as I from "model/types"

export const afterTaxIncome = (income: I.n, federalTaxes: I.n, provincialTaxes: I.n, federalCredits: I.n, provincialCredits: I.n): I.n => {
  return income - (federalTaxes + provincialTaxes) + federalCredits + provincialCredits
}
