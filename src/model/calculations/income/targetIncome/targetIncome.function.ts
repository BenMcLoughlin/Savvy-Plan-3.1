
 //i//mport {maxTFSAValues} from 'model/calculations/income'

 const payment = function (rate, nperiod, pv, fv, type) {
   if (!fv) fv = 0
   if (!type) type = 0

   if (rate === 0) return -(pv + fv) / nperiod

   var pvif = Math.pow(1 + rate, nperiod)
   var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

   if (type === 1) {
     pmt /= 1 + rate
   }

   return Math.round(pmt)
 }


// const maxPossibleRRSP = (income, year) => {
  
// }

// const maxTFSAWithdrawal = (tfsaStartYear, lifeSpan) => {
//   const tfsaWithdrawalDuration = lifeSpan - tfsaStartYear
//   const tfsaStartValue = maxTFSAValues["" + tfsaStartYear]

//   return payment(0.03, tfsaWithdrawalDuration, tfsaStartValue, 0, null)
// }

export const getTargetIncome = (income) => {
  return ({
    tfsa: 12000, 
    rrsp: 4000, 
    walMart: 12000, 
    cpp: 12000, 
  })
}
