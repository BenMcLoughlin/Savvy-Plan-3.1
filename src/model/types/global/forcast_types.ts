export type accountValues = {
  contribution: number
  withdrawal: number
  principle: number
  interest: number
}

export type accounts = {
  rrsp: accountValues
  tfsa: accountValues
  nreg: accountValues
}

export type userForcastObject = {
  user1: accounts
  user2?: accounts
}

export interface forcast {
  [key: string]: userForcastObject
}
