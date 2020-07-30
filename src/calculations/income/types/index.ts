import { state as _appState } from "types/reducer_types"
export type state = _appState

import { year as _year } from "types/variable_types"
export type year = _year

import { owner as _owner } from "types/variable_types"
export type owner = _owner

import { incomeStream as _incomeStream } from "types/reducer_types"
export type incomeStream = _incomeStream

import { instance as _instance } from "types/reducer_types"
export type instance = _instance

//CCB TYPES
export type kidsBirthYearArray = year[]

interface annualIncome {
  [key: string]: number
}

export interface combinedIncome_object {
  [key: number]: annualIncome
}

//INCOME TYPES

type incomeStreams = {
  [key: string]: number
}

type userIncome = {
  incomeStreams: incomeStreams
  incomeStreamsForCpp: incomeStreams
  totalIncome: number
  totalCppIncome: number
}

export type incomeObject = {
  [key: string]: {
    user1: userIncome
    user2: userIncome
  }
}
