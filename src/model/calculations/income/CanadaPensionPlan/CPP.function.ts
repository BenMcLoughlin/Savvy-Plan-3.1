//This calculation follows this article https://retirehappy.ca/how-to-calculate-your-cpp-retirement-pension/
// and this article https://retirehappy.ca/enhanced-cpp/
import { historicYmpe, fiveYearYMPE, YMPE } from "model/calculations/income/CanadaPensionPlan/CPP.data"
import { getSAAPE, getFAAPE, adjustCpp, sumArray, sumPensionableEarnings, adjustOas } from "model/calculations/income/CanadaPensionPlan/CPP.helpers"

import * as I from 'model/calculations/income/types'

export const getCpp = (income: I.incomeObject, user: I.owner, { user_reducer }): number => {

  const birthYear = user_reducer[`${user}BirthYear`]
  const cppStartAge = user_reducer[`${user}CppStartAge`]

  let APE_array = [] //Adjusted Pensionable earnings, earnings will be adjusted for inflation and placed here
  let FAAPE_array = [] //first adjusted additional pensionable earnings, this is a top up 
  let SAAPE_array = [] //second adjusted additional pensionable earnings, between 59k and 69k

  const finalCPPAge = cppStartAge < 70 ? cppStartAge : 70
  const contributoryPeriod = finalCPPAge - 18

  const APE_object = {}
  for (let year = +birthYear + 18; year < +birthYear + finalCPPAge; year++) {

    const UPE = income[year][user].totalCppIncome
    const adjustmentFactor = UPE / historicYmpe[year] || UPE / YMPE
    const adjustmentRate = adjustmentFactor >= 1 ? 1 : adjustmentFactor
    const APE = adjustmentRate * fiveYearYMPE
    const FAAPE = year >= 2019 ? getFAAPE(year, APE) : 0
    const SAAPE = year > 2024 ? getSAAPE(UPE) : 0

    APE_object[year] = {
      UPE, 
      APE,
      SAAPE
    }

    APE_array.push(APE)
    FAAPE_array.push(FAAPE)
    SAAPE_array.push(SAAPE)
  }

  //console.log('JSON.stringify(APE_object,null,4):', JSON.stringify(APE_object,null,4))

  const TAPE = sumPensionableEarnings(APE_array, contributoryPeriod)

  const AMPE = (TAPE / (contributoryPeriod - 8)) * 0.25

  const TFAAPE = (sumArray(FAAPE_array) / 40) * 0.0833

  const TSAAPE =  (sumArray(SAAPE_array) / 40) * 0.3333

  const benefit = AMPE + TFAAPE + TSAAPE

  const adjustedBenefit = adjustCpp(benefit, cppStartAge)

  return adjustedBenefit
}


export const getOas = (user: I.owner, {user_reducer}) => {
 const oasStartAge = user_reducer[`${user}OasStartAge`]
 return adjustOas(7200, oasStartAge)
}