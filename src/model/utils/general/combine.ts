/** combine
 * ombines the values of two objects, if they both have the same keys the values of those keys will be added together
 *@param obj1 the first object with a list of keyvalue pairs
 *@param obj2 the second value
 *@returns combined object with values added together
 **/

function combine<T, U>(obj1: T, obj2: U) {
  const both = { ...obj1, ...obj2 }
  return Object.entries(both).reduce((a, [k, v]) => {
    const value = obj2[k] ? both[k] + obj2[k] : both[k]
    return { ...a, [k]: value }
  }, {})
}

export { combine }
