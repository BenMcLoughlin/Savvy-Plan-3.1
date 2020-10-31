type Icomponents = "DualSelect" | "Button" | "PickMultipleOptions" | "PickNumber" | "PickSingleOption" | "Slider" | "TextInput" | "TwoSliders" | ""

export interface ICoreProps {
  explanation?: string
  chart?: string
  component: Icomponents
  comment?: string
  subTitle?: string
  question: string
  valid?: boolean
  handleChange: any
  label?: string
}

export interface IPickMultipleOptions extends ICoreProps {
  optionArray: string[]
  user: string
  arrayOfSelected: string[]
}

export interface IDualSelect extends ICoreProps {
  option1: string | number
  option2: string | number
  handleChange2?: any
}

export interface IMultiSliders extends ICoreProps {
  num: number
}
export interface IPickNumber extends ICoreProps {
  value: number
}

export interface IPickSingleOption extends ICoreProps {
  optionArray: string[]
  textInput: boolean
}

export interface slider extends ICoreProps {
  explanation: string
  bottomLabel?: string
  max: number
  min?: number
  step: number
  topLabel: string
  question: string
  type?: string
}

export interface slidersArray extends ICoreProps {
  explanation: string
  num: number
  slider1: slider
  slider2: slider
  slider3: slider
}

export interface textInput extends ICoreProps {
  placeholder: string
  type: string
}

export interface questionsController {
  placeholder: string
  type: string
}


export type question = IMultiSliders | IPickMultipleOptions | IDualSelect | textInput | IPickNumber | IPickSingleOption | slider | slidersArray

export interface onboard_questions {
  questions: any
  nextButton: any
  backButton: any
}

