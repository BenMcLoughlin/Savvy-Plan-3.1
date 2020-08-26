import * as I from "calculations/savings/types"

// const targetArrayDesign = [
//   {
//     year: 2021,
//     user1TfsaInterest: 3000,
//     user1TfsaPrinciple: 4000,
//     user1RrspInterest: 3000,
//     user1RrspPrinciple: 4000,
//   },
// ]


export const getSavingsArrayForChart = ({ ui_reducer }, savingsObject: I.savingsObject) => {
  //console.log('JSON.stringify(savinsObject, null, 4):', JSON.stringify(savingsObject, null, 4))

  const { selectedUser, selectedAccount } = ui_reducer

  const arrayOfYears = Object.keys(savingsObject)

  const finalArray = []

  arrayOfYears.map(year => {
    if (selectedAccount === "combined" && selectedUser !== "combined") {
      finalArray.push({
        year,
        [`${selectedUser}totalSavings`]: savingsObject[year][selectedUser].totalSavings,
      })
    }
    else if (selectedAccount === "combined" && selectedUser === "combined") {
      finalArray.push({
        year,
        totalSavings: savingsObject[year].user1.totalSavings,
      })
    }
  
   else {
    finalArray.push({
      year,
      [`${selectedUser}${selectedAccount}`]: savingsObject[year][selectedUser][selectedAccount].total > 0 ? savingsObject[year][selectedUser][selectedAccount].total : 0,
    })
   }   
   return
  })
console.log('finalArray:', finalArray)
  
  return finalArray
}
