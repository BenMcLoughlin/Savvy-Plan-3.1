import { createStream } from "model/services/create_functions"
import { removeMostRecentStream, getYearRange, formatNestEggData, formatCppChartData, formatOasChartData } from "controller/questions/helpers"
import { validateNext } from "model/services/validation/validators"
import { createTripleSliders } from "controller/questions/tripleSelector.creator"
import { createDualSliders } from "controller/questions/createDualSlider.creator"
import * as I from "model/types"

import { dummyStream } from "data"
import { store } from "index"
import { set, remove } from "model/redux/actions"

export const onboardQuestions = (q: I.a, user: I.user, addText: I.a): I.objects => {
  const state = store.getState()
  const { stream_reducer, ui_reducer } = state
  const { selectedId, dualSelectValue, changeRateAssumptions, changeRetirementAssumptions, users } = state.ui_reducer
  const stream: I.stream = state.stream_reducer[selectedId] || dummyStream
  const { birthYear, lifeSpan, gender, firstName, cppStartAge, oasStartAge, rrspStartAge, tfsaStartAge } = state.user_reducer[user]
  const { id, streamType, reg } = stream
  const { numberOfChildren, maritalStatus, rate1, rate2, inflationRate, mer } = state.user_reducer

  return {
    for: {
      birthYear: () =>
        q.push({
          ...{
            component: "TextInput", //Text input will capture their birthyear
            value: birthYear,
            name: "year", //by setting it as streamType year the component will place valiation on the text
            handleChange: (e: I.event) => set("user_reducer", { [user]: { birthYear: +e.target.value } }),
            onNext: () => {
              const { chartStartYear, chartEndYear } = getYearRange(state, user)
              set("ui_reducer", { chartStartYear, chartEndYear })
              // set("user_reducer", { [user]: { startWork, endWork } })
              //store.dispatch({ type: "user_reducer/SET", payload: { [user]: { startWork, endWork } } })
            },
          },
          ...addText("birthYear", user),
        }),
      cppStartAge: () => {
        q.push({
          ...{
            chart: "AreaChart",
            data: formatCppChartData(state, user),
            chartName: "cpp",
            component: "Slider",
            max: 70,
            min: 60,
            step: 1,
            value: cppStartAge,
            handleChange: value => {
              set("user_reducer", { [user]: { cppStartAge: value } })
            },
          },
          ...addText("cppStartAge", user),
        })
      },
      retIncome: () =>
        q.push({
          ...{
            component: "Slider",
            max: 300000,
            min: 0,
            step: 1000,

            value: state.user_reducer.retIncome,
            handleChange: value => {
              set("user_reducer", { retIncome: value })
            },
          },
          ...addText("retIncome", user),
        }),

      gender: () =>
        q.push({
          ...{
            component: "PickSingleOption", //this component allows the user to choose one of a number of options
            value: gender,
            handleChange: (value: string) => set("user_reducer", { [user]: { gender: value } }),
            handleChange2: (e: I.event) => set("user_reducer", { [user]: { gender: `write below: ${e.target.value}` } }),
          },
          ...addText("gender", user),
        }),
      name: () =>
        q.push({
          ...{
            placeholder: "Name",
            component: "TextInput", // tells the wizard to render a text input in which the user types their name
            streamType: "text",
            value: firstName,
            handleChange: (e: I.event) => set("user_reducer", { [user]: { firstName: e.target.value } }),
          },
          ...addText("name", user),
        }),
      numberOfChildren: () =>
        q.push({
          ...{
            component: "PickNumberWithText",
            value: numberOfChildren,
            value2: numberOfChildren,
            childValue: numberOfChildren,
            valid: numberOfChildren > 0,
            handleChange: (e: any) => set("user_reducer", { numberOfChildren: +e }),
            handleChange2: (e: I.event) => set("user_reducer", { [e.target.name]: +e.target.value }),
          },
          ...addText("numberOfChildren", user),
        }),
      oasStartAge: () => {
        q.push({
          ...{
            chart: "AreaChart",
            data: formatOasChartData(user),
            chartName: "oas",
            component: "Slider",
            max: 70,
            min: 65,
            step: 1,
            value: oasStartAge,
            handleChange: value =>  set("user_reducer", { [user]: { oasStartAge: value } }),
            onNext: () =>  set("ui_reducer", { showRetirementAssumptions: true })
          },
          ...addText("oasStartAge", user),
        })
      },
      income: {
        amount: n => {
          const data = {
            ...{
              chart: "IncomeChart",
              max: 250000,
            },
            ...addText("incomeAmount", user, n),
          }
          q.push(createTripleSliders("in", data, "periodIn", stream))
        },
        name: i =>
          q.push({
            ...{
              component: "TextInput",
              value: stream.name,
              handleChange: (e: I.event) => set("stream_reducer", { [id]: { name: e.target.value } }),
            },
            ...addText("incomeName", user, i),
          }),
        registration: () =>
          q.push({
            ...{
              component: "PickSingleOption",
              value: reg,
              handleChange: (value: string) => set("stream_reducer", { [id]: { reg: value } }),
            },
            ...addText("incomeRegistration", user),
          }),
      },
      inflationRate: () => {
        q.push({
          ...{
            component: "Slider",
            type: "percentage",
            max: 5,
            min: 0,
            step: 0.1,

            value: inflationRate,
            handleChange: value => {
              set("user_reducer", { inflationRate: value, r1: (rate1 - mer - value) / 100, r2: (rate2 - mer - value) / 100 })
            },
          },
          ...addText("inflationRate", user),
        })
      },
      lifeSpan: () => {
        q.push({
          ...{
            component: "Slider",
            max: 120,
            min: 75,
            step: 1,
            value: lifeSpan,
            handleChange: value => set("user_reducer", { [user]: { lifeSpan: value } }),
            onNext: () =>  set("ui_reducer", { showAssumptionsPanel: true })
          },
          ...addText("lifeSpan", user),
        })
      },
      managementExpenseRatio: () => {
        q.push({
          ...{
            component: "Slider",
            type: "percentage",
            max: 4,
            min: 0,
            step: 0.1,
            selectedFocus: true,
            value: mer,
            handleChange: value => set("user_reducer", { mer: value, r1: (rate1 - value - inflationRate) / 100, r2: (rate2 - value - inflationRate) / 100 }),
          },
          ...addText("managementExpenseRatio", user),
        })
      },
      rate1: () => {
        q.push({
          ...{
            component: "Slider",
            type: "percentage",
            max: 10,
            min: 0,
            step: 0.1,
            selectedFocus: true,
            value: rate1,
            handleChange: value => set("user_reducer", { rate1: value, r1: (value - mer - inflationRate) / 100 }),
          },
          ...addText("rate1", user),
        })
      },
      rate2: () => {
        q.push({
          ...{
            component: "Slider",
            type: "percentage",
            max: 10,
            min: 0,
            step: 0.1,
            selectedFocus: true,
            value: rate2,
            handleChange: value => {
              set("user_reducer", { rate2: value, r1: (value - mer - inflationRate) / 100 })
            },
          },
          ...addText("rate2", user),
        })
      },
      rrspStartAge: () => {
        q.push({
          ...{
            component: "MultiSliders",
            num: users.length,
            value: rrspStartAge,
            min: 50,
            max: 72,
            step: 1,
            handleChange: value => set("user_reducer", { [user]: { rrspStartAge: value } }),
            ...createDualSliders("rrspStartAge"),
          },

          ...addText("rrspStartAge", user),
        })
      },
      tfsaStartAge: () => {
        q.push({
          ...{
            component: "MultiSliders",
            num: users.length,
            value: tfsaStartAge,
            min: 50,
            max: 80,
            step: 1,
            handleChange: value => set("user_reducer", { [user]: { tfsaStartAge: value } }),
            ...createDualSliders("rrspStartAge"),
          },
          ...addText("tfsaStartAge", user),
        })
      },
      savings: {
        currentValue: () =>
          q.push({
            ...{
              component: "Slider",
              max: 300000,
              min: 0,
              step: 1000,

              value: stream.currentValue,
              handleChange: (value: string) => {
                set("ui_reducer", { dualSelectValue: true, selectedAccount: stream.reg })
                set("stream_reducer", { [id]: { currentValue: value } })
              },
            },
            ...addText("savingsCurrentValue", user),
          }),
        contributions: n => {
          const data = {
            ...{
              chart: "SavingsChart",
              max: reg === "tfsa" ? 6000 : reg === "rrsp" ? 30000 : 100000,
            },
            ...addText("savingsContributions", user, n),
          }
          q.push(createTripleSliders("out", data, "periodOut", stream))
        },
        withdrawals: n => {
          const data = {
            ...{
              chart: "SavingsChart",
              type: "withdrawals",
              max: 100000,
            },
            ...addText("savingsWithdrawals", user, n),
          }
          q.push(createTripleSliders("in", data, "periodIn", stream))
        },
      },
    },
    if: {
      theyHaveChildren: () =>
        q.push({
          ...{
            component: "PickSingleOption",
            value: state.user_reducer.hasChildrenStatus,
            handleChange: (value: string) => {
              set("ui_reducer", { hasChildren: value === "yes" || value === "hope to eventually" })
              set("user_reducer", { hasChildrenStatus: value })
            },
          },
          ...addText("haveChildren", user),
        }),
      isMarried: () =>
        q.push({
          ...{
            component: "PickSingleOption",
            value: maritalStatus,
            handleChange: (value: string) => {
              set("user_reducer", { maritalStatus: value })
              if (value === "married" || value === "common-law") {
                set("ui_reducer", { isMarried: true, users: ["user1", "user2"] })
              } else {
                set("ui_reducer", { users: null })
                set("ui_reducer", { isMarried: false, users: ["user1"] })
              }
            },
          },
          ...addText("isMarried", user),
        }),
      theyWantToChangeRateAssumptions: () =>
        q.push({
          ...{
            component: "DualSelect",
            value: changeRateAssumptions,
            handleChange: () => set("ui_reducer", { dualSelectValue: true, changeRateAssumptions: true }),
            handleChange2: () => set("ui_reducer", { dualSelectValue: false, changeRateAssumptions: false }),
            onNext: () => {
              if (!changeRateAssumptions) {
                set("ui_reducer", { showAssumptionsPanel: true })
              }
            },
          },
          ...addText("theyWantToChangeRateAssumptions", user),
        }),
      theyWantToChangeRetirementAssumptions: () =>
        q.push({
          ...{
            component: "DualSelect",
            value: changeRetirementAssumptions,
            handleChange: () => set("ui_reducer", { dualSelectValue: true, changeRetirementAssumptions: true }),
            handleChange2: () => set("ui_reducer", { dualSelectValue: false, changeRetirementAssumptions: false }),
            onNext: () => {
              if (!changeRetirementAssumptions) {
                set("ui_reducer", { showRetirementAssumptions: true })
              }
            },
          },
          ...addText("theyWantToChangeRetirementAssumptions", user),
        }),
      addAnother: {
        income: () =>
          q.push({
            ...{
              component: "DualSelect",
              value: ui_reducer.dualSelectValue,
              handleChange: () => {
                set("ui_reducer", { dualSelectValue: true, selectedUser: user })
                createStream(streamType, "in", user, "employment")
              },
              handleChange2: (option, clickFired: boolean) => {
                set("ui_reducer", { dualSelectValue: false })
                if (clickFired) {
                  removeMostRecentStream(user, streamType)
                }
              },
            },
            ...addText("addAnotherIncome", user),
          }),
      },
    },
    to: {
      create: {
        income: () =>
          q.push({
            ...{
              component: "Button",
              valid: true,
              handleChange: () => {
                createStream("income", "in", user, "employment")
                set("ui_reducer", { progress: ui_reducer.progress + 1, selectedUser: user })
              },
            },

            ...addText("createIncome", user),
          }),
        savings: () =>
          q.push({
            ...{
              arrayOfSelected: Object.values(stream_reducer).filter((d: any) => d.id.includes(`user1Savings`)),
              component: "PickMultipleOptions",
              user: "user1",
              value: dualSelectValue,
              onNext: () => {
                set("ui_reducer", { selectedUser: "user1" })
              },
              handleChange: (selected, d: any) => {
                if (!selected && d.label !== "none") {
                  // check if the item doesnt already exist, or its not none, and will then create a new income st
                  createStream("savings", "out", user, d.reg.toLowerCase())
                } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
                if (selected) {
                  //the user needs to be able to remove the new object if they click on it again enabling them to remove the account they added.
                  removeMostRecentStream(user, streamType)
                }
                if (d.label === "none") {
                  //the user needs to be able to remove the new object if they click on it again enabling them to remove all accounts added
                  const selectedInstances: any = Object.values(stream_reducer).filter((b: any) => b.id.includes("user1Savings")) //searches the main reducer to find the matching object to be removed
                  selectedInstances.map((instance: any) => remove(instance.id))
                  set("ui_reducer", { [id]: "" })
                }
              },
              //onClick: reg => createStream(colorIndex, newSavingsStream(reg, +birthYear1 + 65), set, `savings`, "user1"),
            },
            ...addText("createSavings", user),
          }),
      },
    },
  }
}

export const showUsers = (q: I.a, addText: I.a): I.objects => {
  const state = store.getState()
  const { selectedUser, isMarried } = state.ui_reducer
  const { firstName: user1Name } = state.user_reducer.user1
  const { firstName: user2Name } = state.user_reducer.user2

  return {
    assumptionsPanel: () =>
      q.push({
        component: "Arrow",
        ...addText("assumptionsPanel", "user1"),
      }),
    combinedIncomeChart: () =>
      q.push({
        ...{
          chart: "IncomeChart",
          component: "TripleSelector",
          enableNav: true,
          value: selectedUser,
          user1Name,
          user2Name,
          handleChange: d => set("ui_reducer", { selectedUser: d }),
        },
        ...addText("combinedIncomeChart", "user1"),
      }),

    incomeParagraph: () =>
      q.push({
        ...{
          chart: "IncomeChart",
          component: "Paragraph",
          enableNav: true,
        },
        ...addText("incomeParagraph", "user1"),
      }),
    introduction: () =>
      q.push({
        ...{
          chart: "SavingsChart",
          useExampleState: true,
        },
        ...addText("introduction", "user1"),
      }),
    retirementAssumptionsPanel: () =>
      q.push({
        ...addText("retirementAssumptionsPanel", "user1"),
      }),
    targetIncomeChart: () =>
      q.push({
        ...{
          chart: "IncomeChart",
          show: "targetIncome",
          component: isMarried ? "TripleSelector" : "null",
          enableNav: true,
          value: selectedUser,
          user1Name,
          user2Name,
          handleChange: d => set("ui_reducer", { selectedUser: d }),
        },
        ...addText("targetIncomeChart", "user1"),
      }),
    targetNestEgg: () =>
      q.push({
        ...{
          chart: "DonutChart",
          data: formatNestEggData(state),
          handleChange: d => set("ui_reducer", { selectedUser: d }),
        },
        ...addText("targetNestEgg", "user1"),
      }),
    whatWeWillBuild: () =>
      q.push({
        ...addText("whatWeWillBuild", "user1"),
      }),
  }
}

export const buttons = (q: I.a): any => {
  const state = store.getState()
  const { progress } = store.getState().ui_reducer
  const { value } = q[progress]

  return {
    nextButton: () => ({
      handleChange: (setDirection, valid) => {
        setDirection("forward")
        if (valid) {
          set("ui_reducer", { progress: progress + 1 })
        }
      },
      valid: validateNext(value, q[progress]),
      state,
    }),
    exitButton: () => ({
      handleChange: () => {
        set("ui_reducer", { selectedI: "", newStream: false })
      },
    }),
    backButton: () => ({
      handleChange: () => {
        set("ui_reducer", { progress: progress > 0 ? progress - 1 : 1 })
      },
    }),
  }
}
