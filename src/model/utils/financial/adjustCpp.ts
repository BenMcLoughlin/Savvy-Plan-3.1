
/** adjustCpp 
* adjusts the users cpp payment according to when they decide to take it
 *@param benefit the users cpp benefit calculated in the income forcast calculation
 *@param cppStartAge set in the user_reducer and changeable by the user
 *@returns benefit value adjusted for the time the user decides to take it
**/ 
  
export const adjustCpp = (benefit: number, cppStartAge: number): number => {
  if (cppStartAge < 65) {
    //If Income is less than 65 it is reduced by 7.2% per year
    const years = 65 - cppStartAge
    const percentage = years * 0.072
    const value = benefit * (1 - percentage)
    return value
  }
  if (cppStartAge === 65) {
    return benefit
  } //If age is 65 it is the amount originally calculatied
  if (cppStartAge > 65) {
    //If age is over 65 income is increased by 7.2% per year
    const years = cppStartAge - 65
    const percentage = years * 0.072
    const value = benefit * (1 + percentage)
    return value
  }
}
