import * as I from "model/types"

export type period = {
  [key: string]: {
    start: number
    value: number
    end: number
  }
}
export type flow = "in" | "out"

export interface main_reducer {
  [key: string]: I.stream
}

export type stream = {
  amortization: number
  color: string
  cppEligible: boolean
  createdAt: number
  currentValue: number
  flow: string
  in: period
  id: string
  owner: I.owner
  out: period
  name: string
  payment: number
  streamType: I.streamType
  rate: number
  reg: I.reg
  taxable: boolean
  scenarios: number
  startValue: number
  startYear: number
  periodIn: number
  periodOut: number
}
