import { createStream } from "model/services/create_functions"
import { removeMostRecentStream } from "controller/questions/helpers"
import { validateNext } from "model/services/validation/validators"
import { createTripleSliders } from "controller/questions/tripleSelector.creator"
import * as I from "model/types"
import { addText } from "controller/questions/text"
import { dummyStream } from "data"

export const onboardQuestions = (q: I.a, remove: I.remove, set: I.set, state: I.state, user: I.user): I.objects => {
  const { stream_reducer, ui_reducer } = state
  const { selectedId, dualSelectValue } = state.ui_reducer
  const stream: I.stream = state.stream_reducer[selectedId] || dummyStream
  const selectedUser = state.user_reducer[user]
  const { id, streamType, reg } = stream
  const { maritalStatus, numberOfChildren } = state.user_reducer

  return {
    for: {
      birthYear: () =>
        q.push({
          ...{
            component: "TextInput", //Text input will capture their birthyear
            value: selectedUser.birthYear,
            name: "year", //by setting it as streamType year the component will place valiation on the text
            handleChange: (event: I.event) => set(user, "user_reducer", event.target.value, "birthYear"),
          },
          ...addText("birthYear", state, user),
        }),
      retIncome: () =>
        q.push({
          ...{
            component: "Slider",
            max: 300000,
            min: 0,
            step: 1000,
            selectedFocus: true,
            value: state.user_reducer.retIncome,
            handleChange: value => {
              set("retIncome", "user_reducer", value)
            },
          },
          ...addText("retIncome", state, user),
        }),
      gender: () =>
        q.push({
          ...{
            component: "PickSingleOption", //this component allows the user to choose one of a number of options
            value: selectedUser.gender,
            handleChange: (value: string) => set(user, "user_reducer", value, "gender"),
          },
          ...addText("gender", state, user),
        }),
      name: () =>
        q.push({
          ...{
            placeholder: "Name",
            component: "TextInput", // tells the wizard to render a text input in which the user types their name
            streamType: "text",
            value: selectedUser.firstName,
            handleChange: (event: I.event) => set(user, "user_reducer", event.target.value, "firstName"),
          },
          ...addText("name", state, user),
        }),
      numberOfChildren: () =>
        q.push({
          ...{
            component: "PickNumberWithText",
            value: numberOfChildren,
            value2: numberOfChildren,
            childValue: numberOfChildren,
            valid: numberOfChildren > 0,
            handleChange: (n: any) => set("numberOfChildren", "user_reducer", n),
            handleChange2: (event: I.event) => set(event.target.name, "user_reducer", event.target.value),
          },
          ...addText("numberOfChildren", state, user),
        }),
      income: {
        amount: n => {
          const data = {
            ...{
              chart: "IncomeChart",
              max: 250000,
            },
            ...addText("incomeAmount", state, user, n),
          }
          q.push(createTripleSliders("in", data, set, "periodIn", state, stream))
        },
        name: i =>
          q.push({
            ...{
              component: "TextInput",
              value: stream.name,
              handleChange: (event: I.event) => set(id, "stream_reducer", event.target.value, "name"),
            },
            ...addText("incomeName", state, user, i),
          }),
        registration: () =>
          q.push({
            ...{
              component: "PickSingleOption",
              value: reg,
              handleChange: (value: string) => set(id, "stream_reducer", value, "reg"),
            },
            ...addText("incomeRegistration", state, user),
          }),
      },
      savings: {
        currentValue: () =>
          q.push({
            ...{
              component: "Slider",
              max: 300000,
              min: 0,
              step: 1000,
              selectedFocus: true,
              value: stream.currentValue,
              handleChange: (value: string) => {
                set("dualSelectValue", "ui_reducer", true)
                set("selectedAccount", "ui_reducer", stream.reg)
                set(id, "stream_reducer", value, "currentValue")
              },
            },
            ...addText("savingsCurrentValue", state, user),
          }),
        contributions: n => {
          const data = {
            ...{
              chart: "SavingsChart",
              max: reg === "tfsa" ? 6000 : reg === "rrsp" ? 30000 : 100000,
              setOptimumValues: () => set("optimumTFSA", "user_reducer", 3000),
            },
            ...addText("savingsContributions", state, user, n),
          }
          q.push(createTripleSliders("out", data, set, "periodOut", state, stream))
        },
        rates: n => {
          const data = {
            ...{
              chart: "SavingsChart",
              max: reg === "tfsa" ? 6000 : reg === "rrsp" ? 30000 : 100000,
            },
            ...addText("savingsRates", state, user, n),
          }
          q.push(createTripleSliders("out", data, set, "periodOut", state, stream))
        },
        withdrawals: n => {
          const data = {
            ...{
              chart: "SavingsChart",
              type: "withdrawals",
              max: 100000,
            },
            ...addText("savingsWithdrawals", state, user, n),
          }
          q.push(createTripleSliders("in", data, set, "periodIn", state, stream))
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
              set("hasChildrenStatus", "user_reducer", value)
              if (value === "yes" || value === "hope to eventually") {
                set("hasChildren", "user_reducer", true)
              } else {
                set("hasChildren", "user_reducer", false)
              }
            },
          },
          ...addText("haveChildren", state, user),
        }),
      isMarried: () =>
        q.push({
          ...{
            component: "PickSingleOption",
            value: maritalStatus,
            handleChange: (value: string) => {
              set("maritalStatus", "user_reducer", value)
              if (value === "married" || value === "common-law") {
                set("isMarried", "user_reducer", true)
              } else {
                set("isMarried", "user_reducer", false)
              }
            },
          },
          ...addText("isMarried", state, user),
        }),
      addAnother: {
        income: () =>
          q.push({
            ...{
              component: "DualSelect",
              value: ui_reducer.dualSelectValue,
              handleChange: () => {
                set("dualSelectValue", "ui_reducer", true)
                set("selectedUser", "ui_reducer", user)
                createStream(streamType, "in", user, "employment", set, state)
              },
              handleChange2: (option, clickFired: boolean) => {
                set("dualSelectValue", "ui_reducer", false)
                if (clickFired) {
                  removeMostRecentStream(state, user, remove, set, streamType)
                }
              },
            },
            ...addText("addAnotherIncome", state, user),
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
                createStream("income", "in", user, "employment", set, state)
                set("selectedUser", "ui_reducer", user)
                set("progress", "ui_reducer", ui_reducer.progress + 1)
              },
            },

            ...addText("createIncome", state, user),
          }),
        savings: () =>
          q.push({
            ...{
              arrayOfSelected: Object.values(stream_reducer).filter((d: any) => d.id.includes(`user1Savings`)),
              component: "PickMultipleOptions",
              user: "user1",
              value: dualSelectValue,
              nextHandleChange: () => {
                set("selectedUser", "ui_reducer", "user1")
              },
              handleChange: (selected, d: any) => {
                if (!selected && d.label !== "none") {
                  // check if the item doesnt already exist, or its not none, and will then create a new income st
                  createStream("savings", "out", user, d.reg.toLowerCase(), set, state)
                } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
                if (selected) {
                  //the user needs to be able to remove the new object if they click on it again enabling them to remove the account they added.
                  removeMostRecentStream(state, user, remove, set, streamType)
                }
                if (d.label === "none") {
                  //the user needs to be able to remove the new object if they click on it again enabling them to remove all accounts added
                  const selectedInstances: any = Object.values(stream_reducer).filter((b: any) => b.id.includes("user1Savings")) //searches the main reducer to find the matching object to be removed
                  selectedInstances.map((instance: any) => remove(instance.id))
                  set("selectedId", "ui_reducer", "")
                }
              },
              //onClick: reg => createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user1"),
            },
            ...addText("createSavings", state, user),
          }),
      },
    },
  }
}

export const showUsers = (q: I.a, set: I.set, state: I.state): I.objects => {
  const { selectedUser } = state.ui_reducer
  const { firstName: user1Name } = state.user_reducer.user1
  const { firstName: user2Name } = state.user_reducer.user2

  return {
    introduction: () =>
      q.push({
        ...{
          chart: "SavingsChart",
          useExampleState: true,
        },
        ...addText("introduction", state, "user1"),
      }),
    whatWeWillBuild: () =>
      q.push({
        ...{


        },
        ...addText("whatWeWillBuild", state, "user1"),
      }),
    idealIncomeChart: () =>
      q.push({
        ...{
          chart: "IncomeChart",
          show: "targetIncome",
          component: "TripleSelector",
          enableNav: true,
          value: selectedUser,
          user1Name,
          user2Name,
          handleChange: d => set("selectedUser", "ui_reducer", d),
        },
        ...addText("idealIncomeChart", state, "user1"),
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
          handleChange: d => set("selectedUser", "ui_reducer", d),
        },
        ...addText("combinedIncomeChart", state, "user1"),
      }),
    incomeParagraph: () =>
      q.push({
        ...{
          chart: "IncomeChart",
          component: "Paragraph",
          enableNav: true,
        },
        ...addText("incomeParagraph", state, "user1"),
      }),
  }
}

export const buttons = (q: I.a, set: I.set, state: I.state): any => {
  const { progress } = state.ui_reducer
  const { value } = q[progress]

  return {
    nextButton: () => ({
      handleChange: (setDirection, valid) => {
        setDirection("forward")
        if (valid) {
          set("progress", "ui_reducer", progress + 1)
        }
      },
      valid: validateNext(value, q[progress]),
      state,
    }),
    exitButton: () => ({
      handleChange: () => {
        set("selectedId", "ui_reducer", "")
        set("newStream", "ui_reducer", false)
      },
    }),
    backButton: () => ({
      handleChange: () => {
        set("progress", "ui_reducer", progress > 0 ? progress - 1 : 1)
      },
    }),
  }
}
