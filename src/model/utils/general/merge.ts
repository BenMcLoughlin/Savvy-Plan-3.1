/* eslint-disable prefer-destructuring */
import * as I from "model/types"

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item)
}

export const merge = (target, ...sources) => {
  for (const source of sources) {
    for (let k in source) {
      let vs = source[k],
        vt = target[k]
      if (Object(vs) == vs && Object(vt) === vt) {
        target[k] = merge(vt, vs)
        continue
      }
      target[k] = source[k]
    }
  }
  return target
}
