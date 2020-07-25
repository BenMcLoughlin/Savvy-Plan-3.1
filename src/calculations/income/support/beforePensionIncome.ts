import _ from "lodash"
import * as I from "types"

export const filterByStreamAndUser = (user, array) => {
  if (user === "combined") {
    return array.filter(instance => instance.streamType === "income")
  } else {
    return array.filter(instance => instance.owner === user).filter(instance => instance.streamType === "income")
  }
}

/**
 * Helper: singleYearTotalIncome receives an array of all income streams along with a specific age, eg age 30. It then
 * checks to see what income was earned in that year and returns an object that will show all income earned at age 30
 *  */

const getThisYearsIncome = (stream, year) => {

  const { periods } = stream //we need to check each period to see if the year falls within its bounds
  
  //step 1. Check all periods to see if year falls within the period Start or End
  const value =
    _.range(periods + 1).map(period => {
      if (year >= stream[`period${period}StartYear`] && year < stream[`period${period}EndYear`]) return stream[`period${period}Value`]
      else return 0
    }) 

  return Math.max(...value)
}

/**
 * Helper: createArrayOfIncomeByYearPerUser receives all the income streams associated with the user, along with their birth year and lifeSpan.
 * It then creates an array fromm age 18 - 95 with an object for each year that contains the income earnings for that year
 *  */

const createArrayOfIncomeByYearPerUser = (arrayOfIncomeStreams, birthYear, lifeSpan) => {
  const finalArray: any = [] //initialize empty array that we will place our for loop values into

  for (let age = 18; age <= lifeSpan; age++) {
    //initialize a for loop from age 18 - lifespan, or 95

    const year = +birthYear + age //determine the current year

    const initialObject = { age: age, year } //initialize an object for the year that has the age and the year

    const thisYearsValues = Object.assign(
      initialObject,
      ...arrayOfIncomeStreams.map((
        stream //We need an object for each income stream, we map and assign the stream to the object
      ) => ({ [stream.name]: getThisYearsIncome(stream, year) })) //Checks to see if income has been input for this age, if so the financial value is returned
    )
    finalArray.push(thisYearsValues)
  }
  return finalArray
}

/**
 * Helper: createArrayOfIncomeByYearPerUser receives all the income streams associated with the user, along with their birth year and lifeSpan.
 * It then creates an array fromm age 18 - 95 with an object for each year that contains the income earnings for that year
 *  */

export const combinedIncomeStreams = (array1, array2) =>  array1.map((yearsEarnings, i) => ({...yearsEarnings, ...array2[i]}))

export const beforePensionIncome = (user: I.user, state: I.state) => {

  const { user1LifeSpan, user1BirthYear, user2LifeSpan, user2BirthYear } = state.user_reducer
  const { selectedUser } = state.ui_reducer

  //Step 1. Convert main_reducer to array

  const reducerArray = Object.values(state.main_reducer)

 //Step 2. filter income according to selected user

    const arrayOfIncomeStreams = filterByStreamAndUser(user, reducerArray)

  switch (selectedUser) {
    case "user1":
      return createArrayOfIncomeByYearPerUser(arrayOfIncomeStreams, user1BirthYear, user1LifeSpan)
    case "user2":
      return createArrayOfIncomeByYearPerUser(arrayOfIncomeStreams, user2BirthYear, user2LifeSpan)
    case "combined":
      return combinedIncomeStreams(
        createArrayOfIncomeByYearPerUser(arrayOfIncomeStreams, user1BirthYear, user1LifeSpan),
        createArrayOfIncomeByYearPerUser(arrayOfIncomeStreams, user2BirthYear, user2LifeSpan)
      )
  }
}
