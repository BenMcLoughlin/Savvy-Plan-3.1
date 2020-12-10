import * as I from "model/types"

/** sumArray
* sums an array of numbers
 *@param array
 *@returns number, total 
**/ 

export const sumArray = (array: number[]): number  => array.reduce((a: number, n: number) => a + n, 0)
