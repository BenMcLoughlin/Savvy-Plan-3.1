export const getIncomeArrayForChart = ({ui_reducer}, secondIncomeObject) => {

  const { selectedUser }  = ui_reducer 


  const convertObjectToArrayForChart = (object, user) => {
    return Object.values(object).map(d =>  d[user].incomeStreams)
  }

  const convertObjectToCombinedArrayForChart = (object) => {
    return Object.values(object).map((d:any) =>  ({...d.user1.incomeStreams, ...d.user2.incomeStreams})
    )
  }
  
  switch(selectedUser) {
    case('user1'): return convertObjectToArrayForChart(secondIncomeObject, 'user1')
    case('user2'): return convertObjectToArrayForChart(secondIncomeObject, 'user2')
    case('combined'): return convertObjectToCombinedArrayForChart(secondIncomeObject)
  }
}