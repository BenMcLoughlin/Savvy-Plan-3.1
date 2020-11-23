import _ from "lodash"
import * as I from "model/types"

/**
 * takes state and will return an array of years from when the youngest user is 18 to 95
 * @param {state} uses state to get the range
 * @returns [2007,2008,2009]
 */

export const years = ({ ui_reducer: { chartStartYear, chartEndYear } }: I.state): number[] => _.range(chartStartYear, chartEndYear)
