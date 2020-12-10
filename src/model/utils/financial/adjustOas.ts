

/** adjustOas 
* adjusts the users oas payment according to when they decide to take it
 *@param benefit the users oas benefit calculated in the income forcast calculation
 *@param oasStartAge set in the user_reducer and changeable by the user
 *@returns benefit value adjusted for the time the user decides to take it
**/ 

export const adjustOas = (benefit: number, oasStartAge: number): number => {
  if (oasStartAge === 65) {
    return benefit
  } //If age is 65 it is the amount originally calculatied
  if (oasStartAge > 65) {
    //If age is over 65 income is increased by 7.2% per year
    const years = oasStartAge - 65
    const percentage = years * 0.072
    const value = benefit * (1 + percentage)
    return value
  }
}
