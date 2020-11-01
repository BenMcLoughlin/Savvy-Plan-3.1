// import { getIncome } from "calculations/income/income"

// const mockState = {
//   user_reducer: {
//     user1BirthYear: 1988,
//     user1LifeSpan: 95,
//     user1CppStartAge: 65,
//     user1OasStartAge: 65,
//     user2BirthYear: 1988,
//     user2LifeSpan: 95,
//     user2CppStartAge: 65,
//     user2OasStartAge: 65,
//     maritalStatus: "single",
//     child1BirthYear: 2020,
//     child2BirthYear: 2034,
//   },
//   ui_reducer: {
//     selectedAccount: "beforeTax",
//     selectedUser: "user1",
//   },
//   streams_reducer: {
//     //TEST 1 - confirmation documentation found in CPP docs
//     user1Income_13719: {
//       cppEligible: true,
//       name: "Wal Mart",
//       periods: 3,
//       period0StartYear: 2006,
//       period0Value: 30000,
//       period0EndYear: 2021,
//       period1StartYear: 2021,
//       period1Value: 58700,
//       period1EndYear: 2038,
//       period2StartYear: 2038,
//       period2Value: 90000,
//       period2EndYear: 2053,
//       taxable: true,
//       createdAt: "2020-07-29T21:23:30.196Z",
//       color: "#72929B",
//       id: "user1Income_137197",
//       owner: "user1",
//       reg: "regular employment",
//       streamType: "income",
//     },
//     user2Income_13719: {
//       cppEligible: true,
//       name: "Best Buy",
//       periods: 2,
//       period0StartYear: 2006,
//       period0Value: 30000,
//       period0EndYear: 2033,
//       period1StartYear: 2033,
//       period1Value: 58700,
//       period1EndYear: 2053,
//       taxable: true,
//       createdAt: "2020-07-29T21:23:30.196Z",
//       color: "#72929B",
//       id: "user1Income_137197",
//       owner: "user2",
//       reg: "regular employment",
//       streamType: "income",
//     },
//     user1Savings_817009: {
//       cppEligible: false,
//       name: "Ben's tfsa",
//       periods: 0,
//       currentValue: 0,
//       contributePeriods: 0,
//       contribute0StartYear: 2020,
//       contribute0Value: 6000,
//       contribute0EndYear: 2040,
//       period0StartYear: 2055,
//       period0Value: 31600,
//       period0EndYear: 2085,
//       taxable: false,
//       createdAt: "2020-09-02T20:43:27.296Z",
//       color: "#72929B",
//       id: "user1Savings_817009",
//       owner: "user1",
//       reg: "tfsa",
//       streamType: "savings",
//     },
//   },
// }

// describe("CPP calculation is in line with with Dougs", function () {
//   it("MOCK TEST", () => expect(1).toEqual(1))
//   // it("born 1988, 30k 2006-2020, 58k 2020 - 2037, 90k 2038-2052 should be 17916.78", () =>
//   //   expect(getIncome(mockState)[2070].user1.beforeTaxTaxableIncomeStreams.user1CppBenefit.toFixed(2)).toEqual("17916.78"))
//   // it("born 1988, 30k 2006-2032, 58k 2020 - 2052, 90k 2038-2052 should be 14,266.69 ", () =>
//   //   expect(getIncome(mockState)[2070].user2.beforeTaxTaxableIncomeStreams.user2CppBenefit.toFixed(2)).toEqual("14266.69"))
// })
