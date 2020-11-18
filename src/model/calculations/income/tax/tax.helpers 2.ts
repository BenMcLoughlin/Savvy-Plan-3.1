import { taxes } from "calculations/income/tax/tax.data"
import * as I from "calculations/income/types"

export const getTax = (income: number, government: I.government) => {
  const { rate, constant }: any = Object.values(taxes[government]).find((d: any): any => income >= d.bot && income < d.top) //find the object that contains the bracket details the income fits into
  const tax = income * rate - constant
  return tax //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
}

export const getBasicCredits = (income: number, government: I.government) => {
  const { basicPersonal } = taxes[government] //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant

  const { cppcontributes, eiPremiums } = taxes
  let employmentAmount = 0
  if (government === "federal") employmentAmount = taxes.employmentAmount

  const totalCredits = basicPersonal + cppcontributes + eiPremiums + employmentAmount

  const lowestRate = taxes[government][1].rate

  return totalCredits * lowestRate
}

export const getAfterTaxIncome = (income, federalTaxes, provincialTaxes, federalCredits, provincialCredits) => {
  return income - (federalTaxes + provincialTaxes) + federalCredits + provincialCredits
}

export const getTaxRate = (income: number) => {
  const federalTaxes = getTax(income, "federal")
  const provincialTaxes = getTax(income, "britishColumbia")
  const federalCredits = getBasicCredits(income, "federal")
  const provincialCredits = getBasicCredits(income, "britishColumbia")

  const afterTaxIncome = getAfterTaxIncome(income, federalTaxes, provincialTaxes, federalCredits, provincialCredits)
  const taxRate = (income - afterTaxIncome) / income

  return taxRate
}
