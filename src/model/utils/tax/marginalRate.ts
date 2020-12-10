import * as tax from "model/utils/tax"

/**  marginalRate
 * gets the marginal tax rate for the user of both federal and provincial taxes combined
 *@param income
 *@returns a percentage which is the marginal rate
 **/

export const marginalRate = (income: number): number => {
  const federalTaxes = tax.payable(income, "federal")
  const provincialTaxes = tax.payable(income, "britishColumbia")

  return (federalTaxes + provincialTaxes) / income
}
