import { IUserState, ISetValue_action } from 'types/reducer_types'

const initialState = {
  id: '',
  displayName: '',
  email: '',
  firstName: 'Ben',
  married: false, 
  spouseFirstName: 'Kelsey',
  spouseBirthYear: '',
  province: '',
  maritalStatus: '',
  housing: '',
  investments: ' ',
  otherProperty: 'yes',
  numberOfProperties: 1,
  nonEmploymentIncome: '',
  taxAge: '',
  birthYear: '1988',
  currentAge: '',
  rrifWithdrawalAge: '',
  retirementPensionIncome: '',
  gender: '',
  hasChildren: '',
  'tax free savings account': false,
  'registered retirement savings': false,
  changeAssumptions: '',
  'employer savings': false,
  'non-registered': false,
  numberOfChildren: 0,
  retirementAge: 65,
  lifeSpan: 95,
  cppStartAge: 65,
  oasStartAge: 65,
  rrspStartAge: 65,
  tfsaStartAge: 65,
  rate1: 6,
  rate2: 4.5,
  inflationRate: 2,
  MER: 2,
  propertyAppreciation: 0.03,
  child1BirthYear: '',
  child2BirthYear: '',
  child3BirthYear: '',
  child4BirthYear: '',
}

export function user_reducer(state = initialState, action: ISetValue_action): IUserState {
  switch (action.type) {
    case 'user_reducer/SET_VALUE':
      return { ...state, [action.id]: action.value } //sets a simple key value pair within the reducer object
    default:
      return state
  }
}
