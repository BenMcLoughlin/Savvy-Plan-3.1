import * as cra from "data/cra"
import * as tax from "model/utils/tax"
import * as I from "model/types"


/**  averageRate
* calculates the average tax rate the uer is paying
 *@param income for the given year
 *@returns a percentage value of the average tax rate payable
**/ 

export const averageRate = (income: number): number => {
  const federalTaxes = tax.payable(income, "federal")
  const provincialTaxes = tax.payable(income, "britishColumbia")
  const federalCredits = tax.credits(income, "federal")
  const provincialCredits = tax.credits(income, "britishColumbia")

  const afterTaxIncome = tax.afterTaxIncome(income, federalTaxes, provincialTaxes, federalCredits, provincialCredits)
  const taxRate = (income - afterTaxIncome) / income

  return taxRate > 0 ? taxRate : 0
}
