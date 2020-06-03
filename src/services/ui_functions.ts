
import { IIncomeStream } from "types/reducer_types"


/**
 * createStream recives an instance object, eg Wal Mart Employment income from 2009 - 2020. It places that object in the main reducer. T
 * Then it sets the UI reducer to have the id, and the stream name of that instance, that way all components know the details for the object they need to edit. 
 *  */

export const createStream = (newStream:IIncomeStream,  setValue_action: (id: string, reducer: string, value: any, childId: string) => void, streamType: string):void => {                                                             //This creates a new Income Instance, such as from ages 18-22
  const id = streamType + (Math.random() * 1000000).toFixed()                                                                           //creates the random ID that is the key to the object
            setValue_action(id, "main_reducer", { ...newStream, id }, "")                                                      //This action fires and sets the state in the income reducer creating a new item there,        
            setValue_action("selectedId", "ui_reducer", id, "")                                                                // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
}

export const addPeriodToStream = (instance:any, period: number, selectedId: string, setValue_action: (id: string, reducer: string, value: any, childId?: string) => void):void => {                                                      
  setValue_action("period", "ui_reducer", period+1 )                                                                                                                  
  setValue_action(selectedId, "main_reducer", period + 1, 'periods')                                                          
  setValue_action(selectedId, "main_reducer", instance[`year${period}`] + 3, `year${period+1}`)                                                          
  setValue_action(selectedId, "main_reducer", instance[`value${period}`], `value${period+1}`)                                                          
  setValue_action(selectedId, "main_reducer", instance[`year${period}`] + 5, `year${period+2}`)                                                          
}
