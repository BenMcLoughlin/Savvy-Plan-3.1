import * as I from "model/calculations/savings/types"

export const getSavingsData = ({ ui_reducer }, savingsObject: I.savingsObject) => {
  //console.log("JSON.stringify(savinsObject, null, 4):", JSON.stringify(savingsObject, null, 4))

  const { selectedUser, selectedAccount } = ui_reducer

  const arrayOfYears = Object.keys(savingsObject)

  const areaData = []
  const barData = []

  arrayOfYears.map(year => {
    if (selectedAccount === "combined" && selectedUser !== "combined") {
      const totalContribute = savingsObject[year][selectedUser].totalContribute + savingsObject[year][selectedUser].totalContribute
      const totalWithdraw = savingsObject[year][selectedUser].totalWithdraw + savingsObject[year][selectedUser].totalWithdraw

      areaData.push({
        year,
        [`${selectedUser}totalSavings`]: savingsObject[year][selectedUser].totalSavings,
      })
      barData.push({
        year,
        total: totalContribute - totalWithdraw
      })
    } else if (selectedAccount === "combined" && selectedUser === "combined") {
      const totalSavings = savingsObject[year].user1.totalSavings + savingsObject[year].user2.totalSavings
      const totalContribute = savingsObject[year].user1.totalContribute + savingsObject[year].user2.totalContribute
      const totalWithdraw = savingsObject[year].user1.totalWithdraw + savingsObject[year].user2.totalWithdraw
      areaData.push({
        year,
        totalSavings,
      })
      barData.push({
        year,
        total: totalContribute - totalWithdraw
      })
    } else if (selectedAccount !== "combined" && selectedUser === "combined") {
      const totalSavings = savingsObject[year].user1[selectedAccount].total + savingsObject[year].user2[selectedAccount].total
      const totalContribute = savingsObject[year].user1[selectedAccount].contribute + savingsObject[year].user2[selectedAccount].contribute
      const totalWithdraw = savingsObject[year].user1[selectedAccount].withdraw + savingsObject[year].user2[selectedAccount].withdraw
      areaData.push({
        year,
        totalSavings,
      })
      barData.push({
        year,
        total: totalContribute - totalWithdraw
      })
    } else {
      areaData.push({
        year,
        [`${selectedUser}${selectedAccount}`]: savingsObject[year][selectedUser][selectedAccount].total > 0 ? savingsObject[year][selectedUser][selectedAccount].total : 0,
      })
      barData.push({
        year,
        [`${selectedUser}${selectedAccount}`]: savingsObject[year][selectedUser][selectedAccount].contribute - savingsObject[year][selectedUser][selectedAccount].withdraw,
      })
    }
    return null
  })


  return {
    areaData,
    barData,
  }
}
