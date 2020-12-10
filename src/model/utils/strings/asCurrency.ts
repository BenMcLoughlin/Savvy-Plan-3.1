/** asCurrency
 * takes a number and formats it as currency displayed to the user.
 * If the number is above 1 million it will make it 1m, if it is over 1000 it will make it 1k
 *@param number
 *@returns a string
 **/

export const asCurrency = (n: number): string => {
  const round = (n, p) => Math.round(n / p) * p

  if (n) {
    return n < 1000
      ? `${round(n, 10)}`
      : n < 20000 //20,000
      ? `${round(n, 100) / 1000} k`
      : n < 1000000 //1,000,000
      ? `${round(n, 1000) / 1000} k`
      : n < 10000000 //10,000,000
      ? `${round(n, 10000) / 1000000} M`
      : n < 100000000 //100,000,000
      ? `${round(n, 100000) / 1000000} M`
      : n < 1000000000 //1, 000,000,000
      ? `${round(n, 10000000) / 100000000} B`
      : "Number is too large"
  }
}
