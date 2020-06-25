import { createIncomeArray } from "data/wizard/income_data"
import { createSavingsArray } from "data/wizard/savings_data"
import { createPropertyArray, createDebtArray } from "data/wizard/netWorth_data"
import { IOnboard } from "types/component_types"
import { createStream, newIncomeStream, newSavingsStream, newPropertyStream, newDebtStream } from "services/ui_functions"

import {addInstanceArray} from "services/wizard_functions"

export const onboard_data = (state: any, set: any, progress: number, remove: any) => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { maritalStatus, hasChildren, user1BirthYear, user1Name, user2Name, ownHome, hasUnsecuredDebt } = user_reducer

  const { colorIndex } = ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)
  const propertyStream = newPropertyStream()

  const wizardArray: IOnboard[] = [
    {
      //Question 1: INTRO
      component: "Button",
      subTitle: "In order to build your plan we'll need some details about your situation.",
      title: "Lets build you a financial Plan",
      reducer: "ui_reducer",
      id: "progress",
      label: "continue",
      onClick() {
        set("progress", "ui_reducer", 1)
      },
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
      onClick: function (number) {
        set(`child${number}BirthYear`, "user_reducer", 2000)
      },
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
  addInstanceArray(main_reducer, "user1Income", remove, set, state, "income", wizardArray)
  // Object.values(main_reducer)
  //   .filter((d: any) => d.id.includes("user1Income"))
  //   .map((instance: any) => {
  //     //looks at all the income streams listed in the main reducer
  //     const incomeData = createIncomeArray(instance, set, state, remove, "onboard") //creates an wizardArray for each income incomeStream, enabling the user to change individual details in the wizard
  //     return incomeData.wizardArray.map(
  //       (d: any) => wizardArray.push(d) //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
  //     )
  //   })

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
      onClick: function () {
        createStream(colorIndex, incomeStream, set, "income", "user2")
      },
      onClick2(id) {
        remove(id)
      },
    })
    // ------ADD SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the income streams and add them to the primary wizardArray.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("user2Income"))
      .map((instance: any) => {
        //looks at all the income streams listed in the main reducer
        const incomeData = createIncomeArray(instance, set, state, remove, "onboard") //creates an wizardArray for each income incomeStream, enabling the user to change individual details in the wizard
        return incomeData.wizardArray.map((d: any, i: number) => {
          //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
          wizardArray.push(d)
        })
      })
  }

  // ASK IF THEY HAVE INVESTMENTS
  wizardArray.push({
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
        label: "personal, nopersonalistered",
        subTitle: "",
        reg: "Personal",
        info:
          "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
      },
      {
        label: "Locked in Retirement Account",
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
    user: "user1",
    reducer: "ui_reducer",
    title: maritalStatus === "married" ? `Does ${user1Name} have investments?` : "Do you have investments?",
    onClick: function (reg) {
      createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user1")
    },
  })

  // //  ------ADD TO SAVINGS STREAMS TO ARRAY
  // // Here need to map through all the savings streams and add them to the primary wizardArray.
  Object.values(main_reducer)
    .filter((d: any) => d.id.includes("user1Savings"))
    .map((instance: any) => {
      //looks at all the savings streams listed in the main reducer
      const savingsData = createSavingsArray(instance, set, state, remove) //creates an wizardArray for each savings savingsStream, enabling the user to change individual details in the wizard
      return savingsData.wizardArray.map((d: any, i: number) => {
        //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
        wizardArray.push(d)
      })
    })

  // ------ ASK IF THEIR SPOUSE HAS INVESTMENTS
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    wizardArray.push({
      array: [
        {
          label: "tax free savings account",
          reg: "TFSA",
          info:
            "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
        },
        {
          label: "registered retirement savings",
          reg: "RRSP",
          info:
            "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
        },
        {
          label: "personal, nopersonalistered",
          subTitle: "",
          reg: "personal",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Locked in Retirement Account",
          reg: "LIRA",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Pension",
          reg: "Pension",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "RESP",
          reg: "RESP",
          info:
            "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributions and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
        },
        { label: "none", reg: "none" },
      ],
      ask: "We'll use this info to see how much income in retirement your investments will provide",
      component: "PickMultipleOptions",
      id: "progress",
      user: "user2",
      reducer: "ui_reducer",
      title: `Does ${user2Name}  have investments?`,
      onClick: function (reg) {
        createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 55), set, `savings`, "user2")
      },
    })
    // ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the spouse streams and add them to the primary wizardArray.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("user2Savings"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer
        const savingsData = createSavingsArray(instance, set, state, remove) //creates an wizardArray for each savings savingsStream, enabling the user to change individual details in the wizard
        savingsData.wizardArray.map((d: any, i: number) => {
          //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
          wizardArray.push(d)
        })
      })
  }

  wizardArray.push({
    ask: "We want to add any property you might own to your net worth chart.",
    component: "DualSelect",
    id: "ownHome",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you own the home you live in, or any property?",
    onClick: function () {
      createStream(colorIndex, propertyStream, set, "property", "user1")
    },
    onClick2(id) {
      remove(id)
    },
  })

  if (ownHome) {
    //------ADD PROPERTRY ARRAY TO MAIN ARRAY.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("Property"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer to find those related to property
        const propertyData = createPropertyArray(instance, set, state, remove) //creates an wizardArray for each savings savingsStream, enabling the user to change individual details in the wizard
        propertyData.wizardArray.map((d: any, i: number) => {
          //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
          wizardArray.push(d)
        })
      })
  }

  wizardArray.push({
    ask: "This is debt that isn't secured on a property. Examples are credit card debt, student loans, or lines of credit.",
    component: "DualSelect",
    id: "hasUnsecuredDebt",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you have any unsecured debt?",
    onClick: function () {
      createStream(colorIndex, newDebtStream(), set, "debt", "user1")
    },
    onClick2(id) {
      remove(id)
    },
  })

  if (hasUnsecuredDebt) {
    //------ADD PROPERTRY ARRAY TO MAIN ARRAY.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("Debt"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer to find those related to property
        const debtData = createDebtArray(instance, set, state, remove) //creates an wizardArray for each savings savingsStream, enabling the user to change individual details in the wizard
        debtData.wizardArray.map((d: any, i: number) => {
          //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
          wizardArray.push(d)
        })
      })
  }

  return {
    wizardType: "onboard",
    wizardArray,
  }
}
