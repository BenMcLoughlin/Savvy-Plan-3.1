import _ from "lodash"
import { newIncomeStream, createStream } from "services/create_functions"

interface IData {
  chart: string
}

/**
 * incomePage_data receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const onboardPage_data = (state: any, set: any): any => {

  const data = {

  }

  return data
}
