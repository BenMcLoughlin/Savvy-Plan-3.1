
/** year
* used to determine if it is a valid year
 *@param number
 *@returns boolean if the number is between 1932 and this year
**/ 
  

export const year = (year: number): boolean => year > 1932 && year < new Date().getFullYear() - 10


/** childYear
* used to determine if it is a valid year for the user to have had a child
 *@param number
 *@returns boolean if the number is between 1972 and 2030
**/ 

export const childYear = (year: number): boolean => year > 1972 && year < 2030