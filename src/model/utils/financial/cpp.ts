//This calculation follows this article https://retirehappy.ca/how-to-calculate-your-cpp-retirement-pension/
// and this article https://retirehappy.ca/enhanced-cpp/

import * as I from "model/types"
import * as u from "model/utils"
import * as cra from "data/cra"

/** cpp
 * calculates the users potential cpp payment using the formula used be the canadian government
 *@param fnState the state of he income forcast function which includes redux state as well as the forcast of the users income by year
 *@param user
 *@returns a single number which is the estimated benefits payment at 65
 **/

export const cpp = ({ forcast: income, user_reducer }, user: I.user) => {
  if (user_reducer) {
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
      const adjustmentFactor = UPE / cra.historicYmpe[year] || UPE / cra.Ympe
      const adjustmentRate = adjustmentFactor >= 1 ? 1 : adjustmentFactor
      const APE = adjustmentRate * cra.fiveYearYmpe
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

    const TFAAPE = (u.sumArray(FAAPE_array) / 40) * 0.0833

    const TSAAPE = (u.sumArray(SAAPE_array) / 40) * 0.3333

    const benefit = AMPE + TFAAPE + TSAAPE

    const adjustedBenefit = u.adjustCpp(benefit, cppStartAge)

    return { cpp: adjustedBenefit > 0 ? +adjustedBenefit.toFixed(2) : 0 }
  }
}

function getSAAPE(UPE: I.n): I.n {
  const ympeAdjustment = cra.fiveYearYmpe / cra.Ympe
  if (UPE <= cra.Ympe) return 0
  if (UPE > cra.Ympe && UPE < cra.secondYmpe) return (UPE - cra.Ympe) * ympeAdjustment
  return (cra.secondYmpe - cra.Ympe) * ympeAdjustment
}

function getFAAPE(year: I.n, APE: I.n): I.n {
  return year < 2019
    ? 0
    : year === 2019
    ? APE * 0.15
    : year === 2020
    ? APE * 0.3
    : year === 2021
    ? APE * 0.5
    : year === 2022
    ? APE * 0.75
    : year > 2022
    ? APE * 1
    : 0
}

function sumPensionableEarnings(array: I.n[], contributoryPeriod: I.n): I.n {
  if (array.length > 0) {
    return array
      .sort()
      .slice(8, contributoryPeriod)
      .reduce((acc, num) => acc + num)
  }
  return 0
}
