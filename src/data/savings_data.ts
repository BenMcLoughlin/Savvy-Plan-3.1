import {addPeriodToSavingsStream} from "services/ui_functions"

export const createSavingsArray = (instance: any, set: any, state: any) => {
  const { contributionPeriods, id, reg } = instance
  
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
    // {
    //   ask: "If you're making regular contributions we'll factor that into the plan",
    //   chart: "SavingsChart",
    //   component: "DualSelect",
    //   id: "selectedUser",
    //   option1: "yes",
    //   option2: "no",
    //   reducer: "ui_reducer",
    //   title: "Do you make regular contributions?",
    //   onClick: function () {
    //     addPeriodToSavingsStream(instance, contributionPeriods, id, set)
    //   },
    // },
  ]
  for (let i = contributionPeriods; i >= 0; i--)   {
    array.push({
      ask: "Its hard to predict future contributions. But by doing this you can see how they will impact your financial plan",
      component: "MultiSliders",
      num: 3,
      id,
      childId: "contributionYear0",
      reducer: "main_reducer",
      title: `Lets gather some details about your ${instance.reg} contributions`,
      slider1: {
        bottomLabel: `at age ${instance[`contributionYear${i}`] - 1988}`,
        childId: " contributionYear0", // `contributionYear${i}`,
        id,
        max: 2080,
        min: 1990,
        step: 1,
        topLabel: "Starting in",
        reducer: "main_reducer",
        type: "year",
      },
      slider2: {
        bottomLabel: "annually",
        childId:"contribution0", //`contributionValue${i}`,
        id,
        max: instance.reg === "TFSA" ? 6000 : 25000,
        min: 0,
        step: 100,
        topLabel: "I could contribute",
        reducer: "main_reducer",
      },
      slider3: {
        bottomLabel: `at age ${instance[`contributionYear${i+1}`] - 1988}`,
        childId: "contributionYear1",  //`contributionYear${i+1}`,
        id,
        max: 2080,
        min: 1990, // instance[`contributionYear${i-1}`],
        step: 1,
        topLabel: "Until ",
        reducer: "main_reducer",
        type: "year",
      },
    })
    // if the user indicated they do contribute, it will increase periods by 1
    // array.push({
    //   ask: "Just an approximation of the current value is helpful. ",
    //   chart: "SavingsChart",
    //   bottomLabel: "per year",
    //   childId: "contribution0",
    //   component: "Slider",
    //   id,
    //   max: reg === "TFSA" ? 6000 : reg === "RRSP" ? 30000 : 100000,
    //   min: 0,
    //   step: 100,
    //   topLabel: "I contribute around ",
    //   reducer: "main_reducer",
    //   title: `How much do you contribute to your ${reg} per year?`,
    // })
    // array.push({
    //   ask: "Most people aim to contribute the same amount till they retire. ",
    //   bottomLabel: `at age ${instance.yearLast - user1BirthYear}`,
    //   chart: "SavingsChart",
    //   childId: "contributionYear1",
    //   component: "Slider",
    //   id,
    //   max: 2080,
    //   min: `${+user1BirthYear + 18}`,
    //   step: 1,
    //   topLabel: "I'd like to contribute until",
    //   reducer: "main_reducer",
    //   title: "How long do your intend to contribute for?",
    //   type: "year",
    // })
    // array.push({
    //   ask: "If you're making regular contributions we'll factor that into the plan",
    //   chart: "SavingsChart",
    //   component: "DualSelect",
    //   id: "selectedUser",
    //   option1: "yes",
    //   option2: "no",
    //   reducer: "ui_reducer",
    //   title: "Would you like to add a period of different contributions?",
    //   onClick: function () {
    //     addPeriodToSavingsStream(instance, contributionPeriods, id, set)
    //   },
    // })
  }

  return array
}
