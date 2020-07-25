//Calculations are written using this guide: https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-calculation-sheets.html
import { ccbRates } from "calculations/income/CanadaChildBenefit/CCB.data"
import { adjustByCraIndex } from "calculations/income/data/CRAIndexRates_data"
import * as I from "calculations/income/CanadaChildBenefit/CCB.types"

//Step 1. Find the range of years that the user has eligible children

/**
 * calculateYearRange determines the range of years for which the user could be collecting the benefit, from when the first child is born to when the youngest child turns 17
 **/

const calculateYearRange = (state: I.state) => {
  const { user_reducer } = state

  const kidsIdArray = Object.keys(user_reducer).filter(d => d.startsWith("child")) //every time a new child is added a value of "child1BirthYear" is added to the user_reducer, the number changes, this collects all the children added with their user ids
  const kidsBirthYearArray = kidsIdArray.map(d => user_reducer[d])
  const yearFirstChildBorn = user_reducer[kidsIdArray[0]] //this uses the key "child1BirthYear" to find the year of the first child
  const yearLastChildLeaves = user_reducer[kidsIdArray[kidsIdArray.length - 1]] + 17 //finds the year of the last child and 1dds 17 for when they are no longer eligable
  return { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray }
}

//Step 2. Determine Maximum benefit payable from which the reduction will be applied

/**
 * receives an array of the childrens birth years and a currently selected year, then creates a new array of their ages at the current year
 * then multiplies the children under 6 by their eligible benefit and does the same for those between 6 and 17, its a different amount per child according to their age
 * returns the total benefit before reductions
 **/

const calculateBenefitBeforeReduction = (kidsBirthYearArray: I.kidsBirthYearArray, year: I.year) => {
  //find ages of children at this given year
  const agesThisYear = kidsBirthYearArray.map(d => year - d)

  const under6 = agesThisYear.filter(d => d <= 6 && d > 0).length * ccbRates.under6Benefit //mulitiply the number of children under 6 by the benefit for those childre, eg 2 kids x $6765
  const between6And17 = agesThisYear.filter(d => d > 6 && d <= 17).length * ccbRates.between6And17Benefit

  const beforeAdjustment = under6 + between6And17

  return adjustByCraIndex(beforeAdjustment)[year] //this value is adjusted according to the CRA inflation index, adjustByCraIndex returns on object of years, we just grab the year we're currently working on
}

//Step 3. Calculate the Family Net income, the income of both users, which is used to determine how much the benefit will be reduced

/**
 * calculateAdjustedFamilyNetIncome receives an object that has the combined earnings per year, then sums up all the income for that year
 **/
const calculateAdjustedFamilyNetIncome = (combinedIncome_object: I.combinedIncome_object, year: I.year) => {
  const arrayOfIncome = Object.values(combinedIncome_object[year])
  return arrayOfIncome.length > 0 ? arrayOfIncome.reduce((acc: any, num: any) => acc + num) : 0
}

//Step 4. determine how much will be removed from the total benefit based on the users income
/**
 *   calculateReduction is the workhorse of this function, it takes the income and determines the reduction to the main benefit
 **/

const calculateReduction = (adjustedFamilyNetIncome: number, kidsBirthYearArray: I.kidsBirthYearArray, year: I.year) => {
  const agesThisYear = kidsBirthYearArray.map(d => year - d).filter(d => d > 0 && d <= 17).length
  const numberOfChildren = agesThisYear < 5 ? agesThisYear : 4 //if the number of children is above 4 we'll just use the number 4 to grab the max value from CCB rates
  //if income is under 31,000 there is no reductiona
  if (adjustedFamilyNetIncome < ccbRates.threshold1) return 0
  //if income is above 31,000 and below $69,000 then the reduction is calculated using step 2 of the form, look at that to understand below
  else if (adjustedFamilyNetIncome > ccbRates.threshold1 && adjustedFamilyNetIncome < ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - adjustByCraIndex(ccbRates.threshold1)[year]

    return incomeAboveThreshold * ccbRates[numberOfChildren].r1
  } else if (adjustedFamilyNetIncome > ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - adjustByCraIndex(ccbRates.threshold2)[year]

    console.log(incomeAboveThreshold * ccbRates[numberOfChildren].r2 + adjustByCraIndex(ccbRates[numberOfChildren].c)[year])
    return incomeAboveThreshold * ccbRates[numberOfChildren].r2 + adjustByCraIndex(ccbRates[numberOfChildren].c)[year]
  }
}

//Step 5. calculateCCB wraps it all together

/**
 *   Primary function that takes an object with all the users combined income along with state. It uses state to get the childrens birth years
 *  then calculates what the Canada Child Benefit will be for each year. It then returns an object with the Canada Child Benefit added to each year.
 **/
export const calculateCCB = (combinedIncome_object: I.combinedIncome_object, state: I.state) => {
  const incomeWithCCB = { ...combinedIncome_object }
  //determine range of years the user will collect income
  const { yearFirstChildBorn, yearLastChildLeaves, kidsBirthYearArray } = calculateYearRange(state)

  //loop through years to determine benefit
  for (let year = yearFirstChildBorn; year <= yearLastChildLeaves; year++) {
    //determine total Benefit before reduction
    const benefitBeforeReduction = calculateBenefitBeforeReduction(kidsBirthYearArray, year)

    //determine total adjusted family net income which will be used to determine reduction
    const adjustedFamilyNetIncome = calculateAdjustedFamilyNetIncome(combinedIncome_object, year)

    const reduction = calculateReduction(adjustedFamilyNetIncome, kidsBirthYearArray, year)

    const netBenefit = benefitBeforeReduction - reduction

    incomeWithCCB[year] = { ...combinedIncome_object[year], netBenefit }
  }

  return incomeWithCCB
}
