import { FTR, PTR } from "calculations/income/tax/tax.data"
import { getTaxRate } from "calculations/income/tax/tax.helpers"
import * as I from "calculations/income/types"
import _ from "lodash"

export const getAfterTaxStreamsObject = (income: I.incomeObject, state: I.state, yearFirst: I.year, yearLast: I.year, users: number[]): I.incomeObject => {

  let afterTaxIncome = { ...income } //make a copy of the entire income object

  for (let year = yearFirst; year <= yearLast; year++) {
    users.map(n => {
      const beforeTaxIncomeStreams = Object.keys(_.omit(income[year][`user${n}`].beforeTaxIncomeStreams, ["year"]))
      const {beforeTaxIncome} = income[year][`user${n}`]
      const taxRate = getTaxRate(58700)
      beforeTaxIncomeStreams.map(
        stream =>
          (afterTaxIncome = {
            ...afterTaxIncome,
            [year]: {
              ...afterTaxIncome[year],
              [`user${n}`]: {
                ...afterTaxIncome[year][`user${n}`],
                afterTaxIncomeStreams: {
                  ...afterTaxIncome[year][`user${n}`].afterTaxIncomeStreams,
                  [stream]: income[year][`user${n}`].beforeTaxIncomeStreams[stream] * (1 - taxRate),
                },
              },
            },
          })
      )
      afterTaxIncome = {...afterTaxIncome, [year]: {
        ...afterTaxIncome[year], [`user${n}`]: {
          ...afterTaxIncome[year][`user${n}`], afterTaxIncome: beforeTaxIncome * (1-taxRate)
        }
      }}
      afterTaxIncome = {...afterTaxIncome, [year]: {
        ...afterTaxIncome[year], [`user${n}`]: {
          ...afterTaxIncome[year][`user${n}`], afterTaxIncomeStreams: {
            ...afterTaxIncome[year][`user${n}`].afterTaxIncomeStreams, year: year
          }
        }
      }}
    })
  }

  return afterTaxIncome
}
