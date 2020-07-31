import { FTR, PTR } from "calculations/income/tax/tax.data"
import { getTaxRate } from "calculations/income/tax/tax.helpers"
import * as I from "calculations/income/types"
import _ from "lodash"

export const getAfterTaxStreamsObject = (income: I.incomeObject, state: I.state, yearFirst: I.year, yearLast: I.year, users: number[]): I.incomeObject => {

  let afterTaxIncome = { ...income }

  for (let year = yearFirst; year <= yearLast; year++) {
    users.map(n => {
      const incomeStreams = Object.keys(_.omit(income[year][`user${n}`].incomeStreams, ["year"]))
      console.log("income[year][`user${n}`]:", income[year][`user${n}`].totalIncome)
      
      
      const taxRate = getTaxRate(58700)
      incomeStreams.map(
        stream =>
          (afterTaxIncome = {
            ...afterTaxIncome,
            [year]: {
              ...afterTaxIncome[year],
              [`user${n}`]: {
                ...afterTaxIncome[year][`user${n}`],
                incomeStreams: {
                  ...afterTaxIncome[year][`user${n}`].incomeStreams,
                  [stream]: income[year][`user${n}`].incomeStreams[stream] * (1 - taxRate),
                },
              },
            },
          })
      )
    })
  }

  return afterTaxIncome
}
