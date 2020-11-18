import { set, remove } from "model/redux/actions"
import { store } from "index"

export const assumptions = (q, user) => {
  const state = store.getState()
  const { birthYear, lifeSpan, gender, firstName, cppStartAge, oasStartAge } = state.user_reducer[user]
  return {
    for: {
      cppStartAge: () => {
        q.push({
          ...{
            bottomLabel: `in ${+cppStartAge + +birthYear}`,
            max: 70,
            min: 60,
            step: 1,
            topLabel: "I'd like to start at age ",
            value: cppStartAge,
            handleChange: value => {
              set("user_reducer", { [user]: { cppStartAge: value } })
            },
          },
        })
      },
    },
    retIncome: () =>
      q.push({
        ...{
          max: 300000,
          min: 0,
          step: 1000,
          selectedFocus: true,
          value: state.user_reducer.retIncome,
          handleChange: value => {
            set("user_reducer", { retIncome: value })
          },
        },
      }),
  }
}
