import { IUserState, IMainState, IIncomeStream, IUiState } from 'types/reducer_types'
import { createStream, addPeriodToStream } from 'services/ui_functions'
import { IOnboard } from 'types/component_types'

/**
 * newIncomeStream is a function that creates a new income instance. An instance represents income for a certain period. Eg. Wal mart Income from 2009 - 2020.
 * It is different than other instances in the same stream because the value is different. Eg. the user may have made less money for the first 5 years of employment, then more later.
 *  */

export const newIncomeStream = (
  color: string,
  reg: string,
  name: string,
  periods: number,
  taxable: boolean,
  year0: number,
  year1: number,
  value0: number
): IIncomeStream => ({
  color,
  reg,
  name,
  periods,
  taxable,
  year0,
  value0,
  year1,
})

/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income stream such as when they started and how much they earn.
 * It initially consists of an array that returns an income stream with one period.  As the user
 * increments the "periods" number in the stream a set of new objects is added to the stream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createIncomeArray = (instance: any, setValue_action: any) => {
  const currentYear = new Date().getFullYear()
  const { periods, id } = instance
  let past = currentYear > instance.year0
  let finalPast = currentYear > instance[`year${periods}`]

  const newStream = newIncomeStream('red', 'employment', 'butholes', 0, true, 2020, 2029, 0)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask: 'The goal is to have your working income streams eventually be replaced by passive income streams. ',
      component: 'TextInput',
      childId: 'name',
      id,
      label: 'Source of Income',
      reducer: 'main_reducer',
      title: 'What do you call this income stream?',
      placeholder: 'Income Name',
      type: 'text',
    },
    {
      array: ['Regular Employment', 'Business Income', 'Investment Income', 'write below'],
      ask:
        'Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan on it.',
      component: 'MultiSelect',
      childId: 'reg',
      id,
      reducer: 'main_reducer',
      title: 'What kind of income is it?',
      textInput: true,
    },
    {
      ask: '',
      bottomLabel: `at age ${instance[`year${periods}`] - 1988}`,
      component: 'Slider',
      childId: 'year0',
      id,
      max: 2050,
      min: 1990,
      step: 1,
      topLabel: 'I started in ',
      reducer: 'main_reducer',
      title: past ? 'When did you start working there?' : "When do you think you'll start working there?",
      type: 'year',
    },
    {
      //ask: "How much were you earning when you started?",
      ask: '4',
      bottomLabel: 'before tax per year',
      childId: 'value0',
      component: 'Slider',
      id,
      max: 400000,
      step: 1000,
      topLabel: 'I earned ',
      reducer: 'main_reducer',
      title: past ? 'How much were you earning when you started?' : "When do you think you'll be earning?",
    },
    {
      //ask: "",
      ask: '5',
      component: 'DualSelect',
      id: 'selectedOption',
      option1: 'yes',
      option2: 'no',
      value1: 0,
      value2: 0,
      reducer: 'ui_reducer',
      title: past ? 'Did it ever change?' : 'Did you think it will ever change?',
      onClick: function () {
        setValue_action(id, 'main_reducer', periods + 1, 'periods')
        addPeriodToStream(instance, periods, id, setValue_action)
      },
    },
    //---INSERT HERE
    {
      ask: "What year do you think you'll end? ",
      bottomLabel: `at age ${instance[`year${periods}`] - 1988}`,
      component: 'Slider',
      childId: `year${periods + 1}`,
      id,
      max: 2095,
      min: instance[`year${periods}`],
      step: 1,
      topLabel: finalPast ? 'It ended in' : 'It might end in',
      reducer: 'main_reducer',
      title: finalPast ? 'When did you stop earning this income?' : 'When do you think it will end?',
      type: 'year',
    },
    {
      ask: 'ADD ANOTHWR!',
      component: 'DualSelect',
      id: 'selectedOption',
      option1: 'yes',
      option2: 'no',
      value1: 0,
      value2: 0,
      reducer: 'ui_reducer',
      title: 'would you like to add another income stream to the chart?',
      onClick: function () {
        createStream(newStream, setValue_action, 'income')
      },
    },
  ]

  for (let i = periods; i > 0; i--) {
    let past = currentYear > instance[`year${i}`]
    //const verb = 2020 <2021 ? "will" : "did"

    const priorQuestionIndex = array.findIndex((d: any) => d.ask === '5') + 1
    array.splice(
      priorQuestionIndex,
      0,
      {
        // ask: "",
        ask: `${i}.1`,
        bottomLabel: `at age ${instance[`year${i}`] - 1988}`,
        childId: `year${i}`,
        component: 'Slider',
        id,
        max: 2100,
        min: instance[`year${i - 1}`],
        step: 1,
        topLabel: past ? 'My income changed in' : 'It might change in',
        reducer: 'main_reducer',
        title: past ? 'What year did your income change?' : 'What year do you think your income will change?',
        type: 'year',
      },
      {
        ask: `${i}.2`,
        bottomLabel: 'before tax per year',
        childId: `value${i}`,
        component: 'Slider',
        id,
        max: 400000,
        step: 1000,
        topLabel: past ? 'I earned?' : 'I might earn',
        reducer: 'main_reducer',
        title: past ? 'How much did you earn?' : 'What would you guess you will earn?',
        type: 'currency',
      },
      {
        ask: `${i}.3`,
        component: 'DualSelect',
        id: 'selectedOption',
        option1: 'yes',
        option2: 'no',
        value1: periods + 1,
        value2: periods,
        reducer: 'ui_reducer',
        title: past ? 'Did it change again?' : 'Did you think it will change again?',
        onClick: function () {
          addPeriodToStream(instance, periods, id, setValue_action)
        },
      }
    )
  }
  return array
}
