//Calculations are written using this guide: https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-calculation-sheets.html
import { ccbRates } from "calculations/income/CanadaChildBenefit/CCB.data"
import { adjustByCraIndex } from "calculations/income/data/CRAIndexRates_data"
import * as I from "calculations/income/CanadaChildBenefit/CCB.types"

export const getAdjustedFamilyNetIncome = (income, year) => income[year].user1.totalIncome + income[year].user2.totalIncome;

export const getBenefitBeforeReduction = (kidsBirthYearArray, year) => {
  //find ages of children at this given year
  const agesThisYear = kidsBirthYearArray.map((d) => year - d);

  const under6 = agesThisYear.filter((d) => d <= 6 && d > 0).length * ccbRates.under6Benefit; //mulitiply the number of children under 6 by the benefit for those childre, eg 2 kids x $6765
  const between6And17 = agesThisYear.filter((d) => d > 6 && d <= 17).length * ccbRates.between6And17Benefit;

  const beforeAdjustment = under6 + between6And17;

  return adjustByCraIndex(beforeAdjustment)[year]; //this value is adjusted according to the CRA inflation index, adjustByCraIndex returns on object of years, we just grab the year we're currently working on
};

export const getReduction = (adjustedFamilyNetIncome, kidsBirthYearArray, year) => {
  const agesThisYear = kidsBirthYearArray.map((d) => year - d).filter((d) => d > 0 && d <= 17).length;
  const numberOfChildren = agesThisYear < 5 ? agesThisYear : 4; //if the number of children is above 4 we'll just use the number 4 to grab the max value from CCB rates
  //if income is under 31,000 there is no reductiona
  if (adjustedFamilyNetIncome < ccbRates.threshold1) return 0;
  //if income is above 31,000 and below $69,000 then the reduction is calculated using step 2 of the form, look at that to understand below
  else if (adjustedFamilyNetIncome > ccbRates.threshold1 && adjustedFamilyNetIncome < ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - adjustByCraIndex(ccbRates.threshold1)[year];

    return incomeAboveThreshold * ccbRates[numberOfChildren].r1;
  } else if (adjustedFamilyNetIncome > ccbRates.threshold2) {
    const incomeAboveThreshold = adjustedFamilyNetIncome - adjustByCraIndex(ccbRates.threshold2)[year];

    return incomeAboveThreshold * ccbRates[numberOfChildren].r2 + adjustByCraIndex(ccbRates[numberOfChildren].c)[year];
  }
};

export const getCcbBenefit = (income, kidsBirthYearArray, year) => {
  const benefitBeforeReduction = getBenefitBeforeReduction(kidsBirthYearArray, year);
  const adjustedFamilyNetIncome = getAdjustedFamilyNetIncome(income, year);
  const reduction = getReduction(adjustedFamilyNetIncome, kidsBirthYearArray, year);
  const ccb = benefitBeforeReduction - reduction;
  return ccb;
};