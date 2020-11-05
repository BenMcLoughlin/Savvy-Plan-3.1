import * as I from "model/types"
import _ from "lodash"

export class Helpers {
  reducer: any

  array: any

  streams: any

  turn(reducer: I.stream_reducer): I.a {
    this.reducer = reducer
    return this
  }

  intoArray(): I.a {
    this.array = Object.values(this.reducer)
    return this
  }

  filteredFor(...args: I.a): I.a {
    this.streams = this.array.filter((d: I.stream) => args.every(([k, v]) => d[k] === v))
    return this
  }
}

export const insert3 = (object: I.objects, key1: string, key2: string, key3: string, key4: string, value: I.a): I.a => {
   return (object = {
     ...object,
     [key1]: {
       ...object[key1],
       [key2]: {
         ...object[key1][key2],
         [key3]: {
           ...object[key1][key2][key3],
           [key4]: value,
         },
       },
     },
   })
}

export const insertBenefits = (object: I.objects, user: I.user, year: number, key3: string, ccb: string, cpp: string, oas: string, state: I.state): I.a => {
  const { birthYear, cppStartAge, oasStartAge } = state.user_reducer[user]
  const cppStartYear = +birthYear + +cppStartAge
  const oasStartYear = +birthYear + +oasStartAge
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: {
        ...object[year][user],
        [key3]: {
          ...object[year][user][key3],
          [`${user}Ccb`]: user === "user1" ? ccb : 0,
          [`${user}Cpp`]: year < cppStartYear ? 0 : cpp,
          [`${user}Oas`]: year < oasStartYear ? 0 : oas,
        },
      },
    },
  })
}

export const insert2 = (object: I.objects, user: I.user, year: number, args: I.a): I.objects => {
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: {
        ...object[year][user],
        ...args,
      },
    },
  })
}

export const insert1 = (object: I.objects, user: I.user, year: number, value: I.a): I.a => {
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: value,
    },
  })
}

export const insert0 = (object: I.objects, key: string, value: I.a): I.objects => {
  return (object = {
    ...object,
    [key]: value,
  })
}

export const getYearRange = (state: I.state): number[] => {
  const { user_reducer } = state
  const startYear = Math.min(user_reducer.user1.birthYear, user_reducer.user2.birthYear)
  return _.range(startYear + 18, startYear + 95)
}

export const getRetirementRange = (user: I.user, { user_reducer }: I.state): number[] => {
  const startYear = user_reducer[user].birthYear + user_reducer[user].cppStartAge
  return _.range(startYear, startYear + 30)
}
