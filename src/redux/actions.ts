import {ISetValue_action} from "types/reducer_types"

export const setValue_action = (id: string, reducer: string, value: any, childId: any):ISetValue_action => {
  return   ({  
      type: `${reducer}/SET_VALUE`,
      childId,                                                                        // child id in the id value pair of the object nested within the parent object, 
      id,                                                                             // parent id is the id to the lower level child object
      value
  })
}
                         


