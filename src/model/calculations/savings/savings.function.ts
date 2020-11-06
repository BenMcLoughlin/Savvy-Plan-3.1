import * as I from "model/types"
import { createSavingsObject } from "model/calculations/savings/create/createSavingsObject"

export const getSavings = (state: I.state): I.objects => {
  const { maritalStatus } = state.user_reducer
  const { birthYear, lifeSpan } = state.user_reducer.user1

  const yearFirst: number = new Date().getFullYear() // Our chart begins when the youngest of the two users turns 18, if user is single we just use their values
  let yearLast = +birthYear + lifeSpan //Our chart ends whent the oldest of the users dies,

  if (maritalStatus === "married" || maritalStatus === "common-law") {
    //IF the user is married we need to compare to find the earliest and latest values
    const { birthYear: user2BirthYear, lifeSpan: user2LifeSpan } = state.user_reducer.user1

    if (lifeSpan < +user2LifeSpan) yearLast = user2BirthYear + user2LifeSpan
  }

  const savingsObject = createSavingsObject(state, yearFirst, yearLast)
  //console.log('JSON.stringify(savingsObject):', JSON.stringify(savingsObject, null, 4))

  //const function_duration = END_TIME - START_TIME

  // set('optimumTFSAPayment', 'user_reducer', payment)
  //console.log("caculateSavings duration:", function_duration)
  return savingsObject
}

export const getStackedSavings = state => {
  return "hello"
}
