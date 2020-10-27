import root_reducer from "model/redux/root_reducer"
import { Action } from "redux"
import * as I from "model/types"
import { NumberLiteralType } from "typescript"

export interface IUiState {
  change: boolean
  selectedId: string
  selectedScenario: number
  colorIndex: number
  videoUrl: string
  progress: number
  selectedPage: string
  selectedUser: I.user
  selectedPeriod: number
  selectedAccount: I.reg
  newStream: boolean
  savingsTransaction: string
  dualSelectValue: boolean
  scenarios: number
  scenarioLabel1: string
  scenarioLabel2: string
  scenarioLabel3: string
}

export interface IUserState {
  child1BirthYear?: number
  child2BirthYear?: number
  changeAssumptions: string
  numberOfChildren: number
  gender: string
  hasChildrenStatus: string
  ownHome: boolean
  inflationRate: number
  maritalStatus: string
  MER: number
  province: string
  rate1: number
  rate2: number
  user1BirthYear: number
  user2BirthYear: number
  user1CppStartAge: number
  user2CppStartAge: number
  user1LifeSpan: number
  user2LifeSpan: number
  user1Name: string
  user2Name: string
  user1OasStartAge: number
  user2OasStartAge: number
}

export type TreducerID = keyof IUserState | keyof IUiState | keyof main_reducer

export interface Iset extends Action {
  type: string
  id: string
  childId1?: string
  childId2?: string
  value: any
}

export type state = ReturnType<typeof root_reducer>

export interface stream {
  [key: string]: any
}

export interface main_reducer {
  [key: string]: any
}
