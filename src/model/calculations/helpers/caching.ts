import _ from "lodash"

export const getCacheKey = (state, streamType1, streamType2) => {
  let object = {}
  for (var key in state.main_reducer) {
    if (key.includes(streamType1) || key.includes(streamType2)) {
      const stream = state.main_reducer[key]
      const periods = +Object.keys(stream.in).pop()
      _.range(1, periods + 1).map(n => {
        object[key] = {
          ...object[key],
          [n]: {
            start: stream.in[n].start,
            value: stream.in[n].value,
            end: stream.in[n].end,
          },
        }
      })
    }
  }
  return JSON.stringify(object, null, 4)
}


export const memoize = (string, state, fn) => {

}
export const getCacheKeyDEPRECIATED = (state, streamType1, streamType2) => {
  let object = {}
  for (var key in state.main_reducer) {
    if (key.includes(streamType1) || key.includes(streamType2)) {
      const { periods } = state.main_reducer[key]
      _.range(periods + 1).map(n => {
        object[key] = {
          ...object[key],
          [`period${n}StartYear`]: state.main_reducer[key][`period${n}StartYear`],
          [`period${n}Value`]: state.main_reducer[key][`period${n}Value`],
          [`period${n}EndYear`]: state.main_reducer[key][`period${n}EndYear`],
          name: state.main_reducer[key].name,
        }
      })
    }
  }
  return JSON.stringify(object, null, 4)
}
