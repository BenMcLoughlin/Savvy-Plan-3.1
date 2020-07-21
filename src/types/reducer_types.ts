import root_reducer from "redux/root_reducer"
import { Action } from "redux"
import * as I from "types"

export interface IUiState {
  change: boolean
  selectedId: string
  colorIndex: number
  videoUrl: string
  progress: number
  selectedPage: string
  selectedUser: I.owner
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

export interface main_reducer {
  [key: string]: instance
}

export type TreducerID = keyof IUserState | keyof IUiState | keyof main_reducer

export interface Iset extends Action {
  type: string
  id: string
  childId?: string
  value: any
}

export type appState = ReturnType<typeof root_reducer>

export interface IinstanceCore {
  color: string
  createdAt: string, 
  id: string
  name: string
  periods: any
  owner: I.owner
  reg: string
  streamType: string
}

export interface IincomeStream extends IinstanceCore {
  periods: number
  period0StartYear: number
  period0Value: number
  period0EndYear: number
  taxable: boolean
  [key: string]: any
}

export interface IsavingsStream extends IinstanceCore {
  periods: number
  period0StartYear: number
  period0Value: number
  period0EndYear: number
  taxable: boolean
  [key: string]: any
}

export interface IpropertyStream extends IinstanceCore {
  currentValue: number
  hasMortgage: "yes" | "no"
  mortgageRate: number
  mortgageBalance: number
  mortgageAmortization: number
  mortgageStartYear: number
  purchasePrice: number
  purchaseYear: number
  taxable: boolean
  sellYear: number
}

export interface debtStream extends IinstanceCore {
  rate: number
  balance: number
  amortization: number
  payment: number
}

export type instance = IincomeStream | IpropertyStream | debtStream | IsavingsStream
