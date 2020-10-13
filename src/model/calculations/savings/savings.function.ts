import * as I from "model/calculations/savings/types"
import { createSavingsObject } from "model/calculations/savings/create/createSavingsObject"

export const getSavings = (state: I.state): I.savingsObject => {
  const START_TIME = new Date().getTime()

  const { user1BirthYear, user1LifeSpan, maritalStatus } = state.user_reducer

  let yearFirst = new Date().getFullYear() // Our chart begins when the youngest of the two users turns 18, if user is single we just use their values
  let yearLast = +user1BirthYear + user1LifeSpan //Our chart ends whent the oldest of the users dies,
  let users = [1] //To build a single users income stream we will just use the number 1 in the below for loop, but if they're married we need to do it for both of them

  if (maritalStatus === "married" || maritalStatus === "commonlaw") {
    //IF the user is married we need to compare to find the earliest and latest values
    const { user2BirthYear, user2LifeSpan } = state.user_reducer
    users = [1, 2] //this array will be mapped through to create values for both users
    if (user1LifeSpan < +user2LifeSpan) yearLast = user2BirthYear + user2LifeSpan
  }

  const savingsObject = createSavingsObject(state, yearFirst, yearLast, users)
  //console.log('JSON.stringify(savingsObject):', JSON.stringify(savingsObject, null, 4))
  const END_TIME = new Date().getTime()
  const function_duration = END_TIME - START_TIME
  //console.log("caculateSavings duration:", function_duration)
  return savingsObject
}

