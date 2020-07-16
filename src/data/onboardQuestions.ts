import { IComponents } from "types/component_types"
import { createStream } from "services/create_functions"
import * as I from "types"

import { insertQuestionArray, savingsAccountsArray } from "services/questions/question_functions"

export const onboardPage_data = (state: any, set: any, progress: number, remove: any) => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { maritalStatus, hasChildren, numberOfChildren,  user1Gender,  user1BirthYear, user2BirthYear, user1Name, user2Name, ownHome, hasUnsecuredDebt } = user_reducer
  // const { selectedId } = user_reducer

  const { colorIndex } = ui_reducer

  const questions: IComponents[] = [
    {
      //Question 1: INTRO
      component: "Button",
      subTitle: "In order to build your plan we'll need some details about your situation.",
      question: "Lets build you a financial Plan",
      valid: true,
      label: "continue",
      handleChange: () => set("progress", "ui_reducer", 1),
    },
    {
      //Question 2: FIRST NAME
      explanation: "This helps us personalize your plan.",
      component: "TextInput", // tells the wizard to render a text input in which the user types their name
      label: "First Name", //label of the Text input component
      question: "What's your first Name?", // the question the user sees above the text input
      placeholder: "Name", // placeholder
      type: "text",
      valid: user1Name.length > 1,
      handleChange: (value: string) => set("user1Name", "user_reducer", value),
    },
    {
      //Question 3: BIRTH YEAR
      explanation: "This forms the basis of our financial calculations.",
      component: "TextInput", //Text input will capture their birthyear
      label: "Birth Year", //label shown above text box
      question: "What's your Birth Year?", //question at top of page
      placeholder: "YYYY",
      valid: user1BirthYear.length >= 4 && user1BirthYear > 1940,
      value: user1BirthYear,
      type: "year", //by setting it as type year the component will place valiation on the text
      handleChange: (value: string) => set("user1BirthYear", "user_reducer", value),
    },
    {
      //Question 4: GENDER
      optionArray: ["male", "female", "prefer not to say", "write below"], //questions of options shown in component
      explanation: "We want to ensure our planning process is inclusive.",
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      question: "What's your Gender?",
      textInput: true, //enables a text input box for the user to write their gender if they want
      valid: maritalStatus.length > 2,
      value: user1Gender,
      handleChange: (value: string) => set("user1Gender", "user_reducer", value),
    },
    {
      //Question 4: MARITAL STATUS
      optionArray: ["single", "married", "common-law", "write below"],
      explanation: "Having a spouse has a large impact on your plan",
      component: "PickSingleOption",
      question: "What's your marital status?",
      textInput: true,
      valid: user_reducer.maritalStatus.length > 2,
      value: user_reducer.maritalStatus,
      handleChange: (value: string) => set("maritalStatus", "user_reducer", value),
    },
  ]

  //  ------ADD TO ARRAY IF USER IS MARRIED
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    // if the user is married we need to gather their spouse's first name and birth
    questions.push({
      //Question 4.1: SPOUSE FIRST NAME
      explanation: "We'll use this to keep your details seperate from your spouse.",
      component: "TextInput",
      label: "Spouse's First Name",
      question: "What's your spouse's first Name?",
      placeholder: "Name",
      type: "text",
      valid: user2Name.length > 1,
      value: user2Name,
      handleChange: (value: string) => set("user2Name", "user_reducer", value),
    })
    questions.push({
      //Question 4.2: SPOUSE BIRTH YEAY
      explanation: "This will form the basis of our financial calculations",
      component: "TextInput",
      label: "Spouse's Birth Year",
      question: "What's your spouse's birth Year?",
      placeholder: "YYYY",
      type: "year",
      valid: user2BirthYear.length >= 4 && user2BirthYear > 1940,
      value: user2BirthYear,
      handleChange: (value: string) => set("user2BirthYear", "user_reducer", value),
    })
  }

  questions.push({
    //Question 5: HAS CHILDREN
    optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
    explanation: "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
    component: "PickSingleOption",
    question: "Do you have children?",
    textInput: false,
    valid: true,
    value: hasChildren,
    handleChange: (value: string) => set("hasChildren", "user_reducer", value),
  })

  //  ------ADD TO ARRAY IF USER HAS CHILDREN
  if (hasChildren === "yes" || hasChildren === "hope to eventually") {
    // if the user has children we need to gather the number and birth years of the children
    questions.push({
      //Question 5.1: NUMBER OF CHILDREN
      explanation:
        hasChildren === "yes"
          ? "We'd like to estimate your government child benefits."
          : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
      component: "PickNumber",
      value: numberOfChildren,
      valid: numberOfChildren > 0,
      question: "How many children?",
      handleChange: (n: number) => set("numberOfChildren", "user_reducer", n),
    })
  }

  // //INCOME SECTION DON"T remove

  //Question 6: ADD INCOME TO CHART?
  questions.push({
    explanation:
      "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
    component: "Button",
    subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
    question: "We need some details about your income.",
    label: "lets go",
    valid: user_reducer.numberOfChildren > 0,
    handleChange: () => {
      set("progress", "ui_reducer", progress + 1)
      createStream(colorIndex, set, "income", "employment", "user1")
    },
  })

  //  ------ADD TO INCOME STREAMS TO ARRAY
  // Here need to map through all the income streams and add them to the primary questions.
  insertQuestionArray("user1Income", "onboard", remove, set, state, "income", questions)

  //Question 6: ADD SPOUSE'S INCOME TO CHART?
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    questions.push({
      explanation:
        "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
      component: "DualSelect",
      option1: "yes",
      option2: "no",
      value: ui_reducer.dualSelectValue,
      valid: true,
      question: "Would you like to add your spouses income?",
      handleChange: () => {
        set("dualSelectValue", "ui_reducer", true)
        createStream(colorIndex, set, "income", "employment", "user2")
      },
      handleChange2: () => {
        set("selectedId", "ui_reducer", false)
        set("dualSelectValue", "ui_reducer", false)
      },
    })
  }
  // ------ADD SPOUSE'S INCOME STREAMS TO ARRAY
  //Here need to map through all the income streams and add them to the primary questions.
  insertQuestionArray("user2Income", "onboard", remove, set, state, "income", questions)

  // ASK IF THEY HAVE INVESTMENTS
  questions.push({
    optionArray: savingsAccountsArray,
    arrayOfSelected: Object.values(main_reducer).filter((d: any) => d.id.includes(`user1Savings`)),
    explanation: "We'll use this info to see how much income in retirement your investments will provide",
    component: "PickMultipleOptions",
    user: "user1",
    value: ui_reducer.dualSelectValue,
    valid: true,
    question: maritalStatus === "married" ? `Does ${user1Name} have investments?` : "Do you have investments?",
    handleChange: (selected, d: any) => {
      if (!selected && d.label !== "none") {
        // check if the item doesnt already exist, or its not none, and will then create a new income st
        createStream(colorIndex, set, `savings`,  d.reg.toLowerCase(), "user1")
      } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
      if (selected) {
        //the user needs to be able to remove the new object if they click on it again enabling them to remove the account they added.
        const selectedInstance: any = Object.values(main_reducer).find((b: any) => b.reg === d.reg.toLowerCase()) //searches the main reducer to find the matching object to be removed
        remove(selectedInstance.id) //removes it from the main reducer
        set("selectedId", "ui_reducer", "")
      }
      if (d.label === "none") {
        //the user needs to be able to remove the new object if they click on it again enabling them to remove all accounts added
        const selectedInstances: any = Object.values(main_reducer).filter((b: any) => b.id.includes("user1Savings")) //searches the main reducer to find the matching object to be removed
        selectedInstances.map(instance => remove(instance.id))
        set("selectedId", "ui_reducer", "")
      }
    },
    //onClick: reg => createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user1"),
  })
  //  ------ADD TO SAVINGS STREAMS TO ARRAY
  //  Here need to map through all the savings streams and add them to the primary questions.

  insertQuestionArray("user1Savings", "onboard", remove, set, state, "savings", questions)

  // ------ ASK IF THEIR SPOUSE HAS INVESTMENTS
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    questions.push({
      optionArray: savingsAccountsArray,
      arrayOfSelected: Object.values(main_reducer).filter((d: any) => d.id.includes(`user2Savings`)),
      explanation: "We'll use this info to see how much income in retirement your investments will provide",
      component: "PickMultipleOptions",
      user: "user2",
      valid: true,
      question: `Does ${user2Name}  have investments?`,
      handleChange: (selected, d: any) => {
        if (!selected && d.label !== "none") {
          // check if the item doesnt already exist, or its not none, and will then create a new income st
          createStream(colorIndex, set, `savings`, d.reg.toLowerCase(), "user2")
        } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
        if (selected) {
          //the user needs to be able to remove the new object if they click on it again enabling them to onClick2 the account they added.
          const selectedInstance: any = Object.values(main_reducer).find((b: any) => b.reg === d.reg.toLowerCase()) //searches the main reducer to find the matching object to be removed
          remove(selectedInstance.id) //removes it from the main reducer
          set("selectedId", "ui_reducer", "")
        }
        if (d.label === "none") {
          //the user needs to be able to remove the new object if they click on it again enabling them to onClick2 the account they added.
          const selectedInstances: any = Object.values(main_reducer).filter((b: any) => b.id.includes("user2Savings")) //searches the main reducer to find the matching object to be removed
          selectedInstances.map(instance => remove(instance.id))
          set("selectedId", "ui_reducer", "")
        }
      },
    })
    // ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the spouse streams and add them to the primary questions.
    insertQuestionArray("user2Savings", "onboard", remove, set, state, "savings", questions)
  }

  questions.push({
    explanation: "We want to add any property you might own to your net worth chart.",
    component: "DualSelect",
    option1: "yes",
    option2: "no",
    valid: true,
    value: ui_reducer.dualSelectValue,
    question: "Do you own the home you live in, or any property?",
    handleChange: () => {
      set("dualSelectValue", "ui_reducer", true)
      set("ownHome", "user_reducer", true)
      createStream(colorIndex, set, "property", "employment", "user1")
    },
    handleChange2: () => set("dualSelectValue", "ui_reducer", false),
  })

  if (ownHome) {
    //------ADD PROPERTY ARRAY TO MAIN ARRAY.
    insertQuestionArray("Property", "onboard", remove, set, state, "property", questions)
  }

  questions.push({
    explanation: "This is debt that isn't secured on a property. Examples are credit card debt, student loans, or lines of credit.",
    component: "DualSelect",
    option1: "yes",
    option2: "no",
    valid: true,
    value: user_reducer.hasUnsecuredDebt,
    question: "Do you have any unsecured debt?",
    handleChange: () => {
      set("hasUnsecuredDebt", "user_reducer", true)
      createStream(colorIndex,  set, "debt", "Credit Card", "user1")
    },
    handleChange2: () => set("hasUnsecuredDebt", "user_reducer", false),
  })

  if (hasUnsecuredDebt) {
    //------ADD Unsecured debt ARRAY TO MAIN ARRAY.
    insertQuestionArray("Debt", "onboard", remove, set, state, "debt", questions)
  }

  return {
    streamType: "Onboarding",
    questions,
    exitButtonProps: {
      handleChange: () => {
        set("selectedId", "ui_reducer", "")
        set("newStream", "ui_reducer", false)
      },
    },
    backButtonProps: {
      handleChange: () => set("progress", "ui_reducer", progress > 0 ? progress - 1 : 1),
    },
  }
}
