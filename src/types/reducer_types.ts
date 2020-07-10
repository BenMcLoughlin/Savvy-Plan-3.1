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
  newStream: boolean
  selectedTransaction: string
  dualSelectValue: boolean
}

export interface IUserState {
  child1BirthYear: number
  child2BirthYear: number
  changeAssumptions: string
  numberOfChildren: number
  gender: string
  hasChildren: string
  ownHome: boolean
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

export interface Iset extends Action {
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
  owner: string
  stream: string
  year2: number
  id: string
  value: string | number | boolean
}

// export interface IIncomeStream {
//   color?: string
//   id?: string
//   reg: string
//   name: string
//   owner: string
//   periods: number
//   taxable: boolean
//   year0: number
//   value0: number
//   [key: string]: any
// }

export interface IIncomeStream {
  color?: string
  id?: string
  name: string
  owner?: string
  periods: number
  period0StartYear: number
  period0Value: number
  period0EndYear
  reg: string
  taxable: boolean
  [key: string]: any
}

export interface ISavingsStream {
  color?: string
  id?: string
  name: string
  owner?: string
  periods: number
  period0StartYear: number
  period0Value: number
  period0EndYear: number
  reg: string
  taxable: boolean
  [key: string]: any
}

// export interface ISavingsStream {
//   color?: string
//   contribution0: number
//   contributionPeriods: number
//   contributionYear0: number
//   currentValue: number
//   id?: string
//   reg: string
//   name: string
//   owner: string
//   taxable: boolean
//   withdrawal0: number
//   withdrawalPeriods: number
//   withdrawalYear0: number
//   [key: string]: any
// }

export interface IPropertyStream {
  color?: string
  currentValue: number
  hasMortgage: string
  mortgageRate: number
  mortgageBalance: number
  mortgageAmortization: number
  mortgageStartYear: number
  name: string
  owner?: string
  purchasePrice: number
  purchaseYear: number
  reg: string
  taxable: boolean
  sellYear: number
}
export interface IDebtStream {
  color?: string
  id?: string
  rate: number
  reg: string
  balance: number
  amortization: number
  payment: number
  name: string
  owner?: string
}

export type streamType = IIncomeStream | IPropertyStream | IDebtStream | ISavingsStream
