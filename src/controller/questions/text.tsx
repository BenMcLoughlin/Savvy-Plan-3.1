import _ from "lodash"
import { clean } from "controller/questions/helpers"
import { round } from "model/services/ui_functions"
import * as I from "model/types"

const dummyStream = {
  id: "dummy",
  streamType: "dummy",
  reg: "dummy",
}


export const addText = (textKey:string, state: I.state, user: I.user, n?: number, set?: I.set): I.objects => {
  const { selectedId,} = state.ui_reducer
  const stream = state.main_reducer[selectedId] || dummyStream
  const isUser1 = user === "user1"
  const { hasChildren, isMarried } = state.user_reducer["user1"]
  const {  reg } = stream || dummyStream
  const { firstName } = state.user_reducer["user1"]
  const {  user2, desiredRetirementIncome } = state.user_reducer

  const data = {
    birthYear: {
      explanation: "This forms the basis of our financial calculations.",
      label: "Birth Year",
      placeholder: "YYYY",
      question: isUser1 ? "What's your birth year?" : "What's your spouse's birth year?",
    },
    combinedIncomeChart: {
      explanation: "This forms the basis of our financial calculations.",
      subTitle:
        "Our goal is to see what your government benefits in retirement looks like. If you're earning too much you can have these 'clawed back' through high taxes. By estimating your pension now we build a savings plan that saves you the most in taxes when you retire.",
      question: "This shows your income combined",
    },
    createIncome: {
      explanation: "",
      subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
      question: `We need details about ${isMarried ? firstName + "'s" : "your"} income`,
      label: "lets go",
    },
    createSavings: {
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
      question: isMarried ? `Does ${_.startCase(firstName)} have investments?` : "Do you have investments?",
    },
    desiredRetirementIncome: {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `$${round(desiredRetirementIncome / 12).toLocaleString()} a month`,
      subTitle: "With this as a target we can determine the most tax efficient way to draw that income in retirement. Then build your savings plan.",
      topLabel: "I'd love to earn ",
      question: `How much ${isMarried ? "combined" : null} after tax income would you like to target in retirement?`,
      explanation: "Knowing this we can build reccomendations on how you should be saving now",
    },
    idealIncomeChart: {
      question: n === 1 ? "This shows your ideal income breakdown for when you retire." : "This is what we've calulcated",
      subTitle:
        n === 1
          ? "In a perfect world you would earn taxable income in the lowest tax bracket, around 40k. Then anything above that would come from your Tax Free Savings. With this plan you would keep all your government benefits and still be able to take advantage of tax savings by contributing to your RRSP now. "
          : "If you draw $12k from your RRSPs you'll still be in the lowest tax bracket in retirement. Then since you want 52k the remaining $12k could come from your TFSA",
    },
    gender: {
      component: "PickSingleOption", //this component allows the user to choose one of a number of options
      optionArray: ["male", "female", "prefer not to say", "write below"],
      explanation: "We want to ensure our planning process is inclusive.",
      question: isUser1 ? "What's your gender?" : "What's your sspouse's gender?",
    },
    incomeParagraph: {
      question: "Heres the deal...",
      text:
        "Given the income you entered we estimate your Canada Pension Plan payment, in todays dollars, to be around $14k per year if you take it at 65 along with $7k in Old Age Pension. The lowest income tax bracket is $42 k, so our strategy is to figure out how much you need to invest in your RRSP’s to be drawing income that will keep you in the lowest bracket in retirement. ",
    },
    name: {
      explanation: "This helps us personalize your plan.",
      label: "First Name",
      question: isUser1 ? "What's your first name?" : "What's your spouse's first name?",
    },
    numberOfChildren: {
      explanation: hasChildren
        ? "We'd like to estimate your government child benefits."
        : "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
      question: "How many children?",
    },
    idealIncome: {
      question: "banana",
      explanation: "banana",
      num: 3,
      slider1: {
        bottomLabel: `at age 12`, //eg "at age 26"
        max: 2080,
        min: 18, //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: state.user_reducer["idealIncome"],
        handleChange: (value: number) => {
          set("idealIncome", "user_reducer", value)
        },
      },
      slider2: {
        bottomLabel: `at age 12`,
        max: 250000,
        min: 0,
        step: 1000,
        topLabel: `at age 12`,
        value: 0,
        handleChange: (value: number) => set("idealIncome", "user_reducer", value),
      },
    },
    incomeAmount: {
      question:
        isUser1 && n === 0
          ? "We're going to build a chart that shows your income for each year of your life."
          : isUser1 && n === 1
          ? "The more income streams you add the more accurate our estimates can be."
          : n === 2
          ? "Give us an estimate of this income stream"
          : n === 0
          ? `Adding ${user2["firstName"]}'s income helps us identify areas where you might be able to save on taxes.`
          : "banana",
      explanation:
        isUser1 && n === 0 && hasChildren
          ? "See how you already have income? We Calculated your Canada Child Benefit, before deductions, as well as estimated your old age securty. Its all in todays dollars. "
          : isUser1 && n === 0
          ? "See how you already have income? We estimated your old age security. Its all in todays dollars. "
          : isUser1 && n === 1
          ? "The more income streams you add the more accurate our estimates can be."
          : n === 2
          ? "Add this income to the chart"
          : "banana",
      topLabelPast: "I earned",
      topLabelFuture: "I hope to earn",
      bottomLabel: "before tax per year",
      explainer: "If you think your income might change you can add different earning periods, ignore inflation.",
      subTitle:
        isUser1 && n === 0
          ? `Give us an estimate of your ${stream.name} income. The "until" option is essentially when you'd like to retire. You can see how your Canada Pension Plan is calculated based on your earnings.`
          : `Give us an estimate of your ${stream.name} income`,
    },
    incomeName: {
      explanation: 'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
      label: "Source of Income",
      placeholder: "Income Name",
      question: isUser1 && n === 0 ? "We'll start by adding your most prominant source of income. Where does it come from?" : "Where does this income come from?",
    },
    incomeRegistration: {
      explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
      optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
      question: "What kind of income is it?",
    },
    savingsCurrentValue: {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg.toUpperCase()}`,
      topLabel: "I have around ",
      question: `How much do you currently have in your ${clean(reg)}?`,
      explanation: "We'll calculate its future value so we can determine your retirement income.",
    },
    savingsContributions: {
      question: `This chart shows your ${clean(reg)} as it grows with contributions and without making any withdrawals. `,
      subTitle: `How much do you plan to contribute each year to your ${reg}?`,
      explanation:
        n === 0 ? "Our goal is to estimate how much you could withdraw in retirement. Knowing that helps us make decisions like when to retire or how much to save. " : "BANANANAN",
      topLabelPast: "I contributed",
      topLabelFuture: "I plan to contribute",
      bottomLabel: "per year",
    },
    savingsRates: {
      question: `This chart shows how your ${reg} grows as you save and then shrinks as you draw income in retirement.`,
      subTitle: `How much do you plan to contribute each year to your ${reg}?`,
      explanation:
        n === 0 ? "Our goal is to estimate how much you could withdraw in retirement. Knowing that helps us make decisions like when to retire or how much to save. " : "BANANANAN",
      topLabelPast: "I think I'll earn",
      topLabelFuture: "I plan to contribute",
      bottomLabel: "per year",
    },
    savingsWithdrawals: {
      question: "Now we add withdrawals, we'll add these withdrawals to your income. ",
      explanation: "Knowing your future income helps us determine your pension income",
      topLabelPast: "I earned",
      topLabelFuture: "I'd like to withdraw",
      bottomLabel: "before tax per year",
    },
    haveChildren: {
      explanation: "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
      optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
      question: "Do you have children?",
    },
    isMarried: {
      explanation: "Having a spouse has a large impact on your plan",
      optionArray: ["single", "married", "common-law"],
      question: "Are you married?",
    },
    addAnotherIncome: {
      explanation: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
      option1: "yes",
      option2: "no",
      question: "Would you like to add another income source?",
    },
  }

  return data[textKey]
}
