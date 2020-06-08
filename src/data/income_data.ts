import { IIncomeStream } from 'types/reducer_types'
import { createStream, addPeriodToStream, newIncomeStream } from 'services/ui_functions'

/**
 * createIncomeArray() returns an array of objects that each represent a detail of the income stream such as when they started and how much they earn.
 * It initially consists of an array that returns an income stream with one period.  As the user
 * increments the "periods" number in the stream a set of new objects is added to the stream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

export const createIncomeArray = (instance: IIncomeStream, setValue_action: any, state: any) => {
  const { periods, id } = instance
  console.log(instance)
  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

  let past = currentYear > instance.year0
  let finalPast = currentYear > instance[`yearLast`]

  const { birthYear } = state.user_reducer

  const newStream = newIncomeStream('#00BDD3', 'Employment', 'Wal Mart Income', 0, true, +birthYear + 18, 1500, +birthYear + 40)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask:
        'Examples could be if you work as an Engineer, you could say "Engineer Income. Or name if after the employer that pays you, like "Wal Mart Income".',
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
      //QUESTION 1 - Type of income
      array: ['Regular Employment', 'Business Income', 'Investment Income', 'Rental Income'], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask:
        'Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan on it.',
      component: 'PickSingleOption',
      childId: 'reg',
      id,
      reducer: 'main_reducer',
      title: 'What kind of income is it?',
      textInput: true,
    },
    {
      ask: 'In order to calculate your pension income we need to know when you started, what you earned, and when you might end.',
      bottomLabel: `at age ${instance.year0 - 1988}`,
      component: 'Slider',
      childId: 'year0',
      id,
      max: 2080,
      min: `${+birthYear + 16}`,
      step: 1,
      topLabel: 'I started in ',
      reducer: 'main_reducer',
      title: past ? 'When did you start earning this income?' : "When do you think you'll start earning this income?",
      type: 'year',
    },
    {
      //ask: "How much were you earning when you started?",
      ask: 'Put in the value when you started. You can add changes in incomelater',
      bottomLabel: 'before tax per year',
      childId: 'value0',
      component: 'Slider',
      id,
      max: 400000,
      min: 0,
      step: 1000,
      topLabel: 'I earned ',
      reducer: 'main_reducer',
      title: past ? 'How much were your average annual earnings when you started?' : "What do you think your average annual earnings will be?",
    },
    {
      ask:
        "Ending could be caused by changing careers or retiring. Even if you're not sure, just guess. It will help us give you an idea of what your pension would be if you did end at that time.",
      bottomLabel: `at age ${instance[`yearLast`] - 1988}`,
      component: 'Slider',
      childId: `yearLast`,
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
      ask:
        "Your values don't have to be perfect, but we do want to capture large changes as they might impact your pension income.",
      component: 'DualSelect',
      id: 'selectedUser',
      value1: 'yes',
      value2: 'no',
      reducer: 'ui_reducer',
      title: past ? 'Did it ever have a change greater than $5,000?' : 'Did you think it will ever have a change greater than $5,000?',
      onClick: function () {
        setValue_action(id, 'main_reducer', periods + 1, 'periods')
        addPeriodToStream(instance, periods, id, setValue_action)
      },
    },
    //---INSERT HERE
    {
      ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      component: 'DualSelect',
      id: 'selectedUser',
      value1: 'yes',
      value2: 'no',
      reducer: 'ui_reducer',
      title: 'Would you like to add another income stream to the chart?',
      onClick: function () {
        createStream(newStream, setValue_action, 'userIncome')
      },
    },
  ]

  //   ask:
  //   'We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ',
  // component: 'DualSelect',
  // id: 'selectedUser',
  // value1: 'yes',
  // value2: 'no',
  // reducer: 'ui_reducer',
  // title: 'Would you like to add an income stream to the chart?',
  // onClick: function () {
  //   //the onClick function adds a new income stream into the reducer which enables the user to edit it
  //   createStream(newStream, setValue_action, 'userIncome')
  // },

  for (let i = periods; i > 0; i--) {
    let past = currentYear > instance[`year${i}`]
    array.splice(
      6,
      0,
      {
        ask: `If you think you're income might increase or decrease it's helpful to place that here. It helps us determine when and how much you should contribute to different savings accounts.`,
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
        ask: `Once again, it doesn't have to be perfect. There's a big difference between 70k and 30k which makes a difference in our plan but small changes won't have much of an impact.`,
        bottomLabel: 'before tax per year',
        childId: `value${i}`,
        component: 'Slider',
        id,
        max: 400000,
        min: 0,
        step: 1000,
        topLabel: past ? 'I earned?' : 'I might earn',
        reducer: 'main_reducer',
        title: past ? 'How much did you earn?' : 'What would you guess you will earn?',
        type: 'currency',
      },
      {
        ask: `If you think it will change significantly again, add it in. Examples could be taking a few years off or getting a promotion.`,
        component: 'DualSelect',
        id: 'selectedUser',
        value1: 'yes',
        value2: 'no',
        reducer: 'ui_reducer',
        title: past ? 'Did it change over $5000 again?' : 'Did you think it will change over $5000 again?',
        onClick: function () {
          addPeriodToStream(instance, periods, id, setValue_action)
        },
      }
    )
  }
  return array
}


export const incomeInsights_data = (setValue_action: any, state: any) => {

  const array = [
    "Your estimated retirement pension income is is $14,000 a year. That's you Canada Pension Plan and Old age security combined",
    "Since you don't have a large pension income in retirement and you're working earnings are higher than $70k you'll want to focus on your RRSP",
    "The best years to contribute to your RRSP will be 2025-2029 because you're earning more and you're receiving the child Canadd Benefit",
  ]
  return array
}


export const incomeActionSteps_data = (setValue_action: any, state: any) => {

  const array = [
    "Focus on contributing to your RRSP in the years 2024 - 2029",
    "Ensure you have a Canada Revenue Agency my service account set up so you can see what your TFSA and RRSP contribution room is ",
    "Since your spouse earns considerably less you'll want to look into setting up a spousal RRSP",
  ]

  return array
}

export const howThisWorks_data = (setValue_action: any, state: any) => {

  const array = [
    "Click on a bar in the chart if you'd like to edit the income stream",
    "Ensure you have a Canada Revenue Agency my service account set up so you can see what your TFSA and RRSP contribution room is ",
    "Since your spouse earns considerably less you'll want to look into setting up a spousal RRSP",
  ]

  return array
}