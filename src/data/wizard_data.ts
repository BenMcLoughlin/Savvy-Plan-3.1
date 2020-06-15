import { createIncomeArray } from "data/income_data"
import { createSavingsArray } from "data/savings_data"
import { IOnboard } from "types/component_types"
import { createStream, newStream } from "services/ui_functions"
import { colorArray_data } from "styles/color_data"

export const onboard_data = (state: any, setValue_action: any, progress: number) => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { maritalStatus, hasChildren, user1BirthYear, user1Name, hasSavings, user2Name } = user_reducer

  const thisYear = new Date().getFullYear()

  const { id, colorIndex } = ui_reducer

  const incomeStream = newStream("#00BDD3", "Employment", "Wal Mart Income", 0, true, +user1BirthYear + 18, 15000, +user1BirthYear + 40)

  const array: IOnboard[] = [
    {
      //Question 1: INTRO
      component: "Button",
      id: "progress", //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
      reducer: "ui_reducer",
      subTitle: "We’ll gather some information that will enable us to build a plan suited to you.",
      title: "Lets build you a financial Plan",
      label: "continue",
      value: 1,
    },
    {
      //Question 2: FIRST NAME
      ask: "This helps us personalize your plan.",
      component: "TextInput", // tells the wizard to render a text input in which the user types their name
      id: "user1Name", //id is used by the component "TextInput" to change the "user1Name" value
      label: "First Name", //label of the Text input component
      reducer: "user_reducer", // information is stored in the user reducer
      title: "What's your first Name?", // the question the user sees above the text input
      placeholder: "Name", // placeholder
      type: "text",
    },
    {
      //Question 3: BIRTH YEAR
      ask: "This forms the basis of our financial calculations.",
      component: "TextInput",
      id: "user1BirthYear",
      label: "Birth Year",
      reducer: "user_reducer",
      title: "What's your Birth Year?",
      placeholder: "YYYY",
      type: "year",
    },
    {
      //Question 4: GENDER
      array: ["male", "female", "prefer not to say", "write below"],
      ask: "We want to ensure our planning process is inclusive.",
      component: "PickSingleOption",
      id: "user1Gender",
      reducer: "user_reducer",
      title: "What's your Gender?",
      textInput: true,
    },
    {
      //Question 4: MARITAL STATUS
      array: ["single", "married", "common-law", "write below"],
      ask: "Having a spouse has a large impact on your plan",
      component: "PickSingleOption",
      id: "maritalStatus",
      reducer: "user_reducer",
      title: "What's your marital status?",
      textInput: true,
    },
  ]

  //  ------ADD TO ARRAY IF USER IS MARRIED
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    // if the user is married we need to gather their spouse's first name and birth
    array.push({
      //Question 4.1: SPOUSE FIRST NAME
      ask: "We'll use this to keep your details seperate from your spouse.",
      component: "TextInput",
      id: "user2Name",
      label: "Spouse's First Name",
      reducer: "user_reducer",
      title: "What's your spouse's first Name?",
      placeholder: "Name",
      type: "text",
    })
    array.push({
      //Question 4.2: SPOUSE BIRTH YEAY
      ask: "This will form the basis of our financial calculations",
      component: "TextInput",
      id: "user2BirthYear",
      label: "Spouse's Birth Year",
      reducer: "user_reducer",
      title: "What's your spouse's birth Year?",
      placeholder: "YYYY",
      type: "year",
    })
  }

  array.push({
    //Question 5: HAS CHILDREN
    array: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
    ask: "We'd like to estimate your government child benefits.",
    component: "PickSingleOption",
    id: "hasChildren",
    reducer: "user_reducer",
    title: "Do you have children?",
    textInput: false,
  })

  //  ------ADD TO ARRAY IF USER HAS CHILDREN
  if (hasChildren === "yes" || hasChildren === "hopeToEventually") {
    // if the user has children we need to gather the number and birth years of the children
    array.push({
      //Question 5.1: NUMBER OF CHILDREN
      ask: "We'd like to estimate your government child benefits.",
      component: "PickNumber",
      id: "numberOfChildren",
      value: 3,
      reducer: "user_reducer",
      title: "How many children?",
      onClick: function(number) {
        setValue_action(`child${number}BirthYear`, "user_reducer", 2000)
      },
    })
  }

  //INCOME SECTION DON"T DELETE

  // //Question 6: ADD INCOME TO CHART?
  // array.push({
  //   ask:
  //     "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
  //   component: "Button",
  //   id: "progress", //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
  //   reducer: "ui_reducer",
  //   subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
  //   title: "We need some details about your income.",
  //   label: "lets go",
  //   value: progress + 1,
  //   onClick: function () {
  //     //the onClick function adds a new income incomeStream into the reducer which enables the user to edit it
  //     createStream(colorIndex, incomeStream, setValue_action, "userIncome")
  //   },
  // })

  // //  ------ADD TO INCOME STREAMS TO ARRAY
  // // Here need to map through all the income streams and add them to the primary array.
  // Object.values(main_reducer)
  //   .filter((d: any) => d.id.includes("userIncome"))
  //   .map((instance: any) => {
  //     //looks at all the income streams listed in the main reducer
  //     const incomeData = createIncomeArray(instance, setValue_action, state) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
  //     incomeData.map((d: any, i: number) => {
  //       //maps through the array and pushes the contents to the main array that controls the wizard
  //       array.push(d)
  //     })
  //   })

  // //Question 6: ADD SPOUSE'S INCOME TO CHART?
  // if (maritalStatus === "married" || maritalStatus === "common-law") {
  //   array.push({
  //     ask:
  //       "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
  //     component: "DualSelect",
  //     id: "selectedUser",
  //     value1: "yes",
  //     value2: "no",
  //     reducer: "ui_reducer",
  //     title: "Would you like to add your spouses income?",
  //     onClick: function () {
  //       createStream(colorIndex, incomeStream, setValue_action, "spouseIncome")
  //     },
  //   })
  //   // ------ADD SPOUSE'S INCOME STREAMS TO ARRAY
  //   //Here need to map through all the income streams and add them to the primary array.
  //   Object.values(main_reducer)
  //     .filter((d: any) => d.id.includes("spouseIncome"))
  //     .map((instance: any) => {
  //       //looks at all the income streams listed in the main reducer
  //       const incomeData = createIncomeArray(instance, setValue_action, state) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
  //       incomeData.map((d: any, i: number) => {
  //         //maps through the array and pushes the contents to the main array that controls the wizard
  //         array.push(d)
  //       })
  //     })
  // }

  // ASK IF THEY HAVE INVESTMENTS
  array.push({
    array: [
      {
        label: "tax free savings account",
        subTitle: "for tax-free investing",
        reg: "TFSA",
        info:
          "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
      },
      {
        label: "registered retirement savings",
        subTitle: "for investing towards retirement",
        reg: "RRSP",
        info:
          "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
      },
      {
        label: "personal, non-registered",
        subTitle: "",
        reg: "N-Reg",
        info:
          "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
      },
      {
        label: "Lira",
        subTitle: "for funds from former employers",
        reg: "LIRA",
        info:
          "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
      },
      {
        label: "Pension",
        subTitle: "for funds from former employers",
        reg: "Pension",
        info:
          "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
      },
      {
        label: "RESP",
        subTitle: "for children's education",
        reg: "RESP",
        info:
          "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributions and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
      },
      { label: "none", reg: "none" },
    ],
    ask: "We'll use this info to see how much income in retirement your investments will provide",
    component: "PickMultipleOptions",
    id: "progress",
    user: "User1",
    reducer: "ui_reducer",
    title: maritalStatus === "married" ? `Does ${user1Name} have investments?` : "Do you have investments?",
    onClick: function (account) {
      createStream(
        colorIndex,
        newStream(colorArray_data[colorIndex], account, `${account}`, 0, true, thisYear, 0, +user1BirthYear + 55),
        setValue_action,
        `savingsUser1${account}`
      )
    },
  })


  // //  ------ADD TO SAVINGS STREAMS TO ARRAY
  // // Here need to map through all the savings streams and add them to the primary array.
  Object.values(main_reducer)
    .filter((d: any) => d.id.includes("savingsUser1"))
    .map((instance: any) => {
      //looks at all the savings streams listed in the main reducer
      const savingsData = createSavingsArray(instance, setValue_action, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
      savingsData.map((d: any, i: number) => {
        //maps through the array and pushes the contents to the main array that controls the wizard
        array.push(d)
      })
    })

  // ------ ASK IF THEIR SPOUSE HAS INVESTMENTS
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    array.push({
      array: [
        {
          label: "tax free savings account",
          subTitle: "for tax-free investing",
          reg: "TFSA",
          info:
            "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
        },
        {
          label: "registered retirement savings",
          subTitle: "for investing towards retirement",
          reg: "RRSP",
          info:
            "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
        },
        {
          label: "personal, non-registered",
          subTitle: "",
          reg: "N-Reg",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Lira",
          subTitle: "for funds from former employers",
          reg: "LIRA",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Pension",
          subTitle: "for funds from former employers",
          reg: "Pension",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "RESP",
          subTitle: "for children's education",
          reg: "RESP",
          info:
            "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributions and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
        },
        { label: "none", reg: "none" },
      ],
      ask: "We'll use this info to see how much income in retirement your investments will provide",
      component: "PickMultipleOptions",
      id: "progress",
      user: "User2",
      reducer: "ui_reducer",
      title: `Does ${user2Name}  have investments?`,
      onClick: function (account) {
        createStream(
          colorIndex,
          newStream(colorArray_data[colorIndex], account, `account`, 0, true, thisYear, 0, +user1BirthYear + 55),
          setValue_action,
          `savingsUser2${account}`
        )
      },
    })
    // ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the spouse streams and add them to the primary array.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("savingsUser2"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer
        const savingsData = createSavingsArray(instance, setValue_action, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
        savingsData.map((d: any, i: number) => {
          //maps through the array and pushes the contents to the main array that controls the wizard
          array.push(d)
        })
      })
  }

  array.push({
    ask:
      "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
    component: "DualSelect",
    id: "selectedUser",
    value1: "rent",
    value2: "own",
    reducer: "ui_reducer",
    title: "Do you rent or own your home?",
    onClick: function () {
      createStream(colorIndex, incomeStream, setValue_action, "spouseIncome")
    },
  })

  console.log(array)
  return array
}

//MEMORIZED VERSION
// const onboard_data_Memoized = () => {

//   let cache: { [key: string]: any } = {};

//   return function(state: any, setValue_action: any, progress: number) {

//     const cacheKey = progress.toString()

//     if (cacheKey in cache) {
//       return cache[cacheKey]
//   } else {

//     const { user_reducer, main_reducer, ui_reducer} = state

//     const { maritalStatus, hasChildren } = user_reducer

//     const newStream = newStream('red', 'Employment', 'Wal Mart Income', 0, true, 2010, 1000, 2029)

//     const array: IOnboard[] = [
//       {
//         //Question 1: INTRO
//         component: 'Button',
//         id: 'progress', //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
//         reducer: 'ui_reducer',
//         subTitle: 'We’ll gather some information that will enable us to build a plan suited to you.',
//         title: 'Lets build you a financial Plan',
//         label: 'continue',
//         value: 1,
//       },
//       {
//         //Question 2: FIRST NAME
//         ask: 'This helps us personalize your plan.',
//         component: 'TextInput', // tells the wizard to render a text input in which the user types their name
//         id: 'user1Name', //id is used by the component "TextInput" to change the "user1Name" value
//         label: 'First Name',
//         reducer: 'user_reducer', // information is stored in the user reducer
//         title: "What's your first Name?", // the question the user sees above the text input
//         placeholder: 'Name', // placeholder
//         type: 'text',
//       },
//       {
//         //Question 3: BIRTH YEAR
//         ask: 'This forms the basis of our financial calculations.',
//         component: 'TextInput',
//         id: 'user1BirthYear',
//         label: 'Birth Year',
//         reducer: 'user_reducer',
//         title: "What's your Birth Year?",
//         placeholder: 'YYYY',
//         type: 'year',
//       },
//       {
//         //Question 4: GENDER
//         array: ['male', 'female', 'prefer not to say', 'write below'],
//         ask: 'We want to ensure our planning process is inclusive.',
//         component: 'PickSingleOption',
//         id: 'user1Name',
//         reducer: 'user_reducer',
//         title: "What's your Gender?",
//         textInput: true,
//       },
//       {
//         //Question 4: MARITAL STATUS
//         array: ['single', 'married', 'common-law', 'write below'],
//         ask: 'Having a spouse has a large impact on your plan',
//         component: 'PickSingleOption',
//         id: 'maritalStatus',
//         reducer: 'user_reducer',
//         title: "What's your marital status?",
//         textInput: true,
//       },
//     ]

//     //  ------ADD TO ARRAY IF USER IS MARRIED
//     if (maritalStatus === 'married' || maritalStatus === 'common-law') { // if the user is married we need to gather their spouse's first name and birth
//       array.push({
//         //Question 4.1: SPOUSE FIRST NAME
//         ask: "We'll use this to keep your details seperate from your spouse.",
//         component: 'TextInput',
//         id: 'user2Name',
//         label: "Spouse's First Name",
//         reducer: 'user_reducer',
//         title: "What's your spouse's first Name?",
//         placeholder: 'Name',
//         type: 'text',
//       })
//       array.push({
//         //Question 4.2: SPOUSE BIRTH YEAY
//         ask: 'This will form the basis of our financial calculations',
//         component: 'TextInput',
//         id: 'user2BirthYear',
//         label: "Spouse's Birth Year",
//         reducer: 'user_reducer',
//         title: "What's your spouse's birth Year?",
//         placeholder: 'YYYY',
//         type: 'year',
//       })
//     }

//     array.push({
//       //Question 5: HAS CHILDREN
//       array: ['yes', 'no', 'hope to eventually', 'yes, and they are over 18'],
//       ask: "We'd like to estimate your government child benefits.",
//       component: 'PickSingleOption',
//       id: 'hasChildren',
//       reducer: 'user_reducer',
//       title: 'Do you have children?',
//       textInput: false,
//     })

//     //  ------ADD TO ARRAY IF USER HAS CHILDREN
//     if (hasChildren === 'yes' || hasChildren === 'hopeToEventually') {// if the user has children we need to gather the number and birth years of the children
//       array.push({
//          //Question 5.1: NUMBER OF CHILDREN
//         ask: "We'd like to estimate your government child benefits.",
//         component: 'PickNumber',
//         id: 'numberOfChildren',
//         value: 4,
//         reducer: 'user_reducer',
//         title: 'How many children?',
//       })
//     }

//      //Question 6: ADD INCOME TO CHART?
//     array.push({
//       ask:
//         'We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ',
//       component: 'DualSelect',
//       id: 'selectedUser',
//       option1: 'yes',
//       option2: 'no',
//       value1: 0,
//       value2: 0,
//       reducer: 'ui_reducer',
//       title: 'Would you like to add an income incomeStream to the chart?',
//       onClick: function () { //the onClick function adds a new income incomeStream into the reducer which enables the user to edit it
//         createStream(newStream, setValue_action, 'userIncome')
//       },
//     })

//       //  ------ADD TO INCOME STREAMS TO ARRAY
//       // Here need to map through all the income streams and add them to the primary array.
//     Object.values(main_reducer)
//       .filter((d: any) => d.id.includes('userIncome'))
//       .map((instance: any) => {
//         //looks at all the income streams listed in the main reducer
//         const incomeData = createIncomeArray(instance.id, setValue_action, state) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
//         incomeData.map((d: any, i: number) => {
//           //maps through the array and pushes the contents to the main array that controls the wizard
//           array.push(d)
//         })
//       })

//         //Question 6: ADD SPOUSE'S INCOME TO CHART?
//     array.push({
//       ask:
//         'We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ',
//       component: 'DualSelect',
//       id: 'selectedUser',
//       option1: 'yes',
//       option2: 'no',
//       value1: 0,
//       value2: 0,
//       reducer: 'ui_reducer',
//       title: 'Would you like to add your spouses income?',
//       onClick: function () {
//         createStream(newStream, setValue_action, 'spouseIncome')
//       },
//     })

//       //  ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
//       // Here need to map through all the income streams and add them to the primary array.
//     Object.values(main_reducer)
//       .filter((d: any) => d.id.includes('spouseIncome'))
//       .map((instance: any) => {
//         //looks at all the income streams listed in the main reducer
//         const incomeData = createIncomeArray(instance.id, setValue_action, state) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
//         incomeData.map((d: any, i: number) => {
//           //maps through the array and pushes the contents to the main array that controls the wizard
//           array.push(d)
//         })
//       })
//     console.log(array);
//     return cache[cacheKey] = array
//   }
//   }
// }

/**
 * onboard_data() returns the main array that forms the basis of our wizard. The array is a function that changes according to the selections of the user.
 * It contains objects which are mapped through and tell the Wizard what components to render, these components collect information from the user such as their first name.
 * It begins as a nearly empty array with the base questions being asked of the user. According to their selections different objects are pushed to the array.
 *  */

// export const onboard_data = onboard_data_Memoized()
