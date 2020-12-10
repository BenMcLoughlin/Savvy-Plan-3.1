import _ from "lodash"
import * as I from "model/types"
import * as u from "model/utils"

/** chartDataListener
 * changes the format of the chart data according to the users selections of data to display
 * for instance if selectedUser is user1 and selectedAccount is tfsa it will show user1's tfsa data
 * if selectedUser is 'combined' and selectedAccount is tfsa it will add like values from user1 and and user2 a
 * if selectedUser is 'combined' and selectedAccount is 'combined' it will show all data for both users
 *@param state
 *@param forcast an object with years and values for each user
 *@returns an array of desired data
 **/

export const chartDataListener = (state: I.state, forcast: I.forcast) => {
  const { selectedUser, isMarried } = state.ui_reducer
  const { selectedAccount } = state.ui_reducer
  return Object.entries(forcast).map(([year, v]) => {
    let values = {}
    if (v[selectedUser] && v[selectedUser][selectedAccount]) {
      values = v[selectedUser][selectedAccount]
    }
    if (!v[selectedUser] && v["user1"][selectedAccount] && isMarried) {
      values = u.combine(v["user1"][selectedAccount], v["user2"][selectedAccount])
    }
    if (!v[selectedUser] && !v["user1"][selectedAccount] && isMarried) {
      values = u.combine(v["user1"], v["user2"])
    }
    return { ...values, year }
  })
}

/** used to add 'user1' or 'user2' to an object key in the event user data must be combined
 *
 *@param obj and object of key value pairs on whuch you'd like to add the user title to the keys
 *@returns and object with each of the keys having the user added to it
 **/

function assignUserToKeys(obj, user) {
  return Object.entries(obj).reduce((a, [k, v]) => {
    return { ...a, [`${user}${_.startCase(k)}`]: v }
  }, {})
}
