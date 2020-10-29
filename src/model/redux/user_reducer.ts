const initialState = {
  changeAssumptions: "",
  hasUnsecuredDebt: false,
  numberOfChildren: 1,
  gender: "",
  haveChildren: "",
  hasChildrenStatus: "",
  ownHome: false,
  inflationRate: 2,
  maritalStatus: "married",
  MER: 2,
  province: "British Columbia",
  rate1: 6,
  rate2: 4.5,
  user1BirthYear: 1990,
  user2BirthYear: 1990,
  user1CppStartAge: 65,
  user2CppStartAge: 65,
  user1Gender: "",
  user1LifeSpan: 95,
  user2LifeSpan: 95,
  user1Name: "Ben",
  user2Name: "Kelsey",
  user1OasStartAge: 65,
  user2OasStartAge: 65,
  desiredRetirementIncome: 0,
  idealIncome: 0,
  user1: {
    birthYear: 1990,
    cppStartAge: 65,
    firstName: "",
    lastName: "",
    gender: "male",
    hasChildren: true,
    isMarried: true,
    oasStartAge: 65,
    efficientWithdrawalTFSA: 0,
    efficientWithdrawalRRSP: 0,
    efficientWithdrawalNonReg: 0,
  },
  user2: {
    birthYear: 1990,
    cppStartAge: 65,
    firstName: "",
    lastName: "",
    gender: "female",
    oasStartAge: 65,
  },
}

export function user_reducer(state = initialState, action: any) {
  switch (action.type) {
    case "user_reducer/SET_VALUE":
      return action.childId1
        ? { ...state, [action.id]: { ...state[action.id], [action.childId1]: action.value } } //usually this action is just used to change a value within the object
        : { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
