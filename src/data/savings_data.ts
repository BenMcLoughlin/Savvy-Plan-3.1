import { createStream, addPeriodToStream, newStream } from "services/ui_functions"

export const createSavingsArray = (instance: any, setValue_action: any, state: any) => {
  const { periods, id, reg } = instance

  const currentYear = new Date().getFullYear() //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that
  const { user1BirthYear } = state.user_reducer
  let past = currentYear > instance.year0

  let finalPast = currentYear > instance[`yearLast`]

  const array: any = [
    {
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: `in my ${reg}`,
      childId: "value0",
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
      component: "DualSelect",
      id: "selectedUser",
      value1: "yes",
      value2: "no",
      reducer: "ui_reducer",
      title: "Do you make regular contributions?",
      onClick: function () {
        setValue_action(id, "main_reducer", periods + 1, "periods")
        addPeriodToStream(instance, periods, id, setValue_action)
      },
    },
  ]
  if (instance.periods > 0) {
    // if the user indicated they do contribute, it will increase periods by 1
    array.push({
      ask: "Just an approximation of the current value is helpful. ",
      bottomLabel: "per year",
      childId: "value1",
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
