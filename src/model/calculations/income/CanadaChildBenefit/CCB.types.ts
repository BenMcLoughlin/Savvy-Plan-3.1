//GLobal Types

import { year as _year } from "model/types/variable_types"
export type year = _year

export type kidsBirthYearArray = year[]

interface annualIncome {
  [key: string]: number
}

export interface combinedIncome_object {
  [key: number]: annualIncome
}
