//GLobal Types

import { state as _appState } from "model/types/reducer_types"
export type state = _appState

import { year as _year } from "model/types/variable_types"
export type year = _year

export type kidsBirthYearArray = year[]

interface annualIncome {
  [key: string]: number
}

export interface combinedIncome_object {
  [key: number]: annualIncome
}
