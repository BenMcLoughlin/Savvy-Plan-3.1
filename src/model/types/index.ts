import root_reducer from "model/redux/root_reducer"
import { ChangeEvent } from "react"

//COMPONENT TYPES

//DATA TYPES

import { pages as _pages } from "model/types/global/data_types"
export type pages = _pages

//HOOKS TYPES
import { useHttpClient as _useHttpClient } from "model/types/global/hooks_types"
export type useHttpClient = _useHttpClient

import { formData as _formData } from "model/types/global/hooks_types"
export type formData = _formData

import { useForm as _useForm } from "model/types/global/hooks_types"
export type useForm = _useForm

//INCOME CALCULATION TYPES

import { incomeForcast as _incomeForcast } from "model/types/calculation/income_types"
export type incomeForcast = _incomeForcast

import { government as _government } from "model/types/calculation/income_types"
export type government = _government

//FUNCTION TYPES

import { set as _set } from "model/types/global/function_types"
export type set = _set

import { remove as _remove } from "model/types/global/function_types"
export type remove = _remove

//QUESTIONS
import { question as _question } from "model/types/global/onboarding_types"
export type question = _question

import { onboard_questions as _onboard_questions } from "model/types/global/onboarding_types"
export type onboard_questions = _onboard_questions

//REACT TYPES

export type event = ChangeEvent<HTMLInputElement>

//REDUCER TYPES

export type state = ReturnType<typeof root_reducer>

import { stream as _stream } from "model/types/global/redux_types"
export type stream = _stream

import { main_reducer as _main_reducer } from "model/types/global/redux_types"
export type main_reducer = _main_reducer

import { flow as _flow } from "model/types/global/redux_types"
export type flow = _flow

//SAVINGS TYPES

import { savingsObject as _savingsObject } from "model/types/calculation/savings_types"
export type savingsObject = _savingsObject

//VARIABLE TYPES

export type a = any

import { chartType as _chartType } from "model/types/global/variable_types"
export type chartType = _chartType

import { objects as _objects } from "model/types/global/variable_types"
export type objects = _objects

import { owner as _owner } from "model/types/global/variable_types"
export type owner = _owner

import { parent as _parent } from "model/types/global/variable_types"
export type parent = _parent

import { reg as _reg } from "model/types/global/variable_types"
export type reg = _reg

import { user as _user } from "model/types/global/variable_types"
export type user = _user

import { streamType as _streamType } from "model/types/global/variable_types"
export type streamType = _streamType

import { year as _year } from "model/types/global/variable_types"
export type year = _year

//SERVICES TYPES
import { validText as _validText } from "model/types/global/services_types"
export type validText = _validText
