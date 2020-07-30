import { getYearRange } from "calculations/income/CanadaChildBenefit/CCB.helpers"
import { getCcbBenefit } from "calculations/income/CanadaChildBenefit/CCB.function"
import { getCpp, getOas } from "calculations/income/CanadaPensionPlan/CPP.function"
import { getIncomeStreams, sumObjects } from "calculations/income/create/create.helpers"
import * as I from 'calculations/income/types'

const getAfterTax = totalIncome => totalIncome
const getAverageTaxRate = totalIncome => totalIncome

export const getdFirstIncomeStreamsObject = (state: I.state, yearFirst: I.year, yearLast: I.year, users: number[]): I.incomeObject => {
  
  const income = {} //initialize an empty object which values will be passed into

  for (let year = yearFirst; year <= yearLast; year++) { // loop through year youngest turns 18 to year oldest dies
    users.map(n => {//for each user we will create an object with their income details
      const incomeStreams = getIncomeStreams(state, `user${n}`, year, "") //creates an object showing all incoem streams, used to sum income
      const incomeStreamsForCpp = getIncomeStreams(state, `user${n}`, year, "getCpp") //ctreates an object of only CPP eligible income
      const totalIncome = sumObjects(incomeStreams) 
      const totalCppIncome = sumObjects(incomeStreamsForCpp)

      // const averageTaxRate = getAverageTaxRate(totalIncome)
      return (income[year] = {
        ...income[year],
        [`user${n}`]: {
          incomeStreams,
          incomeStreamsForCpp,
          totalIncome,
          totalCppIncome,
        },
      })
    })
  }
  return income
}

export const getSecondIncomeStreamsObject = (income: I.incomeObject, state: I.state, yearFirst: I.year, yearLast: I.year, users: number[]): I.incomeObject => {
  const { user_reducer } = state

  const user1CppBenefit = getCpp(income, "user1", state) //we want to calculate the CPP benefit once becuase it is a heavy function
  const user2CppBenefit = getCpp(income, "user2", state)
  const user1OasBenefit = getOas("user1", state) //same with CCB, these are caluculated and will be added below in the for loop
  const user2OasBenefit = getOas("user2", state)

  const { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray } = getYearRange(state) //these values will be used in CCB calculation but are just grabbed once here

  for (let year = yearFirst; year <= yearLast; year++) {
    const ccbBenefit = year >= yearFirstChildBorn && year <= yearLastChildLeaves ? getCcbBenefit(income, kidsBirthYearArray, year) : 0 //only want CCB added for eligible years

    users.map(n => {
      const age = year - user_reducer[`user${n}BirthYear`] //grab the users age to check if CCP should be added
      let incomeStreams = (income[year] = { //createing a new income streams object where pension incoem will be added
        ...income[year],
        [`user${n}`]: {// example is user1
          ...income[year][`user${n}`],
          incomeStreams: {
            ...income[year][`user${n}`].incomeStreams,
            ccbBenefit,
            [`user${n}CppBenefit`]: age < user_reducer[`user${n}CppStartAge`] ? 0 : n === 1 ? user1CppBenefit : n === 2 ? user2CppBenefit : 0, // adds corrosponding CPP
            [`user${n}OasBenefit`]: age < user_reducer[`user${n}OasStartAge`] ? 0 : n === 1 ? user1OasBenefit : n === 2 ? user2OasBenefit : 0,
            year,
          },
        },
      })
      return incomeStreams
    })
    users.map(n => {
      let incomeStreams = (income[year] = {
        ...income[year], [`user${n}`]: {
          ...income[year][`user${n}`], totalIncome: sumObjects(income[year][`user${n}`].incomeStreams) //sums the income
        }
      })
      return incomeStreams
    })
  }
  return income
}
