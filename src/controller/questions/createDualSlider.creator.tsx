import { round } from "model/services/ui_functions"
import { addPeriodToStream } from "model/services/create_functions"
import _ from "lodash"
import * as I from "model/types"
import { store } from "index"
import { set, remove } from "model/redux/actions"

export const createDualSliders = (accountStartAge): I.objects => {
  const { ui_reducer, user_reducer, ui_reducer: {isMarried} } = store.getState()

  const { users } = ui_reducer

  return users.reduce(
    (obj, user, i) => {
      const {birthYear, firstName } = user_reducer[user]
      obj[`slider${i + 1}`] = {
        bottomLabel: isMarried ? `${firstName}` : "Convert in", //eg "at age 26"
        max: 72,
        min: 50, //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        type: "year",
        value: user_reducer[user][accountStartAge],
        handleChange: (value: number) => {
          set("user_reducer", { [user]: { [accountStartAge]: value } })
        },
      }
     return obj
    },
    {}
  )
}

//   return users.map(user => {
//     const startYear = user_reducer[user][accountStartAge]
//     const { birthYear, firstName } = user_reducer[user]
//     return {
//       bottomLabel: `at age ${startYear - +birthYear}`, //eg "at age 26"
//       max: 2080,
//       min: +birthYear + 50, //if its the first one then just 2020, otherwise its the period priors last year
//       step: 1,
//       topLabel: firstName, //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
//       type: "year",
//       value: startYear,
//       handleChange: (value: number) => {
//         set("user_reducer", { [users]: { [accountStartAge]: value } })
//       },
//     }
//   })
// }
