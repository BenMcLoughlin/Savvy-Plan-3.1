import { createStreamV2, addPeriodToStreamV2 } from "model/services/create_functions"
import { removeMostRecentStream } from "controller/questions/helpers"
import {validator} from "model/services/validation/validator"
import { createTripleSliders } from "controller/questions/tripleSelector.creator"
import _ from "lodash"
import * as I from "model/types"

const dummyStream = {
  id: "dummy",
  streamType: "dummy",
  reg: "dummy",
}

export const onboardQuestions = (q, remove, set, state, user) => {
  const { selectedId, dualSelectValue } = state.ui_reducer
  const { main_reducer, ui_reducer } = state
  const stream = state.main_reducer[selectedId] || dummyStream
  const isUser1 = user === "user1"
  const selectedUser = state.user_reducer[user]
  const { id, streamType, reg } = stream || dummyStream
  const { maritalStatus, numberOfChildren } = state.user_reducer
  const { hasChildren, isMarried,} = state.user_reducer.user1
  const {firstName } = state.user_reducer[user]

  return {
    for: {
      birthYear: () =>
        q.push({
          component: "TextInput", //Text input will capture their birthyear
          explanation: "This forms the basis of our financial calculations.",
          label: "Birth Year",
          placeholder: "YYYY",
          question: isUser1 ? "What's your birth year?" : "What's your spouse's birth year?",
          value: selectedUser.birthYear,
          type: "year", //by setting it as streamType year the component will place valiation on the text
          handleChange: (value: string) => set(user, "user_reducer", value, "birthYear"),
        }),
      gender: () =>
        q.push({
          component: "PickSingleOption", //this component allows the user to choose one of a number of options
          optionArray: ["male", "female", "prefer not to say", "write below"],
          explanation: "We want to ensure our planning process is inclusive.",
          question: isUser1 ? "What's your gender?" : "What's your sspouse's gender?",
          value: selectedUser.gender,
          handleChange: (value: string) => set(user, "user_reducer", value, "gender"),
        }),
      name: () =>
        q.push({
          explanation: "This helps us personalize your plan.",
          label: "First Name",
          question: isUser1 ? "What's your first name?" : "What's your spouse's first name?",
          placeholder: "Name",
          component: "TextInput", // tells the wizard to render a text input in which the user types their name
          streamType: "text",
          value: selectedUser.firstName,
          handleChange: value => set(user, "user_reducer", value, "firstName"),
        }),
      numberOfChildren: () =>
        q.push({
          data: "numberOfChildren",
          explanation:
            hasChildren
              ? "We'd like to estimate your government child benefits."
              : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
          component: "PickNumberWithText",
          value: numberOfChildren,
          childValue: numberOfChildren,
          valid: numberOfChildren > 0,
          handleChange: (n: any) => set("numberOfChildren", "user_reducer", n),
          handleChange2: (value: string, childId1: string) => set(`${childId1}`, "user_reducer", value),
        }),
      income: {
        amount: () => {
          const text = {
            question: "We need estimates of the past, present and future of this income source.",
            showChart: true, 
            chart: "IncomeChart", 
            explanation: "Knowing your future income helps us determine your pension income",
            topLabelPast: "I earned",
            topLabelFuture: "I hope to earn",
            bottomLabel: "before tax per year",
            explainer: "Would you like to account for changes annual earnings?  Add a new time period with a different value, ignore inflation."
          }
          q.push(createTripleSliders("in", text, set, state, stream))
        },
        name: () =>
          q.push({
            component: "TextInput",
            explanation: 'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
            label: "Source of Income",
            placeholder: "Income Name",
            question: "Where does this income come from?",
            value: stream.name,
            handleChange: (value: string) => set(id, "main_reducer", value, "name"),
          }),
        registration: () =>
          q.push({
            component: "PickSingleOption",
            explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
            optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
            question: "What kind of income is it?",
            textInput: true,
            value: reg,
            handleChange: (value: string) => set(id, "main_reducer", value, "reg"),
          }),
      },
      savings: {
        currentValue: () =>
          q.push({
            //SAVINGS QUESTION 1 - Input current value of account
            ask: "Just an approximation of the current value is helpful. ",
            bottomLabel: `in my ${reg.toUpperCase()}`,
            component: "Slider",
            max: 300000,
            min: 0,
            step: 1000,
            topLabel: "I have around ",
            title: `How much do you currently have in your ${reg.toUpperCase()}?`,
            selectedFocus: true,
            value: stream.currentValue,
            handleChange: (value: string) => {
              set("dualSelectValue", "ui_reducer", true)
              set("selectedAccount", "ui_reducer", stream.reg)
              set(id, "main_reducer", value, "currentValue")
            },
          }),
        contributions: () => {
          const text = {
            question: `How much do you plan to contribute each year to your ${reg}`,
            explanation: "We'll do some math and estimate the future value",
            topLabelPast: "I earned",
            topLabelFuture: "I plan to contribute",
            bottomLabel: "per year",
          }
          q.push(createTripleSliders("in", text, set, state, stream))
        },
        withdrawals: () => {
          const text = {
            question: "At age 65 you could safely retire $12k per year given your contributions till age 95, but you can change the withdrawals yourself if you like",
            explanation: "Knowing your future income helps us determine your pension income",
            topLabelPast: "I earned",
            topLabelFuture: "I'd like to withdraw",
            bottomLabel: "before tax per year",
            type: "withdrawals"
          }
          q.push(createTripleSliders("out", text, set, state, stream))
        },
      },
    },
    if: {
      theyHaveChildren: () =>
        q.push({
          component: "PickSingleOption",
          explanation:
            "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
          optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
          question: "Do you have children?",
          value: state.user_reducer.childrenStatus,
          handleChange: (value: string) => {
            set("childrenStatus", "user_reducer", value)
            if (value === "yes" || value === "hope to eventually") {
              set("user1", "user_reducer", true, "hasChildren")
            } else {
              set("user1", "user_reducer", false, "hasChildren")
            }
          },
        }),
      isMarried: () =>
        q.push({
          component: "PickSingleOption",
          explanation: "Having a spouse has a large impact on your plan",
          optionArray: ["single", "married", "common-law"],
          question: "Are you married?",
          value: maritalStatus,
          handleChange: (value: string) => {
            set("maritalStatus", "user_reducer", value)
            if (value === "married" || value === "common-law") {
              set("user1", "user_reducer", true, "isMarried")
            } else {
              set("user1", "user_reducer", false, "isMarried")
            }
          },
        }),
      addAnother: {
        income: () =>
          q.push({
            component: "DualSelect",
            explanation: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
            option1: "yes",
            option2: "no",
            value: ui_reducer.dualSelectValue,
            question: "Would you like to add another income source?",
            handleChange: () => {
              set("dualSelectValue", "ui_reducer", true)
              createStreamV2(streamType, "in", user, "taxable", set, state)
            },
            handleChange2: (option, clickFired: boolean) => {
              set("dualSelectValue", "ui_reducer", false)
              if (clickFired) {
                removeMostRecentStream(state, user, remove, set, streamType)
              }
            },
          }),
      },
    },
    to: {
      create: {
        income: () =>
          q.push({
            explanation: "",
            subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
            question: `We need details about ${firstName}'s income` ,
            label: "lets go",
            component: "Button",
            valid: true,
            handleChange: () => {
              createStreamV2('income', "in", user, "taxable", set, state)
              set("progress", "ui_reducer", ui_reducer.progress + 1)
            },
          }),
        savings: () =>
          q.push({
            optionArray: [
              {
                label: "tax free savings account",
                reg: "TFSA",
                info:
                  "The TFSa enables you to  avoid taxes on the gains you make. If you invest $100 right now and it becomes $1000 by the time you retire, that $900 you'll have earned is tax-free. You can also take money out any time you want. There is no penalty to withdraw - and if you do, the amount is added to how much you can contribute the following year.",
              },
              {
                label: "registered retirement savings",
                reg: "RRSP",
                info:
                  "A popular retirement account designed to help Canadians save for retirement. The money you contribute to your RRSP is “pre-tax.” That means that you can subtract the amount you contribute from your income and pay less in income taxes. If you made $60,000 and you contributed $5,000 to your RRSP, you will pay tax on only $55,000 of income.",
              },
              {
                label: "personal",
                reg: "Personal",
                info:
                  "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
              },
              {
                label: "Locked in Retirement Account",
                reg: "LIRA",
                info:
                  "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
              },
              {
                label: "Pension",
                reg: "Pension",
                info:
                  "Personal accounts are investment accounts that are taxable. They don't have government benefits like tax savings or deferrals, but there are no restrictions on when and how you can withdraw money",
              },
              {
                label: "RESP",
                reg: "RESP",
                info:
                  "A popular savings account for parents or family members to save money for their children's education. With an RESP, the government will match your contributes and anything you earn through investing is earned tax-free. As always, there are rules and limitations.",
              },
              { label: "none", reg: "none" },
            ],
            arrayOfSelected: Object.values(main_reducer).filter((d: any) => d.id.includes(`user1Savings`)),
            component: "PickMultipleOptions",
            user: "user1",
            value: dualSelectValue,
            question: isMarried ? `Does ${_.startCase(firstName)} have investments?` : "Do you have investments?",
            nextHandleChange: () => {
              set("selectedUser", "ui_reducer", "user1")
            },
            handleChange: (selected, d: any) => {
              if (!selected && d.label !== "none") {
                // check if the item doesnt already exist, or its not none, and will then create a new income st
                createStreamV2("savings", "out", user, d.reg.toLowerCase(), set, state)
              } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
              if (selected) {
                //the user needs to be able to remove the new object if they click on it again enabling them to remove the account they added.
                removeMostRecentStream(state, user, remove, set, streamType)
              }
              if (d.label === "none") {
                //the user needs to be able to remove the new object if they click on it again enabling them to remove all accounts added
                const selectedInstances: any = Object.values(main_reducer).filter((b: any) => b.id.includes("user1Savings")) //searches the main reducer to find the matching object to be removed
                selectedInstances.map((instance: I.instance) => remove(instance.id))
                set("selectedId", "ui_reducer", "")
              }
            },
            //onClick: reg => createStream(colorIndex, newSavingsStream(reg, +user1BirthYear + 65), set, `savings`, "user1"),
          }),
      },
    },
  }
}
 
export const showUsers = (q, set, state) => {
 

  return {
    introduction: () => q.push({
      subTitle: "Our goal is to answer one question for you, are you ok finanically?  ",
      question: "Lets build you a financial Plan",
      label: "continue",
      component: "null",
      handleChange: () => set("progress", "ui_reducer", 1),
    }),
  }
}
 
export const buttons = (q, set, state) => {
 
  const {progress} = state.ui_reducer
  const value =  q[progress].value

  return {
    nextButton: () => ({
      handleChange: (setDirection, valid) => {
        setDirection("forward")
        if (valid) {
          set("progress", "ui_reducer", progress + 1)
        }
      },
      valid: validator(value, q[progress] ),
      state,
    }),
    exitButton:  () => ({
        handleChange: () => {
          set("selectedId", "ui_reducer", "")
          set("newStream", "ui_reducer", false)
        },
      }),
      backButton: () => ({
        handleChange: () => set("progress", "ui_reducer", progress > 0 ? progress - 1 : 1),
      }),
    }
  }

