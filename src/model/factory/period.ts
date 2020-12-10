import { set } from "model/redux/actions"
import * as I from "model/types"

/**  period
* creates a new period object and inserts it into stream
 *@param flow 'in' or 'out' the financial flow of the period being added, income is in, spending is out
 *@param id id of the stream being added too
 *@param stream the stream the new period is being added too

 *@returns void: a new period is added to the stream in the stream reducer
**/ 
  
export const period = (flow: string, id: string, stream: I.stream): void => {
  const lastPeriod = +Object.keys(stream[flow]).pop()
  const nextPeriod = lastPeriod + 1
  const lastValue = stream[flow][lastPeriod].value
  const lastEndYear = stream[flow][lastPeriod].end

  const newPeriods = {
    ...stream[flow],
    [nextPeriod]: {
      start: lastEndYear,
      value: lastValue,
      end: lastEndYear + 5,
    },
  }

  set("stream_reducer", { [id]: { [flow]: newPeriods } })
}
