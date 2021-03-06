import { ChangeEvent } from "react"

//BACIC TYPES
export type n = number

//COMPONENT TYPES

//DATA TYPES

export type { pages } from "model/types/global/data_types"

//FORCAST
export type { forcast } from "model/types/global/forcast_types"

//HOOKS TYPES
export type { useHttpClient } from "model/types/global/hooks_types"

//INCOME CALCULATION TYPES

export type { incomeForcast } from "model/types/calculation/income_types"

//LOGIN
export type { loginForm } from "model/types/login"

//FUNCTION TYPES

export type { set } from "model/types/global/function_types"
export type { remove } from "model/types/global/function_types"

//buildPlan
export type { question } from "model/types/global/onboarding_types"
export type { onboard_questions } from "model/types/global/onboarding_types"

//REACT TYPES

export type event = ChangeEvent<HTMLInputElement>

//REDUX TYPES

//export type state = ReturnType<typeof root_reducer>

export type { action } from "model/types/global/redux_types"
export type { auth_reducer } from "model/types/global/redux_types"
export type { calc_reducer } from "model/types/global/redux_types"

export type { reducer } from "model/types/global/redux_types"
export type { state } from "model/types/global/redux_types"
export type { savedState } from "model/types/global/redux_types"
export type { period } from "model/types/global/redux_types"
export type { periods } from "model/types/global/redux_types"
export type { stream } from "model/types/global/redux_types"
export type { stream_reducer } from "model/types/global/redux_types"
export type { ui_reducer } from "model/types/global/redux_types"
export type { user_reducer } from "model/types/global/redux_types"
export type { flow } from "model/types/global/redux_types"

//SAVINGS TYPES

export type { savingsObject } from "model/types/calculation/savings_types"

//Tax Types
export type { craValues } from "model/types/tax"
export type { government } from "model/types/tax"
export type { taxBracket } from "model/types/tax"
export type { taxBrackets } from "model/types/tax"

//VARIABLE TYPES

export type a = any

export type { chartType } from "model/types/global/variable_types"
export type { objects } from "model/types/global/variable_types"
export type { owner } from "model/types/global/variable_types"
export type { parent } from "model/types/global/variable_types"
export type { reg } from "model/types/global/variable_types"
export type { user } from "model/types/global/variable_types"
export type { streamType } from "model/types/global/variable_types"

//SERVICES TYPES
export type { validText } from "model/types/global/services_types"
