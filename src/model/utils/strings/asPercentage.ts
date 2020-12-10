
/** asPercentage
* takes a number and formats it as percentage displayed to the user
* If the number is below .1 it will add decimal points, otherwise it is rounded
 *@param number
 *@returns string eg 2.34% or 39%
**/ 

export const asPercentage = (number: number): string => {
  if (number <= 0.1) {
    return `${(number * 100).toFixed(2)}%`
  }
  if (number <= 2) {
    return `${(number * 100).toFixed()}%`
  }
  if(number > 2) {
     return "NAP, not a percentage"
  }

}
