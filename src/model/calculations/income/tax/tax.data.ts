// Data Obtained from https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032bc/t4032bc-january-general-information.html
// QUEBEC IS WRONG, Couldnt find rates

export const cra = {
  ympe: 58700, //maximum pensionable Earnings - updated 11 March 2020
  cppRate: 0.0525,
  cppMaxPremium: 2898,
  ymie: 54200, //years maximum insurable earnings,
  eiRate: 0.0158,
  eiMaxPremium: 856.36,
  oasPayment: 7362.45,
  oasThres: 79054,
  oasTop: 128137,
  ageAmount: 7494,
}

export const FTR = {
  // Federal Tax Rates and Factors - updated 11 March 2020
  1: {
    bot: 0,
    top: 48535,
    rate: 0.15,
    constant: 0,
  },
  2: {
    bot: 48535.01,
    top: 97069,
    rate: 0.205,
    constant: 2669,
  },
  3: {
    bot: 97069,
    top: 150473,
    rate: 0.26,
    constant: 8008,
  },
  4: {
    bot: 150473,
    top: 214368,
    rate: 0.29,
    constant: 12522,
  },
  5: {
    bot: 214368,
    top: 10000000000,
    rate: 0.33,
    constant: 21097,
  },
}

export const PTR = {
  // Provincial Tax Rates and factors - updated 11 March 2020
  1: {
    bot: 0,
    top: 41725,
    rate: 0.0506,
    constant: 0,
  },
  2: {
    bot: 41725,
    top: 83451,
    rate: 0.077,
    constant: 1102,
  },
  3: {
    bot: 83451,
    top: 95812,
    rate: 0.105,
    constant: 3438,
  },
  4: {
    bot: 95812,
    top: 116344,
    rate: 0.1229,
    constant: 5153,
  },
  5: {
    bot: 116344,
    top: 157748,
    rate: 0.147,
    constant: 7957,
  },
  6: {
    bot: 157748,
    top: 100000000,
    rate: 0.168,
    constant: 11270,
  },
}

export const taxes = {
  federal: {
    1: {
      bot: 0,
      top: 48535,
      rate: 0.15,
      constant: 0,
    },
    2: {
      bot: 48535.01,
      top: 97069,
      rate: 0.205,
      constant: 2669,
    },
    3: {
      bot: 97069,
      top: 150473,
      rate: 0.26,
      constant: 8008,
    },
    4: {
      bot: 150473,
      top: 214368,
      rate: 0.29,
      constant: 12522,
    },
    5: {
      bot: 214368,
      top: 10000000000,
      rate: 0.33,
      constant: 21097,
    },
  },
  britishColumbia: {
    1: {
      bot: 0,
      top: 41725,
      rate: 0.0506,
      constant: 0,
    },
    2: {
      bot: 41725,
      top: 83451,
      rate: 0.077,
      constant: 1102,
    },
    3: {
      bot: 83451,
      top: 95812,
      rate: 0.105,
      constant: 3438,
    },
    4: {
      bot: 95812,
      top: 116344,
      rate: 0.1229,
      constant: 5153,
    },
    5: {
      bot: 116344,
      top: 157748,
      rate: 0.147,
      constant: 7957,
    },
    6: {
      bot: 157748,
      top: 100000000,
      rate: 0.168,
      constant: 11270,
    },
  }
}

export const craValues = {
  federal: {
    basicPersonal: 12298,
  },
  britishColumbia: {
    basicPersonal: 10949,
  },
  cppcontributes: 2898,
  eiPremiums: 856.36,
  employmentAmount: 1245,
}
