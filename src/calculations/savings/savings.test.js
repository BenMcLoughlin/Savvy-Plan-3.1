import {getSavings} from "calculations/savings/savings.function"
import {getValue} from "calculations/savings/create/createSavingsObject"
import {getSavingsArrayForChart} from "calculations/savings/create/createChartArray"

const mockState = {
  user_reducer: {
    user1BirthYear: 1988,
    user2BirthYear: 1990,
    user1LifeSpan: 95,
    user2LifeSpan: 95,
    user1CppStartAge: 65,
    user2CppStartAge: 65,
    user1OasStartAge: 65,
    user2OasStartAge: 65,
    child1BirthYear: 2014,
    child2BirthYear: 2010,
    hasChildren: "yes",
    maritalStatus: "single"
  },
  ui_reducer: {
    selectedAccoun: "after tax",
  },
  main_reducer: {
    user1tfsa_10000: {
      name:"",
      periods:0,
      currentValue:10000,
      contributionPeriods: 3, 
      contribution0StartYear:2020,
      contribution0Value:2000,
      contribution0EndYear:2031,
      contribution1StartYear:2031,
      contribution1Value:4000,
      contribution1EndYear:2042,
      contribution2StartYear:2042,
      contribution2Value:6000,
      contribution2EndYear:2052,
      period0StartYear:2052,
      period0Value:26000,
      period0EndYear:2079,
      taxable:true,
      color:"#4BB9D0",
      id:"user1tfsa_10000",
      owner:"user1",
      reg:"tfsa",
      streamType:"savings",
    },
    user1rrsp_10001: {
      name:"",
      periods:0,
      currentValue:10000,
      contributionPeriods: 2, 
      contribution0StartYear:2020,
      contribution0Value:2000,
      contribution0EndYear:2031,
      contribution1StartYear:2031,
      contribution1Value:4000,
      contribution1EndYear:2042,
      period0StartYear:2040,
      period0Value:0,
      period0EndYear:2060,
      taxable:true,
      color:"#4BB9D0",
      id:"user1rrsp_10001",
      owner:"user1",
      reg:"rrsp",
      streamType:"savings",
    },
    user1rrsp_10003: {
      name:"",
      periods:0,
      currentValue:10000,
      contributionPeriods: 2, 
      contribution0StartYear:2020,
      contribution0Value:2000,
      contribution0EndYear:2031,
      contribution1StartYear:2031,
      contribution1Value:4000,
      contribution1EndYear:2042,
      period0StartYear:2040,
      period0Value:0,
      period0EndYear:2060,
      taxable:true,
      color:"#4BB9D0",
      id:"user1rrsp_10001",
      owner:"user2",
      reg:"rrsp",
      streamType:"savings",
    },
    user1tfsa_10001: {
      name:"",
      periods:0,
      currentValue:222,
      contributionPeriods: 2, 
      contribution0StartYear:2020,
      contribution0Value:1000,
      contribution0EndYear:2040,
      period0StartYear:2020,
      period0Value:1000,
      period0EndYear:2040,
      taxable:true,
      color:"#4BB9D0",
      id:"user1Savings_3930",
      owner:"user2",
      reg:"tfsa",
      streamType:"savings",
    },
  },
};

const mockStream = {
  name: '',
  periods: 0,
  currentValue: 10000,
  contributionPeriods: 3, 
  contribution0StartYear: 2020,
  contribution0Value: 2000,
  contribution0EndYear: 2031,
  contribution1StartYear: 2031,
  contribution1Value: 4000,
  contribution1EndYear: 2042,
  period0StartYear: 2040,
  period0Value: 1000,
  period0EndYear: 2060,
  taxable: true,
  color: '#4BB9D0',
  id: 'user1rrsp_10001',
  owner: 'user1',
  reg: 'rrsp',
  streamType: 'savings'
}

//TEST HELPER FUNCTIONS

// //GetValue
// describe("Ensures savings object is accurate", function () {
//   it("Can search stream to return the contribution for that period", () =>
//     expect(getValue("contribution", mockStream, 2030)).toEqual(2000))
//   it("Can search stream to return the withdrawal for that period", () =>
//     expect(getValue("period", mockStream, 2045)).toEqual(1000))
// })


// //test Creation of savings object

// describe("Ensures savings object is accurate", function () {
//   it("Test 1 - matches time value ", () =>
//     expect(getSavings(mockState)["2030"]["user1"].tfsa.totalValue.toFixed(2)).toEqual("48926.27"))
//   it("Test 2 - matchs time value varying contributions", () =>
//    expect(getSavings(mockState)["2040"]["user1"].tfsa.totalValue.toFixed(2)).toEqual("140342.68"))
//   it("Test 3 - matchs time value varying contributions", () =>
//    expect(getSavings(mockState)["2051"]["user1"].tfsa.totalValue.toFixed(2)).toEqual("352660.47"))
//   it("Test 4 - shows proper amount after withdrawal", () =>
//    expect(getSavings(mockState)["2052"]["user1"].tfsa.totalValue.toFixed(2)).toEqual("347820.09"))
//   it("Test 4 - shows proper amount after withdrawal", () =>
//    expect(getSavings(mockState)["2052"]["user1"].tfsa.principle.toFixed(2)).toEqual("125973.36"))
//   it("Test 4 - shows proper amount after withdrawal", () =>
//    expect(getSavings(mockState)["2052"]["user1"].tfsa.totalInterest.toFixed(2)).toEqual("221846.74"))
//   it("Test 4 - shows proper amount after withdrawal", () =>
//    expect(getSavings(mockState)["2077"]["user1"].tfsa.totalInterest.toFixed(2)).toEqual("61755.91"))
// }
// )


//test building of savings charts


describe("Ensures savings object is accurate", function () {
  it("Test 1 - matches time value ", () =>
  expect(getSavingsArrayForChart(mockState, getSavings(mockState))).toEqual("48926.27"))
}
)

