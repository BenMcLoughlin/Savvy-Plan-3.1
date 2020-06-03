import _ from "lodash"
import { IMainState, ISetValue_action } from "types/reducer_types"

const initialState = {
    dummyIncomeInstance: {
        color: "red",
        id: "dummyIncomeInstance",
        reg: "employment",
        stream: "Wal Mart Income",
        taxable: true,
        year1: 2009,
        year2: 2020,
        value: 50000,
    },
    // employmentIncome: {
    //     color: "#8CB8B7",
    //     year1: 18,
    //     reg: "employmentIncome",
    //     stream: "Employment Income",
    //     year2: 65,
    //     id: "employmentIncome",
    //     value: 0,
    // },
    // nonEmploymentIncome: {
    //     color: "#8CB8B7",
    //     year1: 18,
    //     reg: "employmentIncome",
    //     stream: "Non-Employment Income",
    //     year2: 65,
    //     id: "nonEmploymentIncome",
    //     value: 0,
    // },
    // spouseEmploymentIncome: {
    //     color: "#8CB8B7",
    //     year1: 18,
    //     reg: "employmentIncome",
    //     stream: "Employment Income",
    //     year2: 65,
    //     id: "spouseEmploymentIncome",
    //     value: 0,
    // },
    // TFSAinitialValue: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "TFSA",
    //     stream: "TFSA Contributions",
    //     year2: 64,
    //     id: "TFSAcontribution",
    //     transaction: "contribution",
    //     value: 0,
    // },
    // RRSPinitialValue: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "TFSA",
    //     stream: "TFSA Contributions",
    //     year2: 64,
    //     id: "TFSAcontribution",
    //     transaction: "contribution",
    //     value: 0,
    // },
    // NREGinitialValue: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "TFSA",
    //     stream: "TFSA Contributions",
    //     year2: 64,
    //     id: "TFSAcontribution",
    //     transaction: "contribution",
    //     value: 0,
    // },
    // primaryResidenceValue: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "property",
    //     stream: "property",
    //     year2: 64,
    //     id: "primaryResidenceValue",
    //     value: 0,
    // },
    // rent: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "expense",
    //     stream: "rent",
    //     year2: 64,
    //     id: "rent",
    //     value: 0,
    // },
    // primaryResidenceMortgage: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "property",
    //     stream: "property",
    //     year2: 64,
    //     id: "primaryResidenceMortgage",
    //     value: 0,
    // },
    // TFSAcontribution: {
    //     color: "#8CB8B7",
    //     year1: 17,
    //     reg: "TFSA",
    //     stream: "TFSA Contributions",
    //     year2: 64,
    //     id: "TFSAcontribution",
    //     transaction: "contribution",
    //     value: 0,
    // },
    // TFSAwithdrawal: {
    //     color: "#8CB8B7",
    //     year1: 65,
    //     reg: "TFSA",
    //     stream: "TFSA Withdrawals",
    //     year2: 95,
    //     id: "TFSAwithdrawal",
    //     taxable: false,
    //     transaction: "withdrawal",
    //     incomeType: "retirementIncome", 
    //     value: 0,
    // },
    // RRSPcontribution: {
    //     color: '#D8BABB',
    //     year1: 25,
    //     reg: "RRSP",
    //     stream: "RRSP Contributions",
    //     year2: 65,
    //     id: "RRSPcontribution",
    //     transaction: "contribution",
    //     taxType: "rrspDeduction",
    //     value: 0,
    // },  
    // RRSPwithdrawal: {
    //     color: '#D8BABB',
    //     year1: 66,
    //     reg: "RRSP",
    //     stream: "RRSP Withdrawals",
    //     year2: 95,
    //     id: "RRSPwithdrawal",
    //     transaction: "withdrawal",
    //     incomeType: "retirementIncome", 
    //     value: 0,
    // },
    // NREGcontribution: {
    //     color: '#D8BABB',
    //     year1: 25,
    //     reg: "RRSP",
    //     stream: "RRSP Contributions",
    //     year2: 65,
    //     id: "RRSPcontribution",
    //     transaction: "contribution",
    //     taxType: "rrspDeduction",
    //     value: 0,
    // },  
    // NREGwithdrawal: {
    //     color: '#D8BABB',
    //     year1: 66,
    //     reg: "RRSP",
    //     stream: "RRSP Withdrawals",
    //     year2: 95,
    //     id: "RRSPwithdrawal",
    //     transaction: "withdrawal",
    //     incomeType: "retirementIncome", 
    //     value: "",
    // },

}

export const main_reducer = (state: IMainState = initialState, action: ISetValue_action ) => {
    switch(action.type) {
        case "main_reducer/DELETE": return  _.omit(state, [action.id])                  
        case "main_reducer/SET_VALUE": return action.childId ? {...state, [action.id]: {...state[action.id], [action.childId]: action.value }}     //usually this action is just used to change a value within the object
                                                        :   
                                                        {...state, [action.id]: action.value}                                                      //but if I don't pass it an id then I'm telling it that I want to create a new instance
        default: return state
    }
}


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
