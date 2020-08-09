import _ from "lodash"

export const getCacheKey = (state, streamType) => {
  let object = {}
  for (var key in state.main_reducer) {
     if (key.includes(streamType)) {
       const {periods} = state.main_reducer[key]
       _.range(periods + 1).map( n => {
          object[key] = {...object[key], 
            [`period${n}StartYear`]: state.main_reducer[key][`period${n}StartYear`],
            [`period${n}Value`]: state.main_reducer[key][`period${n}Value`],
            [`period${n}EndYear`]: state.main_reducer[key][`period${n}EndYear`],
            name: state.main_reducer[key].name,
          }
       } )
     }
    }
     return JSON.stringify(object, null, 4)
}
