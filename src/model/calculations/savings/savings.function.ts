import * as I from "model/types"
import { createSavingsObject } from "model/calculations/savings/create/createSavingsObject"

export const getSavings = (state: I.state): I.objects => {
  const { maritalStatus } = state.user_reducer
  const { birthYear, lifeSpan } = state.user_reducer.user1

  const yearFirst: number = new Date().getFullYear() // Our chart begins when the youngest of the two users turns 18, if user is single we just use their values
  let yearLast = +birthYear + lifeSpan //Our chart ends whent the oldest of the users dies,
  let users = [1] //To build a single users income stream we will just use the number 1 in the below for loop, but if they're married we need to do it for both of them

  if (maritalStatus === "married" || maritalStatus === "common-law") {
    //IF the user is married we need to compare to find the earliest and latest values
    const { birthYear: user2BirthYear, lifeSpan: user2LifeSpan } = state.user_reducer.user1
    users = [1, 2] //this array will be mapped through to create values for both users
    if (lifeSpan < +user2LifeSpan) yearLast = user2BirthYear + user2LifeSpan
  }

  const savingsObject = createSavingsObject(state, yearFirst, yearLast, users)
  //console.log('JSON.stringify(savingsObject):', JSON.stringify(savingsObject, null, 4))

  //const function_duration = END_TIME - START_TIME

  // set('optimumTFSAPayment', 'user_reducer', payment)
  //console.log("caculateSavings duration:", function_duration)

  return savingsObject
}
