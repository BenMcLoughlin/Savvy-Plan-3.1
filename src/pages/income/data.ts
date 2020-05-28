
import {IUserState, IMainState , IIncomeInstance, IUiState} from "types/reducer_types"
import { IOnboard,  } from "types/component_types"

/**
 * newIncomeInstance is a function that creates a new income instance. An instance represents income for a certain period. Eg. Wal mart Income from 2009 - 2020. 
 * It is different than other instances in the same stream because the value is different. Eg. the user may have made less money for the first 5 years of employment, then more later.   
 *  */

export const newIncomeInstance = (color: string, reg: string, stream: string, taxable: boolean, year1: number, year2: number, value: number ):IIncomeInstance => ({ 
  color, 
  year1, 
  reg, 
  stream,
  taxable, 
  year2, 
  value,
})

export const income_data = (state:any):IOnboard[] => {
  
   const { user_reducer, main_reducer, ui_reducer } = state

   const { birthYear,  } = user_reducer

  const { selectedYear, selectedId, change } = ui_reducer

   const selectedYear1 = main_reducer[selectedId].year1
   const selectedYear2 = main_reducer[selectedId].year2

   const insertIncomeStream = () => {

   }

  const array:IOnboard[] = [
    {
              ask: "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
              component: "Button",
              id: "progress",
              reducer: "ui_reducer",
              subTitle:  "", 
              title: "We’re going to put all your income streams into one simple chart. ",
              label: "Lets go!",
              value: 1,
            },
    {
              ask: "The dark bars on the right show your Old Age Security income which is free money you get from the government after you turn 65. But if you’re earning too much in retirement, they take it away! By using our fancy math strategies we’ll do our best to prevent that from happening. ",
              component: "",
              id: "progress",
              reducer: "ui_reducer",
              subTitle:  "", 
              title: "See how you already have money showing up in your chart? That’s free money from the government. Our goal is for you to be allowed to keep that money.",
              label: "continue",
              value: 1,
            },
    {
              ask: "Canada Pension Plan pays you money based on how much you earn starting at age 18. By inputting your income we can estimate how much you’ll get. ",
              component: "",
              id: "progress",
              reducer: "ui_reducer",
              subTitle:  "", 
              title: "We need you to add the different types of income you’ve earned and will earn over your life. Don’t worry, estimating is fine. ",
              label: "continue",
              value: 1,
            },
            {
              ask: "The goal is to have your working income streams eventually be replaced by passive income streams. ",
              component: "TextInput",
              childId: "stream",
              id:  selectedId,
              reducer: "main_reducer", 
              title: "Add your first income stream, preferably the primary source of income throughout your life. ",
              placeholder: "Income Name",
              type: "text",
            },
            {
              array: ["Regular Employment", "Business Income", "Investment Income", "write below"],
              ask: "We want to ensure our planning process is inclusive.",
              component: "MultiSelect",
              childId: "reg",
              id:  selectedId,
              reducer: "main_reducer", 
              title: "What kind of income is it?",
              textInput: true,
            },
  
        {
              ask: "When did you start working there? ",
              bottomLabel: `at age ${selectedYear1 - +birthYear}`,
              component: "Slider",
              childId: "year1",
              id:  selectedId,
              max: 2050,
              min: 1990,
              step: 1,
              topLabel: "I started in ",
              reducer: "main_reducer",
              title: "When did you start working there? ",
              type: "year",
        },
        {
              ask: "How much were you earning when you started?",
              bottomLabel: "before tax per year",
              childId: "value",
              component: "Slider",
              id:  selectedId,
              max: 400000,
              step: 1000,
              topLabel: "I earned ",
              reducer: "main_reducer", 
              title: "How much were you earning when you started?",
        },
            {
              ask: "",
              component: "DualSelect",
              id: "nonEmploymentIncome",
              option1: "yes",
              option2: "no",
              reducer: "user_reducer",
              title: "Did it ever change?",
        },
          {
              ask: "What year did it change? ",
              bottomLabel: `at age ${selectedYear2 - +birthYear}`,
              component: "Slider",
              childId: "year2",
              id:  selectedId,
              max: 2050,
              min: 1990,
              step: 1,
              topLabel: "It changed in ",
              reducer: "main_reducer",
              title: "What year did it change? ",
              type: "year",
      },
    {
      ask: "",
      bottomLabel: "before tax per year",
      component: "Slider",
      id: "lifeSpan",
      max: 400000,
      step: 1000,
      topLabel: "I earned ",
      reducer: "user_reducer",
      title: "How much did it change to?",
    },
    {
      ask: "",
      component: "DualSelect",
      id: "nonEmploymentIncome",
      option1: "yes",
      option2: "no",
      reducer: "user_reducer",
      title: "Did it change again?",
    },
    {
      ask: "When did you, or do you think, you'll stop working there? ",
      bottomLabel: "at age 22",
      component: "Slider",
      id: "lifeSpan",
      max: 120,
      step: 1,
      topLabel: "I stopped in ",
      reducer: "user_reducer",
      title: "When did you start working there? ",
    },
  ]

    return array

 }

