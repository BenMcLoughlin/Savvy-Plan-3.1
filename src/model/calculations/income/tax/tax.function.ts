import { getTaxRate } from "model/calculations/income/tax/tax.helpers"
import * as I from "model/calculations/income/types"
import _ from "lodash"

export const getAfterTaxStreamsObject = (income: I.incomeObject, state: I.state, yearFirst: I.year, yearLast: I.year, users: number[]): I.incomeObject => {
  let afterTaxIncome = { ...income } //make a copy of the entire income object

  for (let year = yearFirst; year <= yearLast; year++) {
    users.map(n => {
      const beforeTaxTaxableIncomeStreams = Object.keys(_.omit(income[year][`user${n}`].beforeTaxTaxableIncomeStreams, ["year"]))
      const nonTaxableIncomeStreams = Object.keys(_.omit(income[year][`user${n}`].nonTaxableIncomeStreams, ["year"]))
      //console.log('beforeTaxTaxableIncomeStreams:', beforeTaxTaxableIncomeStreams)
 
      const  beforeTaxIncome  = 22000//income[year][`user${n}`]

      const taxRate = getTaxRate(beforeTaxIncome)

      beforeTaxTaxableIncomeStreams.map(
        stream =>
          (afterTaxIncome = {
            ...afterTaxIncome,
            [year]: {
              ...afterTaxIncome[year],
              [`user${n}`]: {
                ...afterTaxIncome[year][`user${n}`],
                afterTaxIncomeStreams: {
                  ...afterTaxIncome[year][`user${n}`].afterTaxIncomeStreams,
                  [stream]: income[year][`user${n}`].beforeTaxTaxableIncomeStreams[stream] * (1 - taxRate),
                },
              },
            },
          })
      )

      nonTaxableIncomeStreams.map(
        stream =>
          (afterTaxIncome = {
            ...afterTaxIncome,
            [year]: {
              ...afterTaxIncome[year],
              [`user${n}`]: {
                ...afterTaxIncome[year][`user${n}`],
                afterTaxIncomeStreams: {
                  ...afterTaxIncome[year][`user${n}`].afterTaxIncomeStreams,
                  [stream]: income[year][`user${n}`].nonTaxableIncomeStreams[stream],
                },
              },
            },
          })
      )
      afterTaxIncome = {
        ...afterTaxIncome,
        [year]: {
          ...afterTaxIncome[year],
          [`user${n}`]: {
            ...afterTaxIncome[year][`user${n}`],
            afterTaxIncome: beforeTaxIncome * (1 - taxRate),
          },
        },
      }
      afterTaxIncome = {
        ...afterTaxIncome,
        [year]: {
          ...afterTaxIncome[year],
          [`user${n}`]: {
            ...afterTaxIncome[year][`user${n}`],
            afterTaxIncomeStreams: {
              ...afterTaxIncome[year][`user${n}`].afterTaxIncomeStreams,
              year: year,
            },
          },
        },
      }
    })
  }

  return afterTaxIncome
}
