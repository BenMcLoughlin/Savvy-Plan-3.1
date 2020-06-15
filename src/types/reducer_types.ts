import root_reducer from "redux/root_reducer"
import { Action } from "redux"

export interface IUiState {
  change: boolean
  selectedId: string
  colorIndex: number
  videoUrl: string
  progress: number
  selectedPage: string
  selectedUser: string
  selectedAccount: string
}

export interface IUserState {
  child1BirthYear: number
  child2BirthYear: number
  changeAssumptions: string
  numberOfChildren: number
  gender: string
  hasChildren: string
  housing: boolean
  inflationRate: number
  maritalStatus: string
  MER: number
  province: string
  rate1: number
  rate2: number
  user1BirthYear: number
  user2BirthYear: number
  user1CPPStartAge: number
  user2CPPStartAge: number
  user1LifeSpan: number
  user2LifeSpan: number
  user1Name: string
  user2Name: string
  user1OasStartAge: number
  user2OasStartAge: number

}

export interface IMainState {
  [key: string]: IInstance | IIncomeStream
}

export type TreducerID = keyof IUserState | keyof IUiState | keyof IMainState

export interface ISetValue_action extends Action {
  type: string
  id: string
  childId?: string
  value: any
}

export type IAppState = ReturnType<typeof root_reducer>

export interface IInstance {
  color: string
  year1: number
  reg: string
  stream: string
  year2: number
  id: string
  value: string | number | boolean
}

export interface IIncomeStream {
  color: string
  id?: string
  reg: string
  name: string
  periods: number
  taxable: boolean
  year0: number
  value0: number
  [key: string]: any
}
