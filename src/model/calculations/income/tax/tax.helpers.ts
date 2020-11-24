/* eslint-disable */
import { taxes, craValues } from "model/calculations/income/tax/tax.data"
import * as I from "model/types"

type getTax = (income: I.n, government: I.government) => I.n

export const getTax = (income: number, government: I.government): any => {
  const { rate, constant } = Object.values(taxes[government]).find((d: any) => income >= d.bot && income < d.top) //find the object that contains the bracket details the income fits into

  const tax = income * rate - constant
  return tax //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
}

export const getBasicCredits = (income: I.n, government: I.government): I.n => {
  const { basicPersonal } = craValues[government] //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant

  const { cppcontributes, eiPremiums } = craValues
  let employmentAmount = 0
  if (government === "federal") employmentAmount = craValues.employmentAmount

  const totalCredits = basicPersonal + cppcontributes + eiPremiums + employmentAmount

  const lowestRate = taxes[government][1].rate

  return totalCredits * lowestRate
}

export const getAfterTaxIncome = (income: I.n, federalTaxes: I.n, provincialTaxes: I.n, federalCredits: I.n, provincialCredits: I.n): I.n => {
  return income - (federalTaxes + provincialTaxes) + federalCredits + provincialCredits
}

export const getAvgRate = (income: I.n): I.n => {
  const federalTaxes = getTax(income, "federal")
  const provincialTaxes = getTax(income, "britishColumbia")
  const federalCredits = getBasicCredits(income, "federal")
  const provincialCredits = getBasicCredits(income, "britishColumbia")

  const afterTaxIncome = getAfterTaxIncome(income, federalTaxes, provincialTaxes, federalCredits, provincialCredits)
  const taxRate = (income - afterTaxIncome) / income

  return taxRate > 0 ? taxRate : 0
}
export const getMargRate = (income: I.n = 0): I.n => {
  const federalTaxes = getTax(income, "federal")
  const provincialTaxes = getTax(income, "britishColumbia")

  return (federalTaxes + provincialTaxes) / income
}

const indexationIncreasePerYear = {
  2010: 0.006,
  2011: 0.008,
  2012: 0.028,
  2013: 0.02,
  2014: 0.009,
  2015: 0.017,
  2016: 0.013,
  2017: 0.014,
  2018: 0.015,
  2019: 0.022,
  2020: 0.019,
  2021: 0.019,
  2022: 0.019,
  2023: 0.019,
  2024: 0.019,
  2025: 0.019,
  2026: 0.019,
  2027: 0.019,
  2028: 0.019,
  2029: 0.019,
  2030: 0.019,
  2031: 0.019,
  2032: 0.019,
  2033: 0.019,
  2034: 0.019,
  2035: 0.019,
  2036: 0.019,
  2037: 0.019,
  2039: 0.019,
  2040: 0.019,
  2041: 0.019,
  2042: 0.019,
}

export const adjustByCraIndex = (value: I.n): I.objects => {
  //the value provided must be in todays dollars
  const thisYear = new Date().getFullYear()

  let indexesOfValue = {} //this is an object that will contain years as the keys and the value indexed as the values

  //back calculate into the past converting the value into its past values
  for (let year = thisYear; year >= 2012; year--) {
    indexesOfValue = { ...indexesOfValue, [year]: year === thisYear ? value : Math.ceil(indexesOfValue[year + 1] / (1 + indexationIncreasePerYear[year + 1])) }
  }
  //forward calculate into the future estimating the future value
  for (let year = thisYear; year <= 2040; year++) {
    indexesOfValue = { ...indexesOfValue, [year]: year === thisYear ? value : Math.ceil(indexesOfValue[year - 1] * (1 + indexationIncreasePerYear[year])) }
  }
  return indexesOfValue
}
