import * as I from "calculations/savings/types"

import _ from "lodash"

const emptyAccountData = {
  contribute: 0,
  withdraw: 0,
  principle: 0,
  totalInterest: 0,
  total: 0,
}

export const getValue = (transactionType: I.transactionType, stream: I.savingsStream, year: number): number => {
  if (stream) {
    const { periods, contributePeriods } = stream
    //step 1. Check all periods to see if year falls within the period Start or End
    const numberOfPeriods = transactionType === "period" ? periods : contributePeriods
    const value = _.range(numberOfPeriods + 1).map(n => {
      if (year >= stream[`${transactionType}${n}StartYear`] && year < stream[`${transactionType}${n}EndYear`]) return stream[`${transactionType}${n}Value`]
      else return 0
    })
    return Math.max(...value)
  } else return 0
}

export const getAccountDetails = (account: I.account, savingsObject: I.savingsObject, state: I.state, year: number, user: string): I.annualAccountDetails => {
  const stream: any = Object.values(state.main_reducer).find((d: any) => d.reg === account && d.owner === user) //grab the stream we're working on, eg TFSA with its contribute and withdraw details

  if (!stream) return emptyAccountData

  const firstYear = year === new Date().getFullYear() //if the year is the current year we want to initialize the object with a new one that has the current value set

  const prior: any = firstYear ? emptyAccountData : savingsObject[year - 1][user][account] //grabs the prior years object which will be used to run this years calculations

  const withdrawAmount = getValue("period", stream, year) //this represents the amount the user has inputed to withdraw, although it might not be available in the account

  const contribute = getValue("contribute", stream, year) //checks the current stream to see if contributes have been made this year
  const withdraw = withdrawAmount < prior.total ? withdrawAmount : prior.total //checks the current stream to see if withdraws have been made this year
  const principlePercentage = firstYear ? 0 : (prior.principle + prior.contribute) / prior.total //when running withdraws we want to show a mix of totalInterest and principle being withdrawn
  const principle = firstYear ? stream.currentValue || 0 : prior.principle + prior.contribute - withdraw * principlePercentage
  const annualInterest = firstYear ? stream.currentValue * 0.06 : prior.total * 0.06
  const interestPercentage = firstYear ? 0 : prior.totalInterest / prior.total
  const totalInterest = firstYear ? stream.currentValue * 0.06 : prior.totalInterest + annualInterest - withdraw * interestPercentage
  const total = firstYear ? principle + contribute + totalInterest : prior.total + contribute - withdraw + annualInterest

  return {
    contribute,
    withdraw,
    principle: principle > 0 ? principle : 0,
    totalInterest: totalInterest > 0 ? totalInterest : 0,
    total,
  }
}

export const createSavingsObject = (state: I.state, yearFirst: number, yearLast: number, users: number[]) => {
  const savingsObject = {} //initialize an empty object which values will be passed into

  for (let year = yearFirst; year <= yearLast; year++) {
    users.map((n: any) => {
      const tfsa = getAccountDetails("tfsa", savingsObject, state, year, `user${n}`)
      const rrsp = getAccountDetails("rrsp", savingsObject, state, year, `user${n}`)
      const personal = getAccountDetails("personal", savingsObject, state, year, `user${n}`)
      return (savingsObject[year] = {
        ...savingsObject[year],
        [`user${n}`]: {
          tfsa,
          rrsp,
          personal,
          totalSavings: tfsa.total + rrsp.total + personal.total,
        },
      })
    })
  }

  //console.log("JSON.stringify(savings, null, 4):", JSON.stringify(savingsObject, null, 4))
  return savingsObject
}
