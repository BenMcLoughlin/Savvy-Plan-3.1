import * as I from 'calculations/income/types'


const targetArrayDesign = [
  {
    year: 2021, 
    user1TfsaInterest: 3000, 
    user1TfsaPrinciple: 4000, 
    user1RrspInterest: 3000, 
    user1RrspPrinciple: 4000, 
  }
]

export const getSavingsArrayForChart = ({ui_reducer}, savingsObject: I.savingsObject) => {

  //console.log('JSON.stringify(savinsObject, null, 4):', JSON.stringify(savingsObject, null, 4))
  
  const { selectedUser, selectedAccount }  = ui_reducer 

  const array = Object.keys(savingsObject)
  
  switch(selectedUser) {
    // case('user1'): return convertObjectToArrayForChart(savingsObject, 'user1')
    // case('user2'): return convertObjectToArrayForChart(savingsObject, 'user2')
    // case('combined'): return convertObjectToCombinedArrayForChart(savingsObject)
  }
}