const emptyValues = { interest: 0, principle: 0, contribution: 0, withdrawal: 0 }

/** getLastYear
 * gets the prior year in an object of years
 * checks to see if a prior year exists, if not it returns a base case empty object otherwise it returns the previous value
 *@param state the function state from with the forcast will be retrieved
 *@param year the current year from which 1 will be subtracted to get previous year
 *@param user
 *@param streamType used to determine what base object should be set
 *@param account used to find the specific object
 *@returns lastyears value
 **/

export const getLastYear = (state, year, user, streamType, account) => {
  if (!state.forcast) {
    return streamType === "savings" ? emptyValues : emptyValues
  }
  return state.forcast[year - 1][user][account]
}
