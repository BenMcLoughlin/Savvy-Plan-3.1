import { TreducerID } from 'types/reducer_types'

type Icomponents =
  | 'DualSelect'
  | 'Button'
  | 'PickMultipleOptions'
  | 'PickNumber'
  | 'PickSingleOption'
  | 'Slider'
  | 'TextInput'
  | 'TwoSliders'
  | ''
type Ireducers = 'main_reducer' | 'ui_reducer' | 'user_reducer'

interface ICoreProps {
  ask?: string
  component: Icomponents
  childId?: string
  id: TreducerID
  reducer: Ireducers
  subTitle?: string
  title: string
  spouse?: boolean
  onClick?: (string: any) => void
}

export interface IButton extends ICoreProps {
  label?: string
  value: number | string
}

export interface IPickMultipleOptions extends ICoreProps {
  array: any
  user: string
}

export interface IDualSelect extends ICoreProps {
  value1: string | number
  value2: string | number
}

export interface IPickNumber extends ICoreProps {
  value: number
}

export interface IPickSingleOption extends ICoreProps {
  array: any
  textInput: boolean
}

export interface ISlider extends ICoreProps {
  ask: string
  bottomLabel?: string
  max: number
  min?: number
  step: number
  topLabel: string
  title: string
  type?: string
}

interface ISingleSlider {
  bottomLabel?: string
  max: number
  step: number
  id: string
  topLabel: string
  reducer: string
  type?: string
}

export interface ITwoSliders extends ICoreProps {
  props1: ISingleSlider
  props2: ISingleSlider
}

export interface ITextInput extends ICoreProps {
  placeholder: string
  type: string
}

export type IOnboard = IButton | IPickMultipleOptions | IDualSelect | ITwoSliders | ITextInput | IPickNumber | IPickSingleOption | ISlider
