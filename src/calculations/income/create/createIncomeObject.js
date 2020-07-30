import { getYearRange } from "calculations/income/CanadaChildBenefit/CCB.helpers"
import { getCcbBenefit } from "calculations/income/CanadaChildBenefit/CCB.function"
import { getCpp, getOas } from "calculations/income/CanadaPensionPlan/CPP.function"
import { getIncomeStreams, sumObjects } from "calculations/income/create/create.helpers"

const getAfterTax = totalIncome => totalIncome
const getAverageTaxRate = totalIncome => totalIncome

export const getdFirstIncomeStreamsObject = (state, yearFirst, yearLast, userNumber) => {
  const income = {}

  for (let year = yearFirst; year <= yearLast; year++) {
    userNumber.map(n => {
      const incomeStreams = getIncomeStreams(state, `user${n}`, year, "")
      const incomeStreamsTaxable = getIncomeStreams(state, `user${n}`, year, "getTaxable")
      const incomeStreamsForCpp = getIncomeStreams(state, `user${n}`, year, "getCpp")
      const totalIncome = sumObjects(incomeStreamsForCpp)
      const totalTaxableIncome = sumObjects(incomeStreamsForCpp)
      const totalCppIncome = sumObjects(incomeStreams)
      const taxableIncome = getAfterTax(totalTaxableIncome)
      // const averageTaxRate = getAverageTaxRate(totalIncome)
      return (income[year] = {
        ...income[year],
        [`user${n}`]: {
          incomeStreams,
          incomeStreamsForCpp,
          totalIncome,
          totalCppIncome,
          // taxableIncome,
          // averageTaxRate
        },
      })
    })
  }
  return income
}

export const getSecondIncomeStreamsObject = (income, state, yearFirst, yearLast, userNumber) => {
  const { user_reducer } = state

  const user1CppBenefit = getCpp(income, "user1", state)
  const user2CppBenefit = getCpp(income, "user2", state)
  const user1OasBenefit = getOas("user1", state)
  const user2OasBenefit = getOas("user2", state)

  const { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray } = getYearRange(state)

  for (let year = yearFirst; year <= yearLast; year++) {
    const ccbBenefit = year >= yearFirstChildBorn && year <= yearLastChildLeaves ? getCcbBenefit(income, kidsBirthYearArray, year) : 0

    userNumber.map(n => {
      const age = year - user_reducer[`user${n}BirthYear`]
      const incomeStreams = (income[year] = {
        ...income[year],
        [`user${n}`]: {
          ...income[year][`user${n}`],
          incomeStreams: {
            ...income[year][`user${n}`].incomeStreams,
            ccbBenefit,
            [`user${n}CppBenefit`]: age < user_reducer[`user${n}CppStartAge`] ? 0 : n === 1 ? user1CppBenefit : n === 2 ? user2CppBenefit : 0,
            [`user${n}OasBenefit`]: age < user_reducer[`user${n}OasStartAge`] ? 0 : n === 1 ? user1OasBenefit : n === 2 ? user2OasBenefit : 0,
            year,
          },
        },
      })
      return incomeStreams
    })
  }

  return income
}
