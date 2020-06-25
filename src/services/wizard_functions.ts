import * as arrayCreators from "data/wizard"
import _ from "lodash"

export const addInstanceArray = (main_reducer, query, remove, set, state, streamType, wizardArray) => {
  const createArray = arrayCreators[`create${_.startCase(streamType)}Array`]

  Object.values(main_reducer)
    .filter((d: any) => d.id.includes(query))
    .map((instance: any) => {
      //looks at all the income streams listed in the main reducer
      const incomeData = createArray(instance, set, state, remove) //creates an wizardArray for each income incomeStream, enabling the user to change individual details in the wizard
      return incomeData.wizardArray.map((d: any, i: number) => {
        //maps through the wizardArray and pushes the contents to the main wizardArray that controls the wizard
        wizardArray.push(d)
      })
    })
}
