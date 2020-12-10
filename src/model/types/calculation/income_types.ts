interface annualIncome {
  [key: string]: number
}

export interface combinedIncome_object {
  [key: number]: annualIncome
}

//INCOME TYPES

type incomeStreams = {
  [key: string]: number
}

type userIncome = {
  income: incomeStreams
  afterTaxIncome: incomeStreams
  taxableInc: number
  cppEligible: number
}

export type incomeForcast = {
  [key: string]: {
    user1: userIncome
    user2: userIncome
  }
}

