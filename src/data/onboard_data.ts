export const onboard_data = {
  intro: {
    subTitle: "In order to build your plan we'll need some details about your situation.",
    question: "Lets build you a financial Plan",
    label: "continue",
  },
  user1Name: {
    label: "First Name",
    question: "What's your first Name?",
    placeholder: "Name",
  },
  user1BirthYear: {
    explanation: "This forms the basis of our financial calculations.",
    component: "TextInput",
    label: "Birth Year",
    question: "What's your Birth Year?",
    placeholder: "YYYY",
  },
  user1BirthGender: {
    optionArray: ["male", "female", "prefer not to say", "write below"],
    explanation: "We want to ensure our planning process is inclusive.",
    component: "PickSingleOption",
    question: "What's your Gender?",
  },
  maritalStatus: {
    optionArray: ["single", "married", "common-law", "write below"],
    explanation: "Having a spouse has a large impact on your plan",
    component: "PickSingleOption",
    question: "What's your marital status?",
  },
  user2Name: {
    label: "Spouse's First Name",
    question: "What's your spouse's first Name?",
    placeholder: "Name",
  },
  user2BirthYear: {
    explanation: "This forms the basis of our financial calculations.",
    component: "TextInput",
    label: "Spouse's Birth Year",
    question: "What's your spouse's birth Year?",
    placeholder: "YYYY",
  },
  children: {
    optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
    explanation: "We'd like to estimate your government child benefits. Even if you only plan on having children its helpful to know so we can show you how it will impact your finances.",
    component: "PickSingleOption",
    question: "Do you have children?",
    textInput: false,
  },
  numberOfChildren: {
    optionArray: ["yes", "no", "hope to eventually", "yes, and they are over 18"],
    explanation1: "We'd like to estimate your government child benefits.",
    explanation2: "Just guessing is fine, it will give you an idea of the impact of government benefits on your plan. You can always change it later. ",
    question: "How many children?",
    textInput: false,
  },
  user1Income: {
    explanation:
      "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
    subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
    question: "We need some details about your income.",
    label: "lets go",
  },
  user2Income: {
    explanation:
      "We want to save you as much as possible in taxes and make sure you get those most out of your government benefits in retirement.  To do so, we need an estimate of your past, current and future earnings. This forms the foundation of our plan. ",
    subTitle: "We'll use this to build a chart showings your income streams and estimate your pension income.",
    question: "Would you like to add your spouses income?",
    label: "lets go",
  },
  user1Savings: {
    explanation: "We want to add any property you might own to your net worth chart.",
    question: "Do you have investments?",
  },
}
