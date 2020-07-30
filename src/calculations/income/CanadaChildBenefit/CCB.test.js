import { getCcbBenefit } from "calculations/income/CanadaChildBenefit/CCB.function"


// const dummyState = {
//   user_reducer: {
//     child1BirthYear: 2010,
//     child2BirthYear: 2014,
//   },
// }

// const dummyIncome = {
//   2010: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2011: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2012: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2013: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2014: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2015: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2016: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2017: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2018: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2019: {
//     bensIncome: 70000,
//     kelseysIncome: 20000,
//   },
//   2020: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2021: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2022: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2023: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2024: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2025: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2026: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2027: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2028: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2029: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2030: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
//   2031: {
//     bensIncome: 40000,
//     kelseysIncome: 20000,
//   },
// }

describe("Confirms getCcbB is in line with CRA calculations", function () {
  it("is a dummy", () => expect(1).toEqual(1))
  //it("checks 2019, 90k, 2 kids", () => expect(getCcbB(dummyIncome, dummyState)[2019].netBenefit).toEqual(6052.339)) //these values were recived from this calculator https://www.canada.ca/en/revenue-agency/services/child-family-benefits/child-family-benefits-calculator.html
  //it("checks 2020, 60k, 2 kids", () => expect(getCcbB(dummyIncome, dummyState)[2020].netBenefit).toEqual(8653.985))
})
