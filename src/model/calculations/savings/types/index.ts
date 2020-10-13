import { state as _appState } from "model/types/reducer_types"
export type state = _appState

import { year as _year } from "model/types/variable_types"
export type year = _year

import { owner as _owner } from "model/types/variable_types"
export type owner = _owner

import { incomeStream as _incomeStream } from "model/types/reducer_types"
export type incomeStream = _incomeStream

import { instance as _instance } from "model/types/reducer_types"
export type instance = _instance

//SAVINGS TYPES

import { savingsStream as _savingsStream } from "model/types/reducer_types"
export type savingsStream = _savingsStream

export type transactionType = "contribute" | "period"

export type account = "rrsp" | "tfsa" | "personal" | "lira" | "pension" | "resp"

type annualUserAccounts = {
  totalSavings: number
  [key: string]: any
}

export type annualAccountDetails = {
  contribute: number
  withdraw: number
  principle: number
  total: number
  totalInterest: number
}

export type savingsObject = {
  [key: string]: {
    user1: annualUserAccounts
    user2: annualUserAccounts
  }
}
