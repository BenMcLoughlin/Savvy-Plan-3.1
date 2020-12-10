import * as I from "model/types"

export const getMax = (chartName: string, allData): I.n => {
  switch (chartName) {
    case "cpp":
      return 20000
    case "oas":
      return 12000
    case "income": {
      let max = 80000
      if (allData.calcResults.user2) {
        max = allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 40000
      }
      if (allData.calcResults.user1.topTenAvg) {
        max = allData.calcResults.user1.topTenAvg + 10000
      }
       max = Math.max(...Object.values(allData.forcast).map((d: any) => d.user1.taxableInc))
      return max > 90000 ? max + 30000 : 80000
    }
    case "lifespan":
      return 0.79
    case "savings":
      return allData.calcResults.user1.chartMax
    case "savingsChart": {
      if (allData.calcResults.user2.topTenAvg)
        return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 10000
      return allData.calcResults.user1.topTenAvg + 30000
    }
    case "introSavings": {
      return 700000
    }
    case "landingSavings": {
      return 700000
    }
    case "overviewChart":
      return 100000
  }
}
