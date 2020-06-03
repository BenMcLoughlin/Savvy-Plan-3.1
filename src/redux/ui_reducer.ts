import {IUiState, ISetValue_action} from "types/reducer_types"

const initialState: IUiState = { 
    change: false,
    selectedId: "dummyIncomeInstance",
    changeColor: 0,
    videoUrl: "",
    progress: 0, 
    selectedPage: "income",
    selectedOption: "",
}

export function ui_reducer (state: IUiState = initialState, action: ISetValue_action):IUiState {
    switch(action.type) {
        case "ui_reducer/SET_VALUE": return {...state, [action.id]: action.value}                                 //sets a simple id value pair within the reducer object  
        default: return state
    }
}


