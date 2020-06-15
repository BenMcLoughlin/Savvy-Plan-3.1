import { IIncomeStream } from "types/reducer_types"

/**
 * newStream is a function that creates a new income instance. An instance represents income for a certain period. Eg. Wal mart Income from 2009 - 2020.
 * It is different than other instances in the same stream because the value is different. Eg. the user may have made less money for the first 5 years of employment, then more later.
 *  */

export const newStream = (
  color: string,
  reg: string,
  name: string,
  periods: number,
  taxable: boolean,
  year0: number,
  value0: number,
  yearLast: number
): IIncomeStream => ({
  color,
  reg,
  name,
  periods,
  taxable,
  year0,
  value0,
  yearLast,
})

/**
 * createStream recives an instance object, eg Wal Mart Employment income from 2009 - 2020. It places that object in the main reducer. T
 * Then it sets the UI reducer to have the id, and the stream name of that instance, that way all components know the details for the object they need to edit.
 *  */

export const createStream = (
  colorIndex: number,
  newStream: IIncomeStream,
  setValue_action: (id: string, reducer: string, value: any, childId: string) => void,
  streamType: string
): void => {
  //This creates a new Income Instance, such as from ages 18-22
  const id = streamType + (Math.random() * 1000000).toFixed() //creates the random ID that is the key to the object
  setValue_action(id, "main_reducer", { ...newStream, id }, "") //This action fires and sets the state in the income reducer creating a new item there,
  setValue_action("selectedId", "ui_reducer", id, "") // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
  setValue_action("colorIndex", "ui_reducer", colorIndex+1, "") // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
       
}

export const addPeriodToStream = (
  instance: any,
  period: number,
  selectedId: any,
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
): void => {
  setValue_action(selectedId, "main_reducer", period + 1, "periods")
  setValue_action(selectedId, "main_reducer", +instance[`year${period}`] + 3, `year${period + 1}`)
  setValue_action(selectedId, "main_reducer",  3000, `value${period + 1}`)
}

