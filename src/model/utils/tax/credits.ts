import * as cra from "data/cra"
import * as I from "model/types"

/**  basicCredits
 * every Canadian gets 5 basic tax credits which must be accounted for when calculating taxes
 *@param income the users income fot that year
 *@param government the government for which you'd like to get the credits, can be federal or provincial
 *@returns a number which is the value of the credit
 **/

export const credits = (income: number, government: I.government): number => {
  const { basicPersonal } = cra.values[government] //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant

  const { cppContributions, eiPremiums } = cra.values.federal

  let employmentAmount = 0
  if (government === "federal") employmentAmount = cra.values.federal.employmentAmount

  const totalCredits = basicPersonal + cppContributions + eiPremiums + employmentAmount

  const lowestRate = cra.rates[government][1].rate

  return totalCredits * lowestRate
}
