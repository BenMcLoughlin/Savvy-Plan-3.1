import _ from "lodash"
import * as I from "model/types"

/**
 * takes state and will return an array of years from when the youngest user is 18 to 95
 * If is is building a savings array it will start the year with the current year so the chart starts at the users current position
 * @param {state} uses state to get the range
 * @returns [2007,2008,2009]
 */

export const years = ({ ui_reducer: { chartStartYear, chartEndYear } }: I.state, streamType): number[] => {
  let startYear = chartStartYear
  if (streamType === "savings") {
    startYear = new Date().getFullYear()
  }

  return _.range(startYear, chartEndYear)
}
