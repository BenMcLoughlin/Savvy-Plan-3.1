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
 * createIncomeArray() returns an array of objects that each represent a detail of the income stream and are mapped through in the wizard.
 * It initially consists of an array that returns an income stream with one period.  As the user
 * increments the "periods" number in the stream a set of new objects is added to the stream that enable the user to add the values for that period. They can then
 * add as many periods as they like to the array by incrementing the "periods" number. This array is then spliced into the main wizard array.
 *  */

const createIncomeArray = (instance: any, setValue_action: any) => {
  const currentYear = new Date().getFullYear()
  const { periods, id } = instance
  let past = currentYear > instance.year0
  let finalPast = currentYear > instance[`year${periods}`]

  const newStream = newIncomeStream('red', 'employment', 'butholes', 0, true, 2020, 2029, 0)

  const array: any = [
    //INTRO USER QUESTIONS
    {
      ask:
        'The goal is to have your working income streams eventually be replaced by passive income streams. ',
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
      title: past
        ? 'When did you start working there?'
        : "When do you think you'll start working there?",
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
      title: past
        ? 'How much were you earning when you started?'
        : "When do you think you'll be earning?",
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
      // ask: "What year do you think you'll end? ",
      ask: 'last',
      bottomLabel: `at age ${instance[`year${periods}`] - 1988}`,
      component: 'Slider',
      childId: `year${periods + 1}`,
      id,
      max: 2095,
      min: instance[`year${periods}`],
      step: 1,
      topLabel: 'It changed in ',
      reducer: 'main_reducer',
      title: finalPast
        ? 'When did you stop earning this income?'
        : 'When do you think it will end?',
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
        title: past
          ? 'What year did your income change?'
          : 'What year do you think your income will change?',
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

/**
 * income_data() returns the main array that forms the basis of our wizard. The array is a function that changes according to the selections of the user. It begins as a nearly
 * empty array with only three objects introducing the user to the subject. The user then fires an action that inserts a createIncomeArray into the main array. createIncomeArray
 * is its own function because we want the user to have the ability to add as many income streams as they like to the main array.
 *  */

export const income_data = (state: any, setValue_action: any): IOnboard[] => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { birthYear, maritalStatus, hasChildren } = user_reducer

  const { period, selectedId, streams } = ui_reducer

  const instance = main_reducer[selectedId]

  const newStream = newIncomeStream('red', 'employment', 'butholes', 0, true, 2020, 2029, 0)

  const array: IOnboard[] = [
    {
      //Question 1:
      component: 'Button',
      id: 'progress', //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
      reducer: 'ui_reducer',
      subTitle: 'We’ll gather some information that will enable us to build a plan suited to you.',
      title: 'Lets build you a financial Plan',
      label: 'continue',
      value: 1,
    },
    {
      //Question 2:
      ask: 'This helps us personalize your plan.',
      component: 'TextInput', // a text input in which the user types their name
      id: 'firstName', //id is used by the component "TextInput" to change the "firstName" value
      label: 'First Name',
      reducer: 'user_reducer', // information is stored in the user reducer
      title: "What's your first Name?", // the question the user sees above the text input
      placeholder: 'Name', // placeholder
      type: 'text',
    },
    {
      //Question 1:
      //ask: 'This forms the basis of our financial calculations.',
      ask: '2',
      component: 'TextInput',
      id: 'birthYear',
      label: 'Birth Year',
      reducer: 'user_reducer',
      title: "What's your Birth Year?",
      placeholder: 'YYYY',
      type: 'year',
    },
    {
      array: ['male', 'female', 'prefer not to say', 'write below'],
      ask: 'We want to ensure our planning process is inclusive.',
      component: 'MultiSelect',
      id: 'firstName',
      reducer: 'user_reducer',
      title: "What's your Gender?",
      textInput: true,
    },
    {
      array: ['single', 'married', 'common-law', 'write below'],
      ask: 'Having a spouse has a large impact on your plan',
      component: 'MultiSelect',
      id: 'maritalStatus',
      reducer: 'user_reducer',
      title: "What's your marital status?",
      textInput: true,
    },
  ]

  //  ------ADD TO ARRAY IF USER IS MARRIED
  if (maritalStatus === 'married' || maritalStatus === 'common-law') {
    array.push({
      ask: "We'll use this to keep your details seperate from your spouse.",
      component: 'TextInput',
      id: 'spouseFistName',
      label: "Spouse's First Name",
      reducer: 'user_reducer',
      title: "What's your spouse's first Name?",
      placeholder: 'Name',
      type: 'text',
    })
    array.push({
      ask: 'This will form the basis of our financial calculations',
      component: 'TextInput',
      id: 'spouseBirthYear',
      label: "Spouse's Birth Year",
      reducer: 'user_reducer',
      title: "What's your spouse's birth Year?",
      placeholder: 'YYYY',
      type: 'year',
    })
  }

  array.push({
    array: ['yes', 'no', 'hope to eventually', 'yes, and they are over 18'],
    ask: "We'd like to estimate your government child benefits.",
    component: 'MultiSelect',
    id: 'hasChildren',
    reducer: 'user_reducer',
    title: 'Do you have children?',
    textInput: false,
  })

  //  ------ADD TO ARRAY IF USER HAS CHILDREN
  if (hasChildren === 'yes' || hasChildren === 'hopeToEventually') {
    array.push({
      ask: "We'd like to estimate your government child benefits.",
      component: 'NumberSelect',
      id: 'numberOfChildren',
      value: 4,
      reducer: 'user_reducer',
      title: 'How many children?',
    })
  }

  array.push({
    ask:
      'We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ',
    component: 'DualSelect',
    id: 'selectedOption',
    option1: 'yes',
    option2: 'no',
    value1: 0,
    value2: 0,
    reducer: 'ui_reducer',
    title: 'Would you like to add an income stream to the chart?',
    onClick: function () {
      createStream(newStream, setValue_action, 'userIncome')
    },
  })

  Object.values(main_reducer)
    .filter((d: any) => d.id.includes('userIncome'))
    .map((instance) => {
      //looks at all the income streams listed in the main reducer
      const incomeData = createIncomeArray(instance, setValue_action) //creates an array for each income stream, enabling the user to change individual details in the wizard
      incomeData.map((d: any, i: number) => {
        //maps through the array and pushes the contents to the main array that controls the wizard
        array.push(d)
      })
    })

  array.push({
    ask:
      'We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ',
    component: 'DualSelect',
    id: 'selectedOption',
    option1: 'yes',
    option2: 'no',
    value1: 0,
    value2: 0,
    reducer: 'ui_reducer',
    title: 'Would you like to add your spouses income?',
    onClick: function () {
      createStream(newStream, setValue_action, 'spouseIncome')
    },
  })

  Object.values(main_reducer)
    .filter((d: any) => d.id.includes('spouseIncome'))
    .map((instance) => {
      //looks at all the income streams listed in the main reducer
      const incomeData = createIncomeArray(instance, setValue_action) //creates an array for each income stream, enabling the user to change individual details in the wizard
      incomeData.map((d: any, i: number) => {
        //maps through the array and pushes the contents to the main array that controls the wizard
        array.push(d)
      })
    })

  console.log(array)
  return array
}
