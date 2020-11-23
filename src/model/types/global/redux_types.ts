import { NumberArray } from "d3"
import * as I from "model/types"

export type period = {
  [key: string]: {
    start: number
    value: number
    end: number
  }
}
export type flow = "in" | "out"

export type action = {
  type: string
  id: string
  childId: string
  childId1?: string
  childId2?: string
  childId3?: string
  savedState?: savedState
  value: I.a
}

export interface stream_reducer {
  [key: string]: I.stream
}

export interface auth_reducer {
  token: string
  isLoading: boolean
  errors: I.objects
}

export interface ui_reducer {
  colorIndex: number
  changeRateAssumptions: boolean
  changeRetirementAssumptions: boolean
  chartStartYear: number
  chartEndYear: number
  dualSelectValue: boolean
  hasChildren: boolean
  isMarried: boolean
  newStream: boolean
  progress: number
  scenarios: I.objects
  selectedAccount: string
  selectedId: string
  selectedPage: string
  selectedScenario: number
  selectedUser: string
  showAssumptionsPanel: boolean
  showRetirementAssumptions: boolean
  showTargetIncome: boolean
  users: I.user[]
  dummy: string
  dummyNested: I.a
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

export type userCore = {
  birthYear: number
  cppStartAge: number
  endWork: number
  firstName: string
  gender: string
  lastName: string
  lifeSpan: number
  oasStartAge: number
  startWork: number
  avgIncome: number
  rrspStartAge: number
  tfsaStartAge: number
}

export type user_reducer = {
  retIncome: number
  hasChildrenStatus: string
  inflationRate: number
  maritalStatus: string
  mer: number
  r1: number
  r2: number
  numberOfChildren: number
  province: string
  rate1: number
  rate2: number
  user1: userCore
  user2: userCore
}
export type userCalcs = {
  avgIncome: number
  cppPayment: number
  rrspInc: number
  rrspNestEgg: number
  tfsaInc: number
  tfsaNestEgg: number
  nregInc: number
  nregNestEgg: number
}

export type calc_reducer = {
  user1: userCalcs
  user2: userCalcs
}

export interface state {
  auth_reducer: auth_reducer
  calc_reducer: calc_reducer
  ui_reducer: ui_reducer
  stream_reducer: stream_reducer
  user_reducer: user_reducer
}

export type savedState = user_reducer | ui_reducer | stream_reducer

export type reducer = "ui_reducer" | "user_reducer" | "stream_reducer" | "auth_reducer"
