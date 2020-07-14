export const incomeData = {
  streamType: "income",
  q1: {
    question: "Where does this income come from?",
    explanation: 'Examples could be if you work as an Engineer, you could say "Engineering". Or name if after the employer that pays you, like "Wal Mart".',
    label: "Source of Income",
    textBoxPlaceHolder: "Income Name",
  },
  q2: {
    question: "What kind of income is it?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
    optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
  },
  q3: {
    question: "What kind of income is it?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
    optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
  },
  qFinal: {
    question: "Would you like to add another income source?",
    explanation: "The more income streams you add the better an idea you'll get of your finanical position. Streams could be rental income, different jobs or pensions.",
  },
  slidersInput: {
    question: "Tell us about this income",
    topLabelPast: "I earned",
    topLabelFuture: "I hope to earn",
    bottomLabel: "before tax per year",
  },
}

export const savingsData = {
  streamType: "savings",
  q1: {
    question: "What should we call this account?",
    explanation: "Just an approximation of the current value is helpful. ",
    label: "Source of Income",
    textBoxPlaceHolder: "Income Name",
  },
  q2: {
    question: "What kind of account is it?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
    optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
  },
  qFinal: {
    question: "Would you like to add another savings account?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
  },
  slidersInput: {
    explanation: "We want to know what you estimate your future contributions to be so we can calculate your future value. Ignore your past contributions as they are accounted for in the current value",
    topLabelPast: "",
    topLabelFuture: "I aim to contribute",
    bottomLabel: "Per Year",
  },
}

export const propertyData = {
  streamType: "property",
  q1: {
    question: "What should we call this property?",
    explanation: "The name will show up in our charts",
    label: "Property Name",
  },
  q2: {
    question: "What kind of property is it?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
    optionArray: ["Primary Residence", "Vacation Property", "Rental Property", "Business", "Other"],
  },
  q3: {
    question: "Who's name is it under?",
    explanation: "We'll use this information in the tax section.",
  },
  qFinal: {
    question: "Would you like to add another property?",
    explanation: "Determining your pension income depends on the type of income you were earning and if you were contributing to Canada Pension Plan.",
    optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
  },
  slidersInput: {
    question: "How much is it worth?",
    explanation: "We'll use this information in the tax section.",
    topLabelPast: "banana",
    topLabelFuture: "banana",
    bottomLabel: "banana",
  },
}

export const debtData = {
  streamType: "debt",
  q1: {
    question: "What should we call this debt?",
    explanation: 'Examples could be Primary Residence, home, rental property or the address".',
    label: "Debt Name",
  },
  q2: {
    question: "What kind of unsecured debt is it?",
    explanation: "The type of property can have different tax consequences.",
    optionArray: ["Credit Card", "Student Loan", "Line of Credit", "Business loan", "Other"],
  },
  q3: {
    question: "Who's name is it under?",
    explanation: "We'll use this information in the tax section.",
  },
  qFinal: {
    question: "Would you like to add any other debts?",
    explanation: "this will be accounted for in your net worth calculation",
    optionArray: ["Regular Employment", "Business Income", "Investment Income", "Rental Income"],
  },
  slidersInput: {
    topLabelPast: "banana",
    topLabelFuture: "banana",
    bottomLabel: "banana",
  },
}
