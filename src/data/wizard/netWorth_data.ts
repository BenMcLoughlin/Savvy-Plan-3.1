import { createStream, newPropertyStream, newDebtStream } from "services/ui_functions"

/**
 * createPropertyArray() returns an array of objects that each represent a deatil about their property such as its value and mortgage.
 *  */

export const createPropertyArray = (instance, set: any, state: any, remove: any) => {
  const { id, owner } = instance

  const { maritalStatus } = state.user_reducer
  const { colorIndex } = state.ui_reducer
  const propertyStream = newPropertyStream()

  const wizardArray: any = [
    {
      ask: 'Examples could be Primary Residence, home, rental property or the address".',
      component: "TextInput",
      childId: "name",
      id,
      label: "Property Name",
      reducer: "main_reducer",
      title: "What should we call this property?",
      placeholder: "",
      type: "text",
    },
    {
      array: ["Primary Residence", "Vacation Property", "Rental Property", "Business", "Other"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "The type of property can have different tax consequences.",
      component: "PickSingleOption",
      childId: "reg",
      id,
      reducer: "main_reducer",
      title: "What kind of property is it?",
      textInput: true,
    },
  ]
  if (maritalStatus === "married" || maritalStatus === "common law") {
    wizardArray.push({
      ask: "We'll use this information in the tax section.",
      component: "TripleSelector",
      childId: "owner",
      id,
      reducer: "main_reducer",
      title: "Who's name is it under?",
      textInput: true,
    })
  }

  wizardArray.push({
    ask: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    id,
    childId: "purchaseYear",
    reducer: "main_reducer",
    title: "Tell us about the value of the house",
    slider1: {
      bottomLabel: "year",
      childId: "purchaseYear",
      id,
      max: 2080,
      min: 1990,
      step: 1,
      topLabel: "I bought it in ",
      reducer: "main_reducer",
      type: "year",
    },
    slider2: {
      bottomLabel: "purchase price",
      childId: "purchasePrice",
      id,
      max: 1500000,
      min: 0,
      step: 5000,
      topLabel: "For About ",
      reducer: "main_reducer",
    },
    slider3: {
      bottomLabel: "current value",
      childId: "currentValue",
      id,
      max: 1500000,
      min: 0,
      step: 5000,
      topLabel: "And now its worth ",
      reducer: "main_reducer",
    },
  })
  wizardArray.push({
    ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
    component: "DualSelect",
    id,
    childId: "hasMortgage",
    option1: "yes",
    option2: "no",
    reducer: "main_reducer",
    title: "Do you have a mortgage on this property?",
  })

  if (instance["hasMortgage"]) {
    wizardArray.push({
      ask: "We can add the debt to your networth and show you how it will play out in your plan.",
      component: "MultiSliders",
      num: 3,
      id,
      childId: "purchaseYear",
      reducer: "main_reducer",
      title: `We need some mortgage details for ${instance.name}`,
      slider1: {
        bottomLabel: "on the balance",
        childId: "mortgageBalance",
        id,
        max: 1000000,
        min: 0,
        step: 1000,
        topLabel: "I currently owe",
        reducer: "main_reducer",
      },
      slider2: {
        bottomLabel: "mortgage rate",
        childId: "mortgageRate",
        id,
        max: 5,
        min: 0,
        step: 0.1,
        topLabel: "With a rate of",
        reducer: "main_reducer",
        type: "percentage",
      },
      slider3: {
        bottomLabel: "Years Remaining ",
        childId: "mortgageAmortization",
        id,
        max: 35,
        min: 0,
        step: 1,
        topLabel: "And have",
        reducer: "main_reducer",
      },
    })
  }
  wizardArray.push({
    ask: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
    component: "DualSelect",
    id: "change",
    option1: "yes",
    option2: "no",
    reducer: "ui_reducer",
    title: "Would you like to add another property to the chart?",
    onClick: function () {
      createStream(colorIndex, propertyStream, set, "property", owner)
    },
    onClick2(id) {
      remove(id)
    },
  })
  return {
    wizardType: "property",
    wizardArray,
  }
}

export const createDebtArray = (instance, set: any, state: any, remove: any) => {
  const { id, owner } = instance

  const { maritalStatus } = state.user_reducer
  const { colorIndex } = state.ui_reducer
  const propertyStream = newPropertyStream()

  const wizardArray: any = [
    {
      ask: 'Examples could be Primary Residence, home, rental property or the address".',
      component: "TextInput",
      childId: "name",
      id,
      label: "Debt Name",
      reducer: "main_reducer",
      title: "What should we call this debt?",
      placeholder: "",
      type: "text",
    },
    {
      array: ["Credit Card", "Student Loan", "Line of Credit", "Business loan", "Other"], // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
      ask: "The type of property can have different tax consequences.",
      component: "PickSingleOption",
      childId: "reg",
      id,
      reducer: "main_reducer",
      title: "What kind of unsecured debt is it?",
      textInput: true,
    },
  ]
  if (maritalStatus === "married" || maritalStatus === "common law") {
    wizardArray.push({
      ask: "We'll use this information in the tax section.",
      component: "TripleSelector",
      childId: "owner",
      id,
      reducer: "main_reducer",
      title: "Who's name is it under?",
      textInput: true,
    })
  }
  wizardArray.push({
    ask: "We'll add it to the charts. If you plan to buy property in the future we can add that too.",
    component: "MultiSliders",
    num: 3,
    id,
    childId: "balance",
    reducer: "main_reducer",
    title: "Tell us about the debt",
    slider1: {
      bottomLabel: "on the balance",
      childId: "balance",
      id,
      max: 100000,
      min: 0,
      step: 100,
      topLabel: "I carry about ",
      reducer: "main_reducer",
    },
    slider2: {
      bottomLabel: "per year",
      childId: "rate",
      id,
      max: 30,
      min: 0,
      step: 1,
      topLabel: "My Interest rate is",
      reducer: "main_reducer",
      type: "percentage",
    },
    slider3: {
      bottomLabel: "per month",
      childId: "payment",
      id,
      max: 10000,
      min: 0,
      step: 100,
      topLabel: "I make payments of ",
      reducer: "main_reducer",
    },
  })

  wizardArray.push({
    ask: "The more debt streams you add the better an idea you'll get of your finanical position and the long term impact of the debt.",
    component: "DualSelect",
    id: "change",
    option1: "yes",
    option2: "no",
    reducer: "ui_reducer",
    title: "Would you like to add any other debt to the plan?",
    onClick: function () {
      createStream(colorIndex, newDebtStream(), set, "debt", owner)
    },
    onClick2(id) {
      remove(id)
    },
  })

  return {
    wizardType: "debt",
    wizardArray,
  }
}
