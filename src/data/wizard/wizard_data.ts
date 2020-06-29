import { IOnboard } from "types/component_types"
import { createStream, newIncomeStream, newSavingsStream, newPropertyStream, newDebtStream } from "services/create_functions"

import { addInstanceArray, savingsAccountsArray } from "services/wizard_functions"

export const onboard_data = (state: any, set: any, progress: number, remove: any) => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { maritalStatus, hasChildren, user1BirthYear, user1Name, user2Name, ownHome, hasUnsecuredDebt } = user_reducer

  const { colorIndex}   = ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)
  const propertyStream = newPropertyStream()

  const wizardArray: IOnboard[] = [
    {
      //Question 1: INTRO
      component: "Button",
      subTitle: "In order to build your plan we'll need some details about your situation.",
      title: "Lets build you a financial Plan",
      valid: true, 
      label: "continue",
      onClick: () => set("progress", "ui_reducer", 1),
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
      valid: user_reducer.user1Name.length > 1, 
    },
    {
      //Question 3: BIRTH YEAR
      ask: "This forms the basis of our financial calculations.",
      component: "TextInput", //Text input will capture their birthyear
      id: "user1BirthYear", //the year will be stored under this name in the user_reducer
      label: "Birth Year", //label shown above text box
      reducer: "user_reducer", //reducer we want the information stored in
      title: "What's your Birth Year?", //question at top of page
      placeholder: "YYYY",
      type: "year", //by setting it as type year the component will place valiation on the text
    },
    {
      //Question 4: GENDER
      array: ["male", "female", "prefer not to say", "write below"], //wizardArray of options shown in component
      ask: "We want to ensure our planning process is inclusive.",
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      id: "user1Gender", //the gender will be stored under this name in the user_reducer
      reducer: "user_reducer", //reducer we want the information stored in
      title: "What's your Gender?",
      textInput: true, //enables a text input box for the user to write their gender if they want
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
    wizardArray.push({
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
    wizardArray.push({
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

  wizardArray.push({
    //Question 5: HAS CHILDREN
    array: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
    ask: "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
    component: "PickSingleOption",
    id: "hasChildren",
    reducer: "user_reducer",
    title: "Do you have children?",
    textInput: false,
  })

  //  ------ADD TO ARRAY IF USER HAS CHILDREN
  if (hasChildren === "yes" || hasChildren === "hope to eventually") {
    // if the user has children we need to gather the number and birth years of the children
    wizardArray.push({
      //Question 5.1: NUMBER OF CHILDREN
      ask:
        hasChildren === "yes"
          ? "We'd like to estimate your government child benefits."
          : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
      component: "PickNumber",
      id: "numberOfChildren",
      value: 3,
      reducer: "user_reducer",
      title: "How many children?",
      onClick: number => set(`child${number}BirthYear`, "user_reducer", 2000),
    })
  }

  // //INCOME SECTION DON"T remove

  //Question 6: ADD INCOME TO CHART?
  wizardArray.push({
    ask:
      "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
    component: "Button",
    id: "progress", //I only want the "Continue" button to make the change, so it sets the progress forward in the reducer.
    reducer: "ui_reducer",
    subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
    title: "We need some details about your income.",
    label: "lets go",
    onClick() {
      set("progress", "ui_reducer", progress + 1)
      createStream(colorIndex, incomeStream, set, "income", "user1")
    },
  })

  //  ------ADD TO INCOME STREAMS TO ARRAY
  // Here need to map through all the income streams and add them to the primary wizardArray.
  addInstanceArray(main_reducer, "user1Income", "onboard", remove, set, state, "income", wizardArray)

  //Question 6: ADD SPOUSE'S INCOME TO CHART?
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    wizardArray.push({
      ask:
        "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
      component: "DualSelect",
      id: "selectedUser",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Would you like to add your spouses income?",
      onClick1: () => createStream(colorIndex, incomeStream, set, "income", "user2"),
      onClick2: () => null,
    })
  }
  // ------ADD SPOUSE'S INCOME STREAMS TO ARRAY
  //Here need to map through all the income streams and add them to the primary wizardArray.
  addInstanceArray(main_reducer, "user2Income", "onboard", remove, set, state, "income", wizardArray)

  // ASK IF THEY HAVE INVESTMENTS
  wizardArray.push({
    array: savingsAccountsArray,
    ask: "We'll use this info to see how much income in retirement your investments will provide",
    component: "PickMultipleOptions",
    id: "progress",
    user: "user1",
    reducer: "ui_reducer",
    title: maritalStatus === "married" ? `Does ${user1Name} have investments?` : "Do you have investments?",
    onClick: reg => createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user1"),
  })
  //  ------ADD TO SAVINGS STREAMS TO ARRAY
  //  Here need to map through all the savings streams and add them to the primary wizardArray.

  addInstanceArray(main_reducer, "user1Savings", "onboard", remove, set, state, "savings", wizardArray)

  // ------ ASK IF THEIR SPOUSE HAS INVESTMENTS
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    wizardArray.push({
      array: savingsAccountsArray,
      ask: "We'll use this info to see how much income in retirement your investments will provide",
      component: "PickMultipleOptions",
      id: "progress",
      user: "user2",
      reducer: "ui_reducer",
      title: `Does ${user2Name}  have investments?`,
      onClick: reg => createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user2"),
    })
    // ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the spouse streams and add them to the primary wizardArray.

    addInstanceArray(main_reducer, "user2Savings", "onboard", remove, set, state, "savings", wizardArray)
  }

  wizardArray.push({
    ask: "We want to add any property you might own to your net worth chart.",
    component: "DualSelect",
    id: "ownHome",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you own the home you live in, or any property?",
    onClick1: () => createStream(colorIndex, propertyStream, set, "property", "user1"),
    onClick2: () => null,
  })

  if (ownHome) {
    //------ADD PROPERTY ARRAY TO MAIN ARRAY.
    addInstanceArray(main_reducer, "Property", "onboard", remove, set, state, "property", wizardArray)
  }

  wizardArray.push({
    ask: "This is debt that isn't secured on a property. Examples are credit card debt, student loans, or lines of credit.",
    component: "DualSelect",
    id: "hasUnsecuredDebt",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you have any unsecured debt?",
    onClick1: () => createStream(colorIndex, newDebtStream(), set, "debt", "user1"),
    onClick2: () => null,
  })

  if (hasUnsecuredDebt) {
    //------ADD Unsecured debt ARRAY TO MAIN ARRAY.
    addInstanceArray(main_reducer, "Debt", "onboard", remove, set, state, "debt", wizardArray)
  }

  return {
    wizardType: "onboard",
    wizardArray,
    nextProps: {
      onClick: (setDirection, valid) => {
        setDirection("forward")
        if (valid) {
          set("progress", "ui_reducer", progress+1)
        }
      },
      valid: wizardArray[progress].valid,
    },
  }
}
