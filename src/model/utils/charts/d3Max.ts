import * as I from "model/types"

export const getMax = (chartName: string, allData): I.n => {
  switch (chartName) {
    case "incomeChart": {
      if (allData.calcResults.user2.topTenAvg) return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 10000
      return allData.calcResults.user1.topTenAvg + 10000
    }
    case "cpp":
      return 20000
    case "oas":
      return 12000
    case "income": {
      if (allData.calcResults.user2) return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 40000
      return allData.calcResults.user1.topTenAvg + 10000
    }
    case "lifespan":
      return 0.79
    case "savings":
      return allData.calcResults.user1.chartMax
    case "savingsChart": {
      if (allData.calcResults.user2.topTenAvg) return allData.calcResults.user1.topTenAvg + allData.calcResults.user2.topTenAvg + 10000
      return allData.calcResults.user1.topTenAvg + 10000
    }
    case "introSavings": {
      return 700000
    }
    case "overviewChart":
      return 100000

      return 100000
  }
}
