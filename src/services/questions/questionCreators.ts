import { q_data } from "data/questions_data"
import {createStreamV2 } from "services/create_functions"
import { createDebtSliders, createMortgageSliders, createTripleSliders, createTripleSlidersV2, createPropertySliders, createSavingsSliders } from "services/questions/createTripleSliders"

export const getName = (q, user, state, set) => {
  const name = state.user_reducer[user].firstName
  return q.push({
  data: `${user}Name`,
  component: "TextInput", // tells the wizard to render a text input in which the user types their name
  streamType: "text",
  valid: name.length > 1,
  handleChange: (value: string) => set(user, "user_reducer", value, 'firstName'),
  })
}

export const getBirthYear = (q, user, state, set) => {
  const birthYear = state.user_reducer[user].birthYear
  return q.push({
    data: `${user}BirthYear`,
    component: "TextInput", //Text input will capture their birthyear
    valid: birthYear.length >= 4 && birthYear > 1940,
    value: birthYear,
    streamType: "year", //by setting it as streamType year the component will place valiation on the text
    handleChange: (value: string) => set(user, "user_reducer", value, 'birthYear'),
  })
}
export const getGender = (q, user, state, set) => {
  const { gender }= state.user_reducer[user]

  return  q.push({
    data: `${user}Gender`,
    component: "PickSingleOption", //this component allows the user to choose one of a number of options
    textInput: true, //enables a text input box for the user to write their gender if they want
    valid: gender.length > 2,
    value: gender,
    handleChange: (value: string) => set(user, "user_reducer", value, 'gender'),
  })
}

export const getMaritalStatus = (q, state, set) => {
  const  { maritalStatus } = state.user_reducer
 q.push({ data: "maritalStatus",
    component: "PickSingleOption",
    textInput: true,
    valid: maritalStatus.length > 2,
    value: maritalStatus,
    handleChange: (value: string) => set("maritalStatus", "user_reducer", value),
  })
  if (maritalStatus === "married" || maritalStatus === "common-law") {
    // userDetails(q, 'user2', state, set)
  } 

}

export const getChildren = (q, state, set) => {
  const { haveChildren, numberOfChildren} = state.user_reducer

  q.push({ data: "haveChildren",
    component: "PickSingleOption",
    textInput: true,
    valid: haveChildren.length > 1,
    value: haveChildren,
    handleChange: (value: string) => set("haveChildren", "user_reducer", value),
  })
  
if (haveChildren === "yes" || haveChildren === "hope to eventually") {
  q.push({
    data: "numberOfChildren",
    explanation:
      haveChildren === "yes"
        ? "We'd like to estimate your government child benefits."
        : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
    component: "PickNumberWithText",
    value: numberOfChildren,
    childValue: numberOfChildren,
    valid: numberOfChildren > 0,
    handleChange: (n: any) => set("numberOfChildren", "user_reducer", n),
    handleChange2: (value: string, childId1: string) => set(`${childId1}`, "user_reducer", value),
  })
}
}

export const numberOfChildren = (q, state, set) => {
  const { haveChildren, numberOfChildren} = state.user_reducer
  q.push({
    data: "numberOfChildren",
    explanation:
      haveChildren === "yes"
        ? "We'd like to estimate your government child benefits."
        : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
    component: "PickNumberWithText",
    value: numberOfChildren,
    childValue: numberOfChildren,
    valid: numberOfChildren > 0,
    handleChange: (n: any) => set("numberOfChildren", "user_reducer", n),
    handleChange2: (value: string, childId1: string) => set(`${childId1}`, "user_reducer", value),
  })
}

export const createStream = (q, user, streamType, state, set) => {
  const {progress} = state.ui_reducer
q.push({
  data: "user1Income",
  component: "Button",
  valid: true,
  handleChange: () => {
    createStreamV2("income", "in", "user1", "taxable", set, state)
    set("progress", "ui_reducer", progress + 1)
  },
})
}

export const getStreamName = (q, action, user, state, stream,  set) => {

  const {id, streamType} = stream 
  q.push({
    component: "TextInput",
    explanation: q_data[streamType].name[action].explanation,
    label: q_data[streamType].name[action].label,
    placeholder:  q_data[streamType].name[action].placeholder,
    question: q_data[streamType].name[action].question,
    streamType: "text",
    valid: true,
    handleChange: (value: string) => set(id, "main_reducer", value, "name"),
  })
}

export const getStreamReg = (q, action, user, state, stream, set) => {
  const {id, streamType, reg} = stream
  q.push({
    //QUESTION 2 - Select registration of the new stream
    optionArray: q_data[streamType].reg[action].optionArray, // these values can be selectd by the multi select and will be attached as "reg", for "registration", to the income object
    explanation: q_data[streamType].reg[action].explanation,
    component: "PickSingleOption",
    question: q_data[streamType].reg[action].question,
    textInput: true,
    valid: reg.length > 1,
    value: reg,
    handleChange: (value: string) => set(id, "main_reducer", value.toLowerCase(), "reg"),
  })
}
export const getAnother = (q, action, user, state, stream, set) => {
  const {dualSelectValue} = state.ui_reducer
  q.push({
    component: "DualSelect",
    explanation: "qFinal.explanation",
    option1: "yes",
    option2: "no",
    value: dualSelectValue,
    valid: true,
    question: "qFinal.question",
    handleChange: () => {
      set("dualSelectValue", "ui_reducer", true)
      createStreamV2("income", "in", user, 'taxable', set, state)
    },
    handleChange2: (value, clickFired: boolean) => {
      set("newStream", "ui_reducer", false)
      set("selectedId", "ui_reducer", false)
      set("selectedPeriod", "ui_reducer", 0)
      // if (clickFired) {
      //   const latestValue = Object.values(main_reducer)
      //     .sort((a, b) => +b.createdAt - +a.createdAt)
      //     .reverse()[0] //sorts by date to find most recent stream
      //   remove(latestValue.id) //removes it
      // }
      set("dualSelectValue", "ui_reducer", false)
    },
  })
}


export const getStreamValues = (q, state, stream, set) => {
  q.push(createTripleSlidersV2(q_data.income, stream, set, state))
}


const buildIncomeQuestions = (q, user, state, set) => {
  const {selectedId} = state.ui_reducer
  const stream = state.main_reducer[selectedId]
  
  return ({

    for: {
      income: {
        name: () => getStreamName(q, 'new', user, state,stream ,  set),
        registration: () => getStreamReg(q, "new", user, state, stream, set),
        amount: () => getStreamValues(q, state, stream, set)
      }
    },
    if: {
      add: {
        another: () => getAnother(q, 'new', user, state, stream, set)
      }
    },
    to: {
      create: {
        income: () => null
      }
    }
  })
}
  

const buildCreators = (q, user, state, set) => ({
  new: {
    income: {
      stream: () => createStream(q, user, 'income', state, set)
    },
  },
})


export const getIncomeDetails = (q, user, state, set) => {
  
  const create = buildCreators(q, user, state, set)
        create.new.income.stream()

  const ask = buildIncomeQuestions(q, user, state, set)
        ask.for.income.name()
        ask.for.income.registration()
        ask.for.income.amount()
        ask.if.add.another()
}

export const getOnboardQuestions = (q, state, set) => {
  return {
    for: {
      user1: {
        isMarried: true,
        name: () => getName(q, 'user1', state, set),
        gender: () => getGender(q, 'user1', state, set),
        birthYear: () => getBirthYear(q, 'user1', state, set),
        maritalStatus: () => getMaritalStatus(q, state, set),
        incomeDetails: () => getMaritalStatus(q, state, set),
        savingsDetails: () => getMaritalStatus(q, state, set), //TODO this is a dummy
        income: {
          details: () => getIncomeDetails(q, 'user1', state, set)
        },
        savings: {
          details: () => getMaritalStatus(q, state, set),
        }
      },
      user2: {
        isMarried: true,
        name: () => getName(q, 'user2', state, set),
        gender: () => getGender(q, 'user2', state, set),
        birthYear: () => getBirthYear(q, 'user2', state, set),
        incomeDetails: () => getMaritalStatus(q, state, set),
         savingsDetails: () => getMaritalStatus(q, state, set), //TODO this is a dummy
         income: {
          details: () => getIncomeDetails(q, 'user1', state, set)
        },
         savings: {
          details: () => getMaritalStatus(q, state, set),
        }
      },
      their: {
       numberOfChildren: () => numberOfChildren(q, state, set)
      },
    },
    if: {
      theyHaveChildren: () => getChildren(q, state, set) 
    }
  }
}