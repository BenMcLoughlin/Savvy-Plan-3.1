//This calculation follows this article https://retirehappy.ca/how-to-calculate-your-cpp-retirement-pension/
// and this article https://retirehappy.ca/enhanced-cpp/
import { historicYmpe, fiveYearYMPE, YMPE } from "model/calculations/income/CanadaPensionPlan/CPP.data"
import { getSAAPE, getFAAPE, adjustCpp, sumArray, sumPensionableEarnings, adjustOas } from "model/calculations/income/CanadaPensionPlan/CPP.helpers"
import * as I from "model/types"
import { userInfo } from "os"

export const cpp = (user: I.user, { yearRange: income, state: { user_reducer } }: I.a): I.objects => {

  const { birthYear } = user_reducer[user]
  const { cppStartAge } = user_reducer[user]

  const APE_array = [] //Adjusted Pensionable earnings, earnings will be adjusted for inflation and placed here
  const FAAPE_array = [] //first adjusted additional pensionable earnings, this is a top up
  const SAAPE_array = [] //second adjusted additional pensionable earnings, between 59k and 69k

  const finalCPPAge = cppStartAge < 70 ? cppStartAge : 70
  const contributoryPeriod = finalCPPAge - 18

  const APE_object = {}
  for (let year = +birthYear + 18; year < +birthYear + finalCPPAge; year++) {
    const UPE = income[year][user].cppEligible
    const adjustmentFactor = UPE / historicYmpe[year] || UPE / YMPE
    const adjustmentRate = adjustmentFactor >= 1 ? 1 : adjustmentFactor
    const APE = adjustmentRate * fiveYearYMPE
    const FAAPE = year >= 2019 ? getFAAPE(year, APE) : 0
    const SAAPE = year > 2024 ? getSAAPE(UPE) : 0

    APE_object[year] = {
      UPE,
      APE,
      SAAPE,
    }

    APE_array.push(APE)
    FAAPE_array.push(FAAPE)
    SAAPE_array.push(SAAPE)
  }

  //console.log("JSON.stringify(APE_object,null,4):", JSON.stringify(APE_object, null, 4))

  const TAPE = sumPensionableEarnings(APE_array, contributoryPeriod)

  const AMPE = (TAPE / (contributoryPeriod - 8)) * 0.25

  const TFAAPE = (sumArray(FAAPE_array) / 40) * 0.0833

  const TSAAPE = (sumArray(SAAPE_array) / 40) * 0.3333

  const benefit = AMPE + TFAAPE + TSAAPE

  const adjustedBenefit = adjustCpp(benefit, cppStartAge)

  return { cpp: adjustedBenefit > 0 ? adjustedBenefit : 0 }

}

export const oas = (user: I.user, { state: { user_reducer }}: I.a): I.objects => {
  const { oasStartAge } = user_reducer[user]
  const returnValue = adjustOas(7200, oasStartAge)
  return { oas: returnValue } 
}
