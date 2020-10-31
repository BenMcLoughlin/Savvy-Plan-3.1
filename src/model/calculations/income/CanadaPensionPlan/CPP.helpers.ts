import { YMPE, fiveYearYMPE, secondYMPE } from "model/calculations/income/CanadaPensionPlan/CPP.data"

export const getSAAPE = UPE => {
  const ympeAdjustment = fiveYearYMPE / YMPE
  if (UPE <= YMPE) return 0
  if (UPE > YMPE && UPE < secondYMPE) return (UPE - YMPE) * ympeAdjustment
  else return (secondYMPE - YMPE) * ympeAdjustment
}

export const getFAAPE = (year, APE) =>
  year < 2019 ? 0 : year === 2019 ? APE * 0.15 : year === 2020 ? APE * 0.3 : year === 2021 ? APE * 0.5 : year === 2022 ? APE * 0.75 : year > 2022 ? APE * 1 : 0

export const adjustCpp = (benefit, cppStartAge) => {
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

export const sumArray = array => {
  if (array.length > 0) {
    return array.reduce((a: any, n: any) => a + n)
  }
  return 0
}

export const sumPensionableEarnings = (array, contributoryPeriod) => {
  if (array.length > 0) {
    return array
      .sort()
      .slice(8, contributoryPeriod)
      .reduce((acc, num) => acc + num)
  }
  return 0
}

export const adjustOas = (benefit, oasStartAge) => {
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
