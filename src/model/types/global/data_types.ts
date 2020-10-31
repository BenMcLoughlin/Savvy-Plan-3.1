import * as I from "model/types"
import { StringDecoder } from "string_decoder"

interface IinfoCards {
  label: "insights" | "action steps"
  array: string[]
}

interface IsideNav {
  handleChange: (value: I.streamType) => void
  value: I.streamType
  options: I.streamType[]
}

interface IscenarioNav {
  handleChange: (value: number) => void
  value: number
  optionArray: string[]
  labelArray: string[]
}

interface IaddPrompt {
  handleChange: () => void
  label: string
}
interface IeditPrompt {
  handleChange: () => void
  label: string
}

interface ItripleSelector {
  user1Name: string
  user2Name: string
  value: string
  handleChange: (value: string) => void
}

export interface pages {
  addButtonLabel
  chart: I.chartType //determines the chart that will be rendered
  editPanel: string //tells <Display> which edit component to use
  streamType: I.streamType
  sideNav: IsideNav
  scenarioNav: IscenarioNav
  addPrompt: IaddPrompt
  editPrompt: IeditPrompt
  tripleSelector: ItripleSelector
  infoCards: IinfoCards[]
}

interface Iquestion {
  explanation: string
  label?: string
  optionArray?: string[]
  placeholder?: string
  question: string
}

interface Islider extends Iquestion {
  topLabelPast: string
  topLabelFuture: string
  bottomLabel: string
}

export interface questions {
  streamType: I.streamType
  q1: Iquestion
  q2: Iquestion
  q3: Iquestion
  qFinal: Iquestion
  slidersInput: Islider
}

export type onboardQuestions = Iquestion[]
