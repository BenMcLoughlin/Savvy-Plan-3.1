import * as I from "model/types"
/** getValue
 * finds the value for the current year by searching the periods
 * Searchs to check if the given year is between the start and endValues, if so it will return the value
 *@param stream the specific stream it is looking at
 *@param year the year for which it is checking
 *@param flow if the person is getting money in = "in'", or giving money away = 'out'
 *@returns a number, eg 4000
 **/

interface getValue {
  (stream: I.stream, year: number, flow: "in" | "out"): number
}

export const getValue: getValue = function (stream, year, flow = "in") {
  const now = new Date().getFullYear()
  if (!stream) {
    return 0
  }
  if (stream.streamType === "savings" && flow === "out" && year === now) {
    return stream.currentValue
  }
  if (stream.streamType === "savings" && year < now) {
    return 0
  }
  return Math.max(...Object.values(stream[flow]).map((d: I.period) => (d.start <= year && d.end > year ? d.value : 0)))
}
