import * as I from "model/types"

export const exampleState = (): I.state => ({
  ui_reducer: {
    selectedId: "user1Savings_6529",
    selectedScenario: 1,
    colorIndex: 3,
    progress: 24,
    selectedPage: "savings",
    selectedAccount: "tfsa",
    selectedUser: "user1",
    dualSelectValue: true,
    newStream: false,
    scenarios: {
      [1]: "base",
    },
  },
  stream_reducer: {
    user1Income_589848: {
      amortization: 0,
      color: "#72929B",
      cppEligible: true,
      createdAt: 1603746619155,
      currentValue: 0,
      flow: "in",
      in: {
        "1": {
          start: 2020,
          value: 0,
          end: 2030,
        },
      },
      id: "user1Income_589848",
      owner: "user1",
      out: {
        "1": {
          start: 2020,
          value: 0,
          end: 2030,
        },
      },
      name: "Wal Mart",
      payment: 0,
      streamType: "income",
      rate: 0,
      reg: "tfsa",
      taxable: true,
      scenarios: 0,
      startValue: 0,
      startYear: 0,
      periodIn: 1,
      periodOut: 1,
    },
    user1Income_979566: {
      amortization: 0,
      color: "#B0CFE3",
      cppEligible: true,
      createdAt: 1603746636747,
      currentValue: 0,
      flow: "in",
      in: {
        "1": {
          start: 2020,
          value: 0,
          end: 2030,
        },
      },
      id: "user1Income_979566",
      owner: "user1",
      out: {
        "1": {
          start: 2020,
          value: 0,
          end: 2030,
        },
      },
      name: "",
      payment: 0,
      streamType: "income",
      rate: 0,
      reg: "tfsa",
      taxable: true,
      scenarios: 0,
      startValue: 0,
      startYear: 0,
      periodIn: 1,
      periodOut: 1,
    },
    user1Savings_6529: {
      amortization: 0,
      color: "#FEDE76",
      cppEligible: true,
      createdAt: 1603746649696,
      currentValue: 5000,
      flow: "out",
      in: {
        "1": {
          start: 2050,
          value: 6000,
          end: 2085,
        },
      },
      id: "user1Savings_6529",
      owner: "user1",
      out: {
        "1": {
          start: 2020,
          value: 300,
          end: 2030,
        },
        "2": {
          start: 2030,
          value: 1800,
          end: 2035,
        },
        "3": {
          start: 2035,
          value: 3800,
          end: 2049,
        },
      },
      name: "",
      payment: 0,
      streamType: "savings",
      rate: 0,
      reg: "tfsa",
      taxable: true,
      scenarios: 0,
      startValue: 0,
      startYear: 0,
      periodIn: 1,
      periodOut: 3,
    },
  },
  user_reducer: {
    numberOfChildren: 1,
    hasChildren: false,
    hasChildrenStatus: "no",
    inflationRate: 2,
    maritalStatus: "married",
    MER: 2,
    province: "British Columbia",
    rate1: 6,
    rate2: 4.5,
    isMarried: true,
    desiredRetirementIncome: 0,
    user1: {
      birthYear: 1990,
      cppStartAge: 65,
      firstName: "",
      lastName: "",
      gender: "male",
      oasStartAge: 65,
      lifeSpan: 95,
    },
    user2: {
      birthYear: 1990,
      cppStartAge: 65,
      firstName: "",
      lastName: "",
      gender: "female",
      oasStartAge: 65,
      lifeSpan: 95,
    },
  },
  auth_reducer: {
    token: null,
    isLoading: false,
    errors: {},
  },
})

export const exampleOverviewData = (): I.a => {
  const data = {}
  for (let year = 2010; year <= 2090; year++) {
    data[year] = {
      income: year < 2020 ? 25000 : year < 2030 ? 45000 : year < 2035 ? 50000 : year < 2035 ? 55000 : year < 2040 ? 58000 : 62000,
      spending: year < 2020 ? 23000 : year < 2030 ? 41000 : year < 2035 ? 52000 : year < 2035 ? 49000 : year < 2040 ? 54000 : 62000,
      netWorth: year < 2020 ? 23000 : year < 2030 ? 41000 : year < 2035 ? 52000 : year < 2035 ? 49000 : year < 2040 ? 54000 : 62000,
    }
  }
  return data
}
