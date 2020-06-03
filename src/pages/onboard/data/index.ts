import { IIncomeStream } from 'types/reducer_types'
import { createIncomeArray, newIncomeStream  } from 'pages/onboard/data/income_data'
import { IOnboard } from 'types/component_types'
import { createStream} from 'services/ui_functions'


const onboard_data_Memoized = () => {

  let cache: { [key: string]: any } = {};

  return function(state: any, setValue_action: any, progress: number) {

    const cacheKey = progress.toString()

    if (cacheKey in cache) {
      return cache[cacheKey]
  } else {

    const { user_reducer, main_reducer, ui_reducer} = state

    const { maritalStatus, hasChildren } = user_reducer
  
    const newStream = newIncomeStream('red', 'employment', 'butholes', 0, true, 2020, 2029, 0)
  
  
    const array: IOnboard[] = [
      {
        //Question 1: INTRO
        component: 'Button',
        id: 'progress', //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
        reducer: 'ui_reducer',
        subTitle: 'We’ll gather some information that will enable us to build a plan suited to you.',
        title: 'Lets build you a financial Plan',
        label: 'continue',
        value: 1,
      },
      {
        //Question 2: FIRST NAME
        ask: 'This helps us personalize your plan.',
        component: 'TextInput', // tells the wizard to render a text input in which the user types their name
        id: 'firstName', //id is used by the component "TextInput" to change the "firstName" value
        label: 'First Name',
        reducer: 'user_reducer', // information is stored in the user reducer
        title: "What's your first Name?", // the question the user sees above the text input
        placeholder: 'Name', // placeholder
        type: 'text',
      },
      {
        //Question 3: BIRTH YEAR
        ask: 'This forms the basis of our financial calculations.',
        component: 'TextInput',
        id: 'birthYear',
        label: 'Birth Year',
        reducer: 'user_reducer',
        title: "What's your Birth Year?",
        placeholder: 'YYYY',
        type: 'year',
      },
      { 
        //Question 4: GENDER
        array: ['male', 'female', 'prefer not to say', 'write below'],
        ask: 'We want to ensure our planning process is inclusive.',
        component: 'MultiSelect',
        id: 'firstName',
        reducer: 'user_reducer',
        title: "What's your Gender?",
        textInput: true,
      },
      {
        //Question 4: MARITAL STATUS
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
    if (maritalStatus === 'married' || maritalStatus === 'common-law') { // if the user is married we need to gather their spouse's first name and birth
      array.push({
        //Question 4.1: SPOUSE FIRST NAME
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
        //Question 4.2: SPOUSE BIRTH YEAY
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
      //Question 5: HAS CHILDREN
      array: ['yes', 'no', 'hope to eventually', 'yes, and they are over 18'],
      ask: "We'd like to estimate your government child benefits.",
      component: 'MultiSelect',
      id: 'hasChildren',
      reducer: 'user_reducer',
      title: 'Do you have children?',
      textInput: false,
    })
  
    //  ------ADD TO ARRAY IF USER HAS CHILDREN
    if (hasChildren === 'yes' || hasChildren === 'hopeToEventually') {// if the user has children we need to gather the number and birth years of the children
      array.push({
         //Question 5.1: NUMBER OF CHILDREN
        ask: "We'd like to estimate your government child benefits.",
        component: 'NumberSelect',
        id: 'numberOfChildren',
        value: 4,
        reducer: 'user_reducer',
        title: 'How many children?',
      })
    }
  
     //Question 6: ADD INCOME TO CHART?
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
      onClick: function () { //the onClick function adds a new income stream into the reducer which enables the user to edit it
        createStream(newStream, setValue_action, 'userIncome')
      },
    })
  
      //  ------ADD TO INCOME STREAMS TO ARRAY
      // Here need to map through all the income streams and add them to the primary array.  
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
  
        //Question 6: ADD SPOUSE'S INCOME TO CHART?
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
  
      //  ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
      // Here need to map through all the income streams and add them to the primary array.  
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
    console.log(array);
    return cache[cacheKey] = array
  }
  }
}

/**
 * onboard_data() returns the main array that forms the basis of our wizard. The array is a function that changes according to the selections of the user. 
 * It contains objects which are mapped through and tell the Wizard what components to render, these components collect information from the user such as their first name. 
 * It begins as a nearly empty array with the base questions being asked of the user. According to their selections different objects are pushed to the array. 
 *  */

export const onboard_data = onboard_data_Memoized()