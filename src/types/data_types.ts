import * as I from "types"
import { StringDecoder } from "string_decoder";

export interface pages {
  addButtonLabel: string //Label next to the plus button
  editPeriod: object
  chart: I.chartType, //determines the chart that will be rendered
  editPanel: string //tells <Display> which edit component to use
  user1Name: string
  user2Name: string
  createStream: () => void
  streamType: I.streamType
  infoCards: [
    //information cards providing insights to the user about their income. These will be mapped through and a card rendered.
    {
      label: "insights",
      array: [
        "Your estimated retirement pension income is is $14,000 a year. That's you Canada Pension Plan and Old age security combined",
        "Since you don't have a large pension income in retirement and you're working earnings are higher than $70k you'll want to focus on your RRSP",
        "The best years to contribute to your RRSP will be 2025-2029 because you're earning more and you're receiving the child Canadd Benefit",
      ],
    },
    {
      label: "action steps",
      array: [
        "Focus on contributing to your RRSP in the years 2024 - 2029",
        "Ensure you have a Canada Revenue Agency my service account set up so you can see what your TFSA and RRSP contribution room is ",
        "Since your spouse earns considerably less you'll want to look into setting up a spousal RRSP",
      ],
    },
  ],
}

interface  Iquestion {
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
