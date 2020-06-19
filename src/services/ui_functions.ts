import { streamType } from "types/reducer_types"
import { colorArray } from "styles/color_data"
/**
 * newIncomeStream is a function that creates a new income instance. An instance represents income for a certain period. Eg. Wal mart Income from 2009 - 2020.
 * It is different than other instances in the same stream because the value is different. Eg. the user may have made less money for the first 5 years of employment, then more later.
 *  */

export const newIncomeStream = (year0: number, yearLast: number): streamType => ({
  name: "",
  owner: "",
  periods: 0,
  reg: "employment Income",
  taxable: true,
  year0,
  value0: 20000,
  yearLast,
})

/**
 * newSavingsStream creates a new Savings Account object which contains all the details pertaining to a property
 *  */

export const newSavingsStream = (reg, withdrawalYear0: number): streamType => ({
  contribution0: 0,
  contributionPeriods: 0,
  contributionYear0: new Date().getFullYear(),
  contributionYear1: 2030,
  currentValue: 3000,
  name: "",
  owner: "",
  reg,
  taxable: true,
  withdrawal0: 0,
  withdrawalPeriods: 0,
  withdrawalYear0,
})

/**
 * newPropertyStream creates a new property object which contains all the details pertaining to a property
 *  */

export const newPropertyStream = (): streamType => ({
  currentValue: 300000,
  hasMortgage: "no",
  mortgageRate: 0.03,
  mortgageBalance: 200000,
  mortgageAmortization: 30,
  mortgageStartYear: 30,
  name: "",
  owner: "",
  purchasePrice: 300000,
  purchaseYear: 2015,
  reg: "",
  taxable: true,
  sellYear: 2040,
})

/**
 * newDebtStream creates a new debt object which contains all the details pertaining to a debt
 *  */

export const newDebtStream = (): streamType => ({
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
  set(selectedId, "main_reducer", +instance[`year${period}`] + 3, `year${period + 1}`)
  set(selectedId, "main_reducer", 3000, `value${period + 1}`)
}
export const addPeriodToSavingsStream = (instance: any, period: number, selectedId: any, set: (id: string, reducer: string, value: any, childId?: string) => void): void => {
  set(selectedId, "main_reducer", period + 1, "contributionPeriods")
  set(selectedId, "main_reducer", +instance[`contributionYear${period}`] + 3, `contributionYear${period + 1}`)
  set(selectedId, "main_reducer", 3000, `contributionValue${period + 1}`)
}

export const createStream = (colorIndex: number, newIncomeStream: streamType, set: (id: string, reducer: string, value: any, childId?: string) => void, streamType: string): void => {
  //This creates a new Income Instance, such as from ages 18-22
  const id = streamType + "_" + (Math.random() * 1000000).toFixed() //creates the random ID that is the key to the object
  const color = colorArray[colorIndex] //ensures that the color of the new stream is unique
  const stream = { ...newIncomeStream, id, color }

  set(id, "main_reducer", stream, "") //This action fires and sets the state in the income reducer creating a new item there,
  set("selectedId", "ui_reducer", id, "") // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
  set("colorIndex", "ui_reducer", colorIndex + 1, "") // determines which income instance to show within the edit box
}
