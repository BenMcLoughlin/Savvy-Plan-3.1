import { createStream, newPropertyStream, newDebtStream } from "services/create_functions"

/**
 * propertyQuestions() returns an array of objects that each represent a deatil about their property such as its value and mortgage.
 *  */

export const propertyQuestions = (instance, set: any, state: any, remove: any, parent) => {
  const { id, owner } = instance

  const { maritalStatus, user1Name, user2Name } = state.user_reducer
  const { colorIndex } = state.ui_reducer
  const propertyStream = newPropertyStream()

  const questions: any = [
    {
      ask: 'Examples could be Primary Residence, home, rental property or the address".',
      component: "TextInput",
      label: "Property Name",
      reducer: "main_reducer",
      title: "What should we call this property?",
      type: "text",
      valid: instance.name.length > 1,
      handleChange: (value: string) => set(id, "main_reducer", value, "name"),
    },
    {
      array: ["Primary Residence", "Vacation Property", "Rental Property", "Business", "Other"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "The type of property can have different tax consequences.",
      component: "PickSingleOption",
      reducer: "main_reducer",
      title: "What kind of property is it?",
      textInput: true,
      valid: instance.reg.length > 1,
      value: instance.reg,
      handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "reg"),
    },
  ]
  if (maritalStatus === "married" || maritalStatus === "common law") {
    questions.push({
      ask: "We'll use this information in the tax section.",
      component: "TripleSelector",
      childId: "owner",
      id,
      reducer: "main_reducer",
      title: "Who's name is it under?",
      textInput: true,
      valid: true,
      value: instance.owner,
      user1Name,
      user2Name,
      handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "owner"),
    })
  }

  questions.push({
    ask: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    id,
    childId: "purchaseYear",
    reducer: "main_reducer",
    valid: true,
    title: "Tell us about the value of the house",
    slider1: {
      bottomLabel: "year",
      max: 2030,
      min: 1990,
      step: 1,
      topLabel: "I bought it in ",
      type: "year",
      value: instance[`purchaseYear`],
      handleChange: (value: number) => set(id, "main_reducer", value, `purchaseYear`),
    },
    slider2: {
      bottomLabel: "purchase price",
      max: 1500000,
      min: 100000,
      step: 5000,
      topLabel: "For About ",
      value: instance[`purchasePrice`],
      handleChange: (value: number) => set(id, "main_reducer", value, `purchasePrice`),
    },
    slider3: {
      bottomLabel: "current value",
      max: 1500000,
      min: 100000,
      step: 5000,
      topLabel: "And now its worth ",
      value: instance[`currentValue`],
      handleChange: (value: number) => set(id, "main_reducer", value, `currentValue`),
    },
  })
  questions.push({
    ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
    component: "DualSelect",
    id,
    childId: "hasMortgage",
    option1: "yes",
    option2: "no",
    reducer: "main_reducer",
    value: instance.hasMortgage,
    valid: true,
    title: "Do you have a mortgage on this property?",
    handleChange: () => {
      set(id, "main_reducer", true, "hasMortgage")
    },
    handleChange2: () => {
      set(id, "main_reducer", false, "hasMortgage")
    },
  })

  if (instance["hasMortgage"]) {
    questions.push({
      ask: "We can add the debt to your networth and show you how it will play out in your plan.",
      component: "MultiSliders",
      num: 3,
      id,
      childId: "purchaseYear",
      valid: true,
      reducer: "main_reducer",
      title: `We need some mortgage details for ${instance.name}`,
      slider1: {
        bottomLabel: "on the balance",
        max: 1000000,
        min: 0,
        step: 1000,
        topLabel: "I currently owe",
        value: instance[`mortgageBalance`],
        handleChange: (value: number) => set(id, "main_reducer", value, `mortgageBalance`),
      },
      slider2: {
        bottomLabel: "mortgage rate",
        max: 5,
        min: 0,
        step: 0.1,
        topLabel: "With a rate of",
        type: "percentage",
        value: instance[`mortgageRate`],
        handleChange: (value: number) => set(id, "main_reducer", value, `mortgageRate`),
      },
      slider3: {
        bottomLabel: "Years Remaining ",
        max: 35,
        min: 0,
        step: 1,
        topLabel: "And have",
        value: instance[`mortgageAmortization`],
        handleChange: (value: number) => set(id, "main_reducer", value, `mortgageAmortization`),
      },
    })
  }
  questions.push({
    ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
    component: "DualSelect",
    id: "change",
    option1: "yes",
    option2: "no",
    reducer: "ui_reducer",
    title: "Would you like to add another property to the chart?",
    value: state.ui_reducer.dualSelectValue,
    valid: true,
    handleChange: () => {
      set("dualSelectValue", "ui_reducer", true)
      createStream(colorIndex, propertyStream, set, "property", owner)
    },
    handleChange2: (streamCreated: boolean) => {
      set("dualSelectValue", "ui_reducer", false)
      if (streamCreated) remove(id)
    },
  })
  return {
    questionsType: "property",
    questions,
  }
}

export const debtQuestions = (instance, set: any, state: any, remove: any) => {
  const { ui_reducer } = state

  const { id, owner } = instance

  const { maritalStatus, user1Name, user2Name } = state.user_reducer
  const { colorIndex } = ui_reducer

  const questions: any = [
    {
      ask: 'Examples could be Primary Residence, home, rental property or the address".',
      component: "TextInput",
      label: "Debt Name",
      title: "What should we call this debt?",
      placeholder: "",
      type: "text",
      valid: instance.name.length > 2,
      value: instance.name,
      handleChange: (value: string) => set(id, "main_reducer", value, "name"),
    },
    {
      array: ["Credit Card", "Student Loan", "Line of Credit", "Business loan", "Other"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "The type of property can have different tax consequences.",
      component: "PickSingleOption",
      valid: instance.reg.length > 2,
      value: instance.reg,
      title: "What kind of unsecured debt is it?",
      textInput: true,
      handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "reg"),
    },
  ]
  if (maritalStatus === "married" || maritalStatus === "common law") {
    questions.push({
      ask: "We'll use this information in the tax section.",
      component: "TripleSelector",
      user1Name,
      user2Name,
      valid: true,
      title: "Who's name is it under?",
      textInput: true,
      handleChange: (value: number) => set(id, "main_reducer", value, "owner"),
    })
  }
  questions.push({
    ask: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    id,
    title: "Tell us about the debt",
    valid: true,
    slider1: {
      bottomLabel: "on the balance",
      max: 100000,
      min: 0,
      step: 100,
      topLabel: "I carry about ",
      value: instance.balance,
      handleChange: (value: number) => set(id, "main_reducer", value, `balance`),
    },
    slider2: {
      bottomLabel: "per year",
      max: 30,
      min: 0,
      step: 1,
      topLabel: "My Interest rate is",
      type: "percentage",
      value: instance.rate,
      handleChange: (value: number) => set(id, "main_reducer", value, `rate`),
    },
    slider3: {
      bottomLabel: "per month",
      max: 10000,
      min: 0,
      step: 100,
      topLabel: "I make payments of ",
      value: instance.payment,
      handleChange: (value: number) => set(id, "main_reducer", value, `payment`),
    },
  })

  questions.push({
    ask: "The more debt streams you add the better an idea you'll get of your finanical position and the long term impact of the debt.",
    component: "DualSelect",
    id: "change",
    value: ui_reducer.dualSelectValue,
    option1: "yes",
    valid: true,
    option2: "no",
    reducer: "ui_reducer",
    title: "Would you like to add any other debt to the plan?",
    handleChange: () => {
      set("dualSelectValue", "ui_reducer", true)
      createStream(colorIndex, newDebtStream(), set, "debt", owner)
    },
    handleChange2: () => {
      set("newStream", "ui_reducer", false)
      set("dualSelectValue", "ui_reducer", false)
    },
  })

  return {
    questionsType: "debt",
    questions,
  }
}
