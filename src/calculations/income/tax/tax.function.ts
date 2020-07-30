import { FTR, PTR } from "calculations/income/tax/tax.data"
import { getTax, getTaxCredits } from "calculations/income/tax/tax.helpers"

export const getAfterTaxIncomeStreams = (income, state, yearFirst, yearLast, users) => {
  for (let year = yearFirst; year <= yearLast; year++) {
    users.map(n => {
      const incomeStreams = (income[year] = {})
      return incomeStreams
    })
  }
}

// const getTotalTaxes = (income) => {
//   const federalTaxes = getTax(income, "federal")
//   const provincialTaxes = getTax(income, "provincial")

//   const federalTaxCredits = getTaxCredits(income, "federal")
//   const provincialTaxCredits = getTaxCredits(income, "provincial")
// }
