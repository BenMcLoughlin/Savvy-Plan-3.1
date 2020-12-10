import { colorArray } from "model/styles/color_data"
import { store } from "index"
import * as u from "model/utils"
import { set } from "model/redux/actions"
import * as I from "model/types"


/** stream
 * creates a new stream and places it in the stream reducer
 *@param streamType the type of stream to be created, such as "income" or "savings"
 *@returns :void, a new stream is added to the stream_reducer
**/ 
  
export const stream = (streamType: string, flow: I.flow, owner: string, reg: I.reg): void => {
  const id = owner + u.startCase(streamType) + "_" + (Math.random() * 1000000).toFixed()
  const { colorIndex } = store.getState().ui_reducer

  const color = colorArray[colorIndex]
  set("ui_reducer", { colorIndex: colorIndex + 1 })

  const newStream = {
    amortization: 0,
    color,
    cppEligible: true,
    createdAt: new Date().getTime(),
    currentValue: 0,
    flow,
    in: {
      "1": {
        start: streamType === "savings" ? 2050 : 2020,
        value: 0,
        end: streamType === "savings" ? 2080 : 2030,
      },
    },
    id,
    owner,
    out: {
      "1": {
        start: 2020,
        value: 0,
        end: 2030,
      },
    },
    name: "",
    payment: 0,
    streamType,
    rate: 0,
    reg,
    taxable: true,
    scenarios: 0,
    startValue: 0,
    startYear: 0,
    periodIn: 1,
    periodOut: 1,
  }
  set("ui_reducer", { selectedId: id })
  set("stream_reducer", { [id]: newStream })
  // determines which income instance to show within the edit box
}
