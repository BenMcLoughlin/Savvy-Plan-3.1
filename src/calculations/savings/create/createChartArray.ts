import * as I from "calculations/savings/types"

export const getSavingsArrayForAreaChart = ({ ui_reducer }, savingsObject: I.savingsObject) => {
  //console.log("JSON.stringify(savinsObject, null, 4):", JSON.stringify(savingsObject, null, 4))

  const { selectedUser, selectedAccount } = ui_reducer

  const arrayOfYears = Object.keys(savingsObject)

  const finalArray = []

  arrayOfYears.map(year => {
    if (selectedAccount === "combined" && selectedUser !== "combined") {
      finalArray.push({
        year,
        [`${selectedUser}totalSavings`]: savingsObject[year][selectedUser].totalSavings,
      })
    } else if (selectedAccount === "combined" && selectedUser === "combined") {
      const totalSavings = 10000
      finalArray.push({
        year,
        totalSavings,
      })
    } else {
      finalArray.push({
        year,
        [`${selectedUser}${selectedAccount}`]: savingsObject[year][selectedUser][selectedAccount].total > 0 ? savingsObject[year][selectedUser][selectedAccount].total : 0,
      })
    }
    return
  })
  //console.log('finalArray:', finalArray)

  return finalArray
}

export const getSavingsArrayForBarChart = ({ ui_reducer }, savingsObject: I.savingsObject) => {

  const { selectedUser, selectedAccount } = ui_reducer
console.log('savingsObject):', savingsObject)
  const arrayOfYears = Object.keys(savingsObject)

  const finalArray = []

  arrayOfYears.map(year => {
    if (selectedAccount === "combined" && selectedUser !== "combined") {
      finalArray.push({
        year,
        [`${selectedUser}totalSavings`]: savingsObject[year][selectedUser].totalSavings,
      })
    } else if (selectedAccount === "combined" && selectedUser === "combined") {
      const totalSavings = 10000
      finalArray.push({
        year,
        totalSavings,
      })
    } else {
      finalArray.push({
        year,
        [`${selectedUser}${selectedAccount}`]: savingsObject[year][selectedUser][selectedAccount].contribute - savingsObject[year][selectedUser][selectedAccount].withdraw
      })
    }
    return
  })
  //console.log('finalArray:', finalArray)

  return finalArray
}
