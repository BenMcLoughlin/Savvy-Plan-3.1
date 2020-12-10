import planComparisonData from "data/introPlanComparison.json"


/** format.introduction
* formats data for the stacked area chart the users see in the first introduction page
 *@param 
 *@returns 
**/ 
  

export const introduction = () => {
  const chartData = []
  const rawData = planComparisonData.reduce((a, d) => {
    chartData.push({ year: d.year, user2: d.user2TotalSavings, user1: d.user1TotalSavings - d.user2TotalSavings })
    return { ...a, [d.year]: d }
  }, {})
  return {
    chartData,
    rawData,
  }
}
