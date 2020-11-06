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
  chartStartYear: number
  chartEndYear: number
  dualSelectValue: boolean
  newStream: boolean
  progress: number
  scenarios: I.objects
  selectedAccount: string
  selectedId: string
  selectedPage: string
  selectedScenario: number
  selectedUser: string
  users: I.user[]
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
  endWorking: number
  firstName: string
  gender: string
  lastName: string
  lifeSpan: number
  oasStartAge: number
  startWorking: number
}
export type user_reducer = {
  retIncome: number
  hasChildrenStatus: string
  hasChildren: boolean
  inflationRate: number
  isMarried?: boolean
  maritalStatus: string
  MER: number
  numberOfChildren: number
  province: string
  rate1: number
  rate2: number
  user1: userCore
  user2: userCore
}

export interface state {
  auth_reducer: auth_reducer
  ui_reducer: ui_reducer
  stream_reducer: stream_reducer
  user_reducer: user_reducer
}

export type savedState = user_reducer | ui_reducer | stream_reducer

export type reducer = "ui_reducer" | "user_reducer" | "stream_reducer" | "auth_reducer"
