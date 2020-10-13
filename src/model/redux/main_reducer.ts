import _ from "lodash"
import * as I from "model/types"

const initialState = {

}

export const main_reducer = (state: I.main_reducer = initialState, action: any) => {
  switch (action.type) {
    case "main_reducer/remove":
      return _.omit(state, [action.id])
    case "main_reducer/SET_VALUE":
      return action.childId3
        ? {
            ...state,
            [action.id]: {
              ...state[action.id],
              [action.childId1]: {
                ...state[action.id][action.childId1],
                [action.childId2]: {
                  ...state[action.id][action.childId1][action.childId2],
                  [action.childId3]: action.value,
                },
              },
            },
          }
        : action.childId2
        ? {
            ...state,
            [action.id]: {
              ...state[action.id],
              [action.childId1]: {
                ...state[action.id][action.childId1],
                [action.childId2]: action.value,
              },
            },
          }
        : action.childId1
        ? { ...state, [action.id]: { ...state[action.id], [action.childId1]: action.value } } //usually this action is just used to change a value within the object
        : { ...state, [action.id]: action.value } //but if I don't pass it an id then I'm telling it that I want to create a new instance
    default:
      return state
  }
}
