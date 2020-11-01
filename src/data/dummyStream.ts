import * as I from "model/types"

export const dummyStream: I.stream = {
  amortization: 0,
  color: "",
  cppEligible: true,
  createdAt: new Date().getTime(),
  currentValue: 0,
  flow: "in",
  in: {
    "1": {
      start: 2020,
      value: 0,
      end: 2030,
    },
  },
  id: "dummyStream",
  owner: "user1",
  out: {
    "1": {
      start: 2020,
      value: 0,
      end: 2030,
    },
  },
  name: "",
  payment: 0,
  streamType: "income",
  rate: 0,
  reg: "employment",
  taxable: true,
  scenarios: 0,
  startValue: 0,
  startYear: 0,
  periodIn: 1,
  periodOut: 1,
}