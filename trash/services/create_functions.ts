import { colorArray } from "model/styles/color_data"
import _ from "lodash"
import * as I from "model/types"
import { store } from "./node_modules/index"
import { set } from "model/redux/actions"

export const addPeriodToStream = (flow: string, id: string, period: number, stream: I.stream): void => {
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

export const createStream = (streamType: string, flow: I.flow, owner: string, reg: I.reg): void => {
  const id = owner + _.startCase(streamType) + "_" + (Math.random() * 1000000).toFixed()
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
