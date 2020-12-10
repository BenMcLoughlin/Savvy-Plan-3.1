//Calculations are written using this guide: https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-calculation-sheets.html
import * as cra from "data/cra"
import * as I from "model/types"
import * as tax from "model/utils/tax"

export const getAdjustedFamilyNetIncome = (income: I.incomeForcast, year: number): number =>
  income[year].user2 ? income[year].user1.cppEligible + income[year].user2.cppEligible : income[year].user1.cppEligible

export const getBenefitBeforeReduction = (kidsBirthYearArray: number[], year: number): number => {
  //find ages of children at this given year
  const agesThisYear = kidsBirthYearArray.map(d => year - d)
  //console.log(agesThisYear)
  const under6 = agesThisYear.filter(d => d <= 6 && d > 0).length * cra.ccbRates.under6Benefit //mulitiply the number of children under 6 by the benefit for those childre, eg 2 kids x $6765
  const between6And17 = agesThisYear.filter(d => d > 6 && d <= 17).length * cra.ccbRates.between6And17Benefit

  const beforeAdjustment = under6 + between6And17

  return tax.adjustByIndex(beforeAdjustment)[year] //this value is adjusted according to the CRA inflation index, tax.adjustByIndex returns on object of years, we just grab the year we're currently working on
}

export const getReduction = (adjustedFamilyNetIncome: number, kidsBirthYearArray: number[], year: number): number => {
  const agesThisYear = kidsBirthYearArray.map(d => year - d).filter(d => d > 0 && d <= 17).length
  const numberOfChildren = agesThisYear < 5 ? agesThisYear : 4 //if the number of children is above 4 we'll just use the number 4 to grab the max value from CCB rates
  //if income is under 31,000 there is no reductiona
  if (adjustedFamilyNetIncome < cra.ccbRates.threshold1) return 0
  //if income is above 31,000 and below $69,000 then the reduction is calculated using step 2 of the form, look at that to understand below
  if (adjustedFamilyNetIncome > cra.ccbRates.threshold1 && adjustedFamilyNetIncome < cra.ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - tax.adjustByIndex(cra.ccbRates.threshold1)[year]

    return incomeAboveThreshold * cra.ccbRates[numberOfChildren].r1
  }
  if (adjustedFamilyNetIncome > cra.ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - tax.adjustByIndex(cra.ccbRates.threshold2)[year]

    return incomeAboveThreshold * cra.ccbRates[numberOfChildren].r2 + tax.adjustByIndex(cra.ccbRates[numberOfChildren].c)[year]
  }
}

export const ccb = (user: I.user, state: I.a, year: number): number => {
  const { forcast } = state
  const { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray } = getYearRange(state) //these values will be used in CCB calculation but are just grabbed once here
  if (year > yearLastChildLeaves || year < yearFirstChildBorn || !state.ui_reducer.hasChildren) {
    return 0
  }
  const benefitBeforeReduction = getBenefitBeforeReduction(kidsBirthYearArray, year)

  const adjustedFamilyNetIncome = getAdjustedFamilyNetIncome(forcast, year)
  const reduction = getReduction(adjustedFamilyNetIncome, kidsBirthYearArray, year)

  const ccb = benefitBeforeReduction - reduction

  return ccb > 0 ? ccb : 0
}

function getYearRange(state: I.state): I.objects {
  const { user_reducer } = state

  const kidsIdArray: string[] = Object.keys(user_reducer).filter(d => d.startsWith("child")) //every time a new child is added a value of "child1BirthYear" is added to the user_reducer, the number changes, this collects all the children added with their user ids

  const kidsBirthYearArray: number[] = kidsIdArray.map((d: string) => user_reducer[d])
  const yearFirstChildBorn: number = user_reducer[kidsIdArray[0]] //this uses the key "child1BirthYear" to find the year of the first child
  const yearLastChildLeaves: number = user_reducer[kidsIdArray[kidsIdArray.length - 1]] + 17 //finds the year of the last child and 1dds 17 for when they are no longer eligable

  return { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray }
}
