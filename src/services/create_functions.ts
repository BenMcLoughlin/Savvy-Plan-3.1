import { instance } from "types/reducer_types"
import { colorArray } from "styles/color_data"
import { reg, owner, streamType } from "types/variable_types"
import _ from "lodash"
import * as I from "types"

/**
 * newIncomeStream is a function that creates a new income instance. An instance represents income for a certain period. Eg. Wal mart Income from 2009 - 2020.
 * It is different than other instances in the same stream because the value is different. Eg. the user may have made less money for the first 5 years of employment, then more later.
 *  */

export const newIncomeStream = (period0StartYear: number, period0EndYear: number) => ({
  name: "",
  periods: 0,
  period0StartYear,
  period0Value: 20000,
  period0EndYear,
  taxable: true,
})

/**
 * newSavingsStream creates a new Savings Account object which contains all the details pertaining to a property
 *  */

export const newSavingsStream = () => {
  const thisYear = new Date().getFullYear()

  return {
    name: "",
    periods: 0,
    currentValue: 0,
    period0StartYear: thisYear,
    period0Value: 1000,
    period0EndYear: 2040,
    taxable: true,
  }
}

/**
 * newPropertyStream creates a new property object which contains all the details pertaining to a property
 *  */

export const newPropertyStream = () => ({
  currentValue: 300000,
  hasMortgage: "no",
  mortgageRate: 3,
  mortgageBalance: 200000,
  mortgageAmortization: 30,
  mortgageStartYear: 30,
  name: "",
  purchasePrice: 300000,
  purchaseYear: 2015,
  taxable: true,
  sellYear: 2040,
})

/**
 * newDebtStream creates a new debt object which contains all the details pertaining to a debt
 *  */

export const newDebtStream = () => ({
  rate: 10,
  balance: 2000,
  amortization: 40,
  payment: 200,
  name: "",
  owner: "user1",
})

/**
 * newDebtStream creates a new debt object which contains all the details pertaining to a debt
 *  */

export const createNewStream = () => ({
  rate: 10,
  balance: 2000,
  amortization: 40,
  payment: 200,
  name: "",
  owner: "user1",
  reg: "",
})

/**
 * createStream recives an instance object, eg Wal Mart Employment income from 2009 - 2020. It places that object in the main reducer. T
 * Then it sets the UI reducer to have the id, and the stream name of that instance, that way all components know the details for the object they need to edit.
 *  */

export const addPeriodToIncomeStream = (instance: any, period: number, selectedId: any, set: (id: string, reducer: string, value: any, childId?: string) => void): void => {
  set(selectedId, "main_reducer", period + 1, "periods")
  set(selectedId, "main_reducer", +instance[`period${period}StartYear`] + 3, `period${period + 1}StartYear`)
  set(selectedId, "main_reducer", +instance[`period${period}EndYear`] + 3, `period${period + 1}EndYear`)
  set(selectedId, "main_reducer", 3000, `period${period + 1}Value`)
}
export const addPeriodToStream = (instance: any, period: number, selectedId: any, set: (id: string, reducer: string, value: any, childId?: string) => void): void => {
  const startingValue = instance[`period${period}Value`]

  set(selectedId, "main_reducer", period + 1, "periods")
  set(selectedId, "main_reducer", instance[`period${period}EndYear`], `period${period + 1}StartYear`)
  set(selectedId, "main_reducer", +instance[`period${period}EndYear`] + 5, `period${period + 1}EndYear`)
  set(selectedId, "main_reducer", startingValue, `period${period + 1}Value`)
}

const newStream = streamType => {
  switch (streamType) {
    case "income":
      return newIncomeStream(2000, 2010)
    case "savings":
      return newSavingsStream()
    case "property":
      return newPropertyStream()
    case "debt":
      return newDebtStream()
  }
}

export const createStream = (colorIndex: number, set: I.set, streamType: I.streamType, reg: I.reg, owner: I.owner): void => {
  let stream1 = newStream(streamType)

  //This creates a new Income Instance, such as from ages 18-22
  const id = owner + _.startCase(streamType) + "_" + (Math.random() * 1000000).toFixed() //creates the random ID that is the key to the object, key includes the owner, then the type of instance eg. "Income", then a random number
  const color = colorArray[colorIndex] //ensures that the color of the new stream is unique
  const stream = { ...stream1, id, color, owner, reg, streamType }

  set(id, "main_reducer", stream, "") //This action fires and sets the state in the income reducer creating a new item there,
  set("selectedId", "ui_reducer", id, "") // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
  set("colorIndex", "ui_reducer", colorIndex + 1, "") // determines which income instance to show within the edit box
}
