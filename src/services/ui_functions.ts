export const ageAtSelectedYear = (startYear, birthYear) => {
  if (startYear > birthYear) return startYear - birthYear
  else return "-"
}
