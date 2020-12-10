import * as I from "model/types"

export const ageAtSelectedYear = (startYear: number, birthYear: number):I.a | string => {
  if (startYear > birthYear) return startYear - birthYear
  return "-"
}

export const round = (number: I.n): I.a => {
  if (number !== undefined && number <= 1000000) return `${(Math.round(number / 1000) * 1000) / 1000} k`
  if (number > 1000000) return `${(Math.round(number / 10000) * 10000) / 1000000} M`
  return null
}


export const formatCurrency = (number: I.n): string => {
  if (number < 100000) {
    return `${number / 1000} `
  }
  if (number >= 100000) {
    return `${number / 1000} K`
  }
}
