import { createIncomeArray } from "data/income_data"
import { createSavingsArray } from "data/savings_data"
import { createPropertyArray, createDebtArray } from "data/netWorth_data"
import { IOnboard } from "types/component_types"
import { createStream, newIncomeStream, newSavingsStream, newPropertyStream, newDebtStream } from "services/ui_functions"

export const onboard_data = (state: any, set: any, progress: number, remove: any) => {
  const { user_reducer, main_reducer, ui_reducer } = state

  const { maritalStatus, hasChildren, user1BirthYear, user1Name, hasSavings, user2Name, ownHome, hasUnsecuredDebt } = user_reducer

  const thisYear = new Date().getFullYear()

  const { colorIndex, id } = ui_reducer

  const incomeStream = newIncomeStream(+user1BirthYear + 18, +user1BirthYear + 40)
  const propertyStream = newPropertyStream()

  const array: IOnboard[] = [
    {
      //Question 1: INTRO
      component: "Button",
      subTitle: "We’ll gather some information that will enable us to build a plan suited to you.",
      title: "Lets build you a financial Plan",
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

  // //  ------ADD TO ARRAY IF USER IS MARRIED
  // if (maritalStatus === "married" || maritalStatus === "common-law") {
  //   // if the user is married we need to gather their spouse's first name and birth
  //   array.push({
  //     //Question 4.1: SPOUSE FIRST NAME
  //     ask: "We'll use this to keep your details seperate from your spouse.",
  //     component: "TextInput",
  //     id: "user2Name",
  //     label: "Spouse's First Name",
  //     reducer: "user_reducer",
  //     title: "What's your spouse's first Name?",
  //     placeholder: "Name",
  //     type: "text",
  //   })
  //   array.push({
  //     //Question 4.2: SPOUSE BIRTH YEAY
  //     ask: "This will form the basis of our financial calculations",
  //     component: "TextInput",
  //     id: "user2BirthYear",
  //     label: "Spouse's Birth Year",
  //     reducer: "user_reducer",
  //     title: "What's your spouse's birth Year?",
  //     placeholder: "YYYY",
  //     type: "year",
  //   })
  // }

  // array.push({
  //   //Question 5: HAS CHILDREN
  //   array: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
  //   ask: "We'd like to estimate your government child benefits.",
  //   component: "PickSingleOption",
  //   id: "hasChildren",
  //   reducer: "user_reducer",
  //   title: "Do you have children?",
  //   textInput: false,
  // })

  // //  ------ADD TO ARRAY IF USER HAS CHILDREN
  // if (hasChildren === "yes" || hasChildren === "hope to eventually") {
  //   // if the user has children we need to gather the number and birth years of the children
  //   array.push({
  //     //Question 5.1: NUMBER OF CHILDREN
  //     ask:
  //       hasChildren === "yes"
  //         ? "We'd like to estimate your government child benefits."
  //         : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
  //     component: "PickNumber",
  //     id: "numberOfChildren",
  //     value: 3,
  //     reducer: "user_reducer",
  //     title: "How many children?",
  //     onClick: function (number) {
  //       set(`child${number}BirthYear`, "user_reducer", 2000)
  //     },
  //   })
  // }

  // //INCOME SECTION DON"T remove

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
  //   onClick() {
  //     set("progress", "ui_reducer", progress + 1)
  //     createStream(colorIndex, incomeStream, set, "userIncome")
  //   },
  // })

  // //  ------ADD TO INCOME STREAMS TO ARRAY
  // // Here need to map through all the income streams and add them to the primary array.
  // Object.values(main_reducer)
  //   .filter((d: any) => d.id.includes("userIncome"))
  //   .map((instance: any) => {
  //     //looks at all the income streams listed in the main reducer
  //     const incomeData = createIncomeArray(instance, set, state, remove) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
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
  //     option1: "yes",
  //     option2: "no",
  //     reducer: "ui_reducer",
  //     title: "Would you like to add your spouses income?",
  //     onClick: function () {
  //       createStream(colorIndex, incomeStream, set, "spouseIncome")
  //     },
  //   })
  //   // ------ADD SPOUSE'S INCOME STREAMS TO ARRAY
  //   //Here need to map through all the income streams and add them to the primary array.
  //   Object.values(main_reducer)
  //     .filter((d: any) => d.id.includes("spouseIncome"))
  //     .map((instance: any) => {
  //       //looks at all the income streams listed in the main reducer
  //       const incomeData = createIncomeArray(instance, set, state, remove) //creates an array for each income incomeStream, enabling the user to change individual details in the wizard
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
        reg: "Personal",
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
    onClick: function (reg) {
      createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savingsUser1_${reg}`)
    },
  })

  // //  ------ADD TO SAVINGS STREAMS TO ARRAY
  // // Here need to map through all the savings streams and add them to the primary array.
  Object.values(main_reducer)
    .filter((d: any) => d.id.includes("savingsUser1"))
    .map((instance: any) => {
      //looks at all the savings streams listed in the main reducer
      const savingsData = createSavingsArray(instance, set, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
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
          label: "personal, non-registered",
          subTitle: "",
          reg: "N-Reg",
          info:
            "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
        },
        {
          label: "Lira",
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
      user: "User2",
      reducer: "ui_reducer",
      title: `Does ${user2Name}  have investments?`,
      onClick: function (reg) {
        createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 55), set, `savingsUser2_${reg}`)
      },
    })
    // ------ADD TO SPOUSE'S INCOME STREAMS TO ARRAY
    //Here need to map through all the spouse streams and add them to the primary array.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("savingsUser2"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer
        const savingsData = createSavingsArray(instance, set, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
        savingsData.map((d: any, i: number) => {
          //maps through the array and pushes the contents to the main array that controls the wizard
          array.push(d)
        })
      })
  }

  array.push({
    ask: "We want to add any property you might own to your net worth chart.",
    component: "DualSelect",
    id: "ownHome",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you own the home you live in, or any property?",
    onClick: function () {
      createStream(colorIndex, propertyStream, set, "property")
    },
    undo(id) {
      remove(id)
    },
  })

  if (ownHome) {
    //------ADD PROPERTRY ARRAY TO MAIN ARRAY.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("property"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer to find those related to property
        const propertyData = createPropertyArray(instance, set, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
        propertyData.map((d: any, i: number) => {
          //maps through the array and pushes the contents to the main array that controls the wizard
          array.push(d)
        })
      })
  }

  array.push({
    ask: "This is debt that isn't secured on a property. Examples are credit card debt, student loans, or lines of credit.'",
    component: "DualSelect",
    id: "hasUnsecuredDebt",
    option1: "yes",
    option2: "no",
    reducer: "user_reducer",
    title: "Do you carry any unsecured debt?",
    onClick: function () {
      createStream(colorIndex, newDebtStream(), set, "debt")
    },
    undo(id) {
      remove(id)
    },
  })

  if (hasUnsecuredDebt) {
    //------ADD PROPERTRY ARRAY TO MAIN ARRAY.
    Object.values(main_reducer)
      .filter((d: any) => d.id.includes("debt"))
      .map((instance: any) => {
        //looks at all the spouse streams listed in the main reducer to find those related to property
        const debtData = createDebtArray(instance, set, state) //creates an array for each savings savingsStream, enabling the user to change individual details in the wizard
        debtData.map((d: any, i: number) => {
          //maps through the array and pushes the contents to the main array that controls the wizard
          array.push(d)
        })
      })
  }
  console.log(array)
  return array
}
