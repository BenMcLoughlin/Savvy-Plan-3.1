import * as cra from "data/cra"
import * as I from "model/types"

export const payable = (income: number, government: I.government): number => {

  // const { rate, constant } = Object.values(cra.rates[government] as I.taxBrackets).find((d: I.taxBracket) => income >= d.bot && income < d.top) //find the object that contains the bracket details the income fits into

  //  const tax = income * rate - constant
  return 100 //tax //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
}
