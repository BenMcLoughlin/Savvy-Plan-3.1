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
  taxableIncome: number
  cppEligibleIncome: number
}

export type incomeForcast = {
  [key: string]: {
    user1: userIncome
    user2: userIncome
  }
}

//TAX Types

export type government = "federal" | "britishColumbia"

export interface taxBracket {
  bot: number
  top: number
  rate: number
  constant: number
}

export type basicPersonal = 12298 | 10949

export interface taxes {
  [key: string]: {
    basicPersonal: basicPersonal
    [key: number]: taxBracket
  }
}
