import * as I from "model/types"
import { YMPE, fiveYearYMPE, secondYMPE } from "model/calculations/income/CanadaPensionPlan/CPP.data"

export const getSAAPE = (UPE: I.n): I.n => {
  const ympeAdjustment = fiveYearYMPE / YMPE
  if (UPE <= YMPE) return 0
  if (UPE > YMPE && UPE < secondYMPE) return (UPE - YMPE) * ympeAdjustment
  return (secondYMPE - YMPE) * ympeAdjustment
}

export const getFAAPE = (year: I.n, APE: I.n): I.n =>
  year < 2019 ? 0 : year === 2019 ? APE * 0.15 : year === 2020 ? APE * 0.3 : year === 2021 ? APE * 0.5 : year === 2022 ? APE * 0.75 : year > 2022 ? APE * 1 : 0

export const adjustCpp = (benefit: I.n, cppStartAge: I.n): I.n => {
  if (cppStartAge < 65) {
    //If Income is less than 65 it is reduced by 7.2% per year
    const years = 65 - cppStartAge
    const percentage = years * 0.072
    const value = benefit * (1 - percentage)
    return value
  }
  if (cppStartAge === 65) {
    return benefit
  } //If age is 65 it is the amount originally calculatied
  if (cppStartAge > 65) {
    //If age is over 65 income is increased by 7.2% per year
    const years = cppStartAge - 65
    const percentage = years * 0.072
    const value = benefit * (1 + percentage)
    return value
  }
}

export const sumArray = (array: I.n[]): I.n => {
  if (array.length > 0) {
    return array.reduce((a: any, n: any) => a + n)
  }
  return 0
}

export const sumPensionableEarnings = (array: I.n[], contributoryPeriod: I.n): I.n => {
  if (array.length > 0) {
    return array
      .sort()
      .slice(8, contributoryPeriod)
      .reduce((acc, num) => acc + num)
  }
  return 0
}

export const adjustOas = (benefit: I.n, oasStartAge: I.n): I.n => {
  if (oasStartAge === 65) {
    return benefit
  } //If age is 65 it is the amount originally calculatied
  if (oasStartAge > 65) {
    //If age is over 65 income is increased by 7.2% per year
    const years = oasStartAge - 65
    const percentage = years * 0.072
    const value = benefit * (1 + percentage)
    return value
  }
}
