
import { IIncomeInstance } from "types/reducer_types"


/**
 * createStream recives an instance object, eg Wal Mart Employment income from 2009 - 2020. It places that object in the main reducer. T
 * Then it sets the UI reducer to have the id, and the stream name of that instance, that way all components know the details for the object they need to edit. 
 *  */

export const createStream = (newInstance:IIncomeInstance,  setValue_action: (id: string, reducer: string, value: any, childId: string) => void):void => {                                                             //This creates a new Income Instance, such as from ages 18-22
  const id = (Math.random() * 10000000000).toFixed()                                                                           //creates the random ID that is the key to the object
            setValue_action(id, "main_reducer", { ...newInstance, id }, "")                                                       //This action fires and sets the state in the income reducer creating a new item there,        
            setValue_action("selectedYear", "ui_reducer",  newInstance.stream, "")                                                      //we then set the stream in the ui reducer telling which values should be given to the edit box
            setValue_action("selectedId", "ui_reducer", id, "")                                                                           // determines which income instance to show within the edit box                                                                                                          // determines which income instance to show within the edit box
}

