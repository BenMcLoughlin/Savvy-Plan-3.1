import * as I from "model/types"

export const payment = function (rate: I.n, nperiod: I.n, pv: I.n, fv: I.n, type: I.n): I.n {
  if (!fv) fv = 0
  if (!type) type = 0

  if (rate === 0) return -(pv + fv) / nperiod

  const pvif = Math.pow(1 + rate, nperiod)
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= 1 + rate
  }

  return Math.round(pmt)
}
