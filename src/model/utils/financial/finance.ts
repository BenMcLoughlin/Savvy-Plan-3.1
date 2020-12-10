/**
 * Returns a present value from a series of uneven cashflows
 * @param {Array} [array] The array of cashflows
 * @param {rate} rate interest rate the cashflows are expected to earn
 */

//Present Value of Cashflows
export const PVoCF = (values, r, findBy) => values.reduce((a, n, i) => a + n / (1 + r) ** (i + 1), 0)

/**
 * Returns a present value from a series of uneven cashflows when an array of objects is provided
 * @param {Array} [array] The array of cashflows in object form
 * @param {rate} rate interest rate the cashflows are expected to earn
 * @param {retYear} retirementYear the year the user will begin drawing income
 * @param {filterBy} filterBy the value within the object you are looking to sum
 */

export const PVoChartCF = (values, r, retYear, filterBy) => {

  return values.reduce((a, n, i) => a + (n.year > retYear ? n[filterBy] / (1 + r) ** (i + 1) : 0), 0)
}