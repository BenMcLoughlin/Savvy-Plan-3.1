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

export const memoize = (cache, fn, setCache, state) => {
  const cacheKey = "12" 
  if (cacheKey in cache) {
      return cache[cacheKey]
    } else {
      const result = fn(state)
      setCache({...cache[cacheKey] = result})
      return result
    }
}

function finalMemo(fn) {
  let cache = new Map()
  return (...args) => {
    const key = args.toString()
    if (cache.has(key)) {
      return cache.get(key)
    } else {
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
  }
}

export const memoize2 = (fn, state, string) => {
  let cache = {}
  console.log(cache)
  const cacheKey = "12"
  const innerFunction = state => {
    if (cacheKey in cache) {
      return cache[cacheKey]
    } else {
      const result = fn(state)
      cache[cacheKey] = result
      return result
    }
  }
  return innerFunction
}
