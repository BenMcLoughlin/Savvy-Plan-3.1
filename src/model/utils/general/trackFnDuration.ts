export const trackFnDuration = (fn, ...args) => {
   console.time(fn.name)
   const returnValue = fn(...args)
   console.timeEnd(fn.name)
   return returnValue
}