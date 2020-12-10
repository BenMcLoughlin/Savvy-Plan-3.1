import * as I from "model/types"

export const helperMethods = {
  /**  merge
   *  merges one object into another without c
   *@param sources an object that can contain nested objects outlineing the specific changes to be made
   *@returns the given object with all changes made via the srouces object
   **/
  merge(...sources) {
    for (const source of sources) {
      for (let k in source) {
        let vs = source[k],
          vt = this[k]
        if (Object(vs) === vs && Object(vt) === vt) {
          this[k] = this.mergeHelp(vt, vs)
          continue
        }
        this[k] = source[k]
      }
    }
    return this
  },

  mergeHelp(target, ...sources) {
    for (const source of sources) {
      for (let k in source) {
        let vs = source[k],
          vt = target[k]
        if (Object(vs) == vs && Object(vt) === vt) {
          target[k] = this.mergeHelp(vt, vs)
          continue
        }
        target[k] = source[k]
      }
    }
    return target
  },
  match(query) {
    return this.filterArray(Object.values(this), query)[0]
  },
  filterArray(arr, query) {
    return arr.filter(d =>
      Object.entries(query)
        .map(([k, v]) => d[k] === v)
        .every(b => b)
    )
  },
}
