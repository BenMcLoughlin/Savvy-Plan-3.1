export const createSavingsArray = (instance: any, set: any, state: any) => {
  const { periods, id, reg } = instance
  
  const { user1BirthYear } = state.user_reducer

  const array: any = [
    {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg}`,
      childId: "currentValue",
      component: "Slider",
      id,
      max: 400000,
      min: 0,
      step: 1000,
      topLabel: "I have around ",
      reducer: "main_reducer",
      title: `How much do you currently have in your ${reg}?`,
    },
    {
      ask: "If you're making regular contributions we'll factor that into the plan",
      chart: "SavingsChart",
      component: "DualSelect",
      id: "selectedUser",
      option1: "yes",
      option2: "no",
      reducer: "ui_reducer",
      title: "Do you make regular contributions?",
      onClick: function () {
        set(id, "main_reducer", periods + 1, "contributionPeriods")
      },
    },
  ]
  if (instance.contributionPeriods > 0) {
    // if the user indicated they do contribute, it will increase periods by 1
    array.push({
      ask: "Just an approximation of the current value is helpful. ",
      chart: "SavingsChart",
      bottomLabel: "per year",
      childId: "contribution0",
      component: "Slider",
      id,
      max: reg === "TFSA" ? 6000 : reg === "RRSP" ? 30000 : 100000,
      min: 0,
      step: 100,
      topLabel: "I contribute around ",
      reducer: "main_reducer",
      title: `How much do you contribute to your ${reg} per year?`,
    })
    array.push({
      ask: "Most people aim to contribute the same amount till they retire. ",
      bottomLabel: `at age ${instance.yearLast - user1BirthYear}`,
      chart: "SavingsChart",
      childId: "yearLast",
      component: "Slider",
      id,
      max: 2080,
      min: `${+user1BirthYear + 18}`,
      step: 1,
      topLabel: "I'd like to contribute until",
      reducer: "main_reducer",
      title: "How long do your intend to contribute for?",
      type: "year",
    })
  }

  return array
}
