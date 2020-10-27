import _ from "lodash"

export class Helpers {
  reducer: any
  array: any
  streams: any

  turn(reducer: any) {
    this.reducer = reducer
    return this
  }

  intoArray() {
    this.array = Object.values(this.reducer)
    return this
  }

  filteredFor(...args) {
    this.streams = this.array.filter(d => args.every(([k, v]) => d[k] === v))
    return this
  }
}

export const insert3 = (object, user, year, key3, key4, value) => {
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: {
        ...object[year][user],
        [key3]: {
          ...object[year][user][key3],
          [key4]: value,
        },
      },
    },
  })
}

export const insertBenefits = (object, user, year, key3, ccb, cpp, oas, state) => {
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

export const insert2 = (object, user, year, args) => {
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

export const insert1 = (object, user, year, value) => {
  return (object = {
    ...object,
    [year]: {
      ...object[year],
      [user]: value,
    },
  })
}

export const insert0 = (object, key, value) => {
  return (object = {
    ...object,
    [key]: value,
  })
}

export const getYearRange = ({ user_reducer }) => {
  const startYear = Math.min(user_reducer.user1.birthYear, user_reducer.user2.birthYear)
  return _.range(startYear + 18, startYear + 95)
}

export const getRetirementRange = (user, { user_reducer }) => {
  const startYear = user_reducer[user].birthYear + user_reducer[user].cppStartAge
  return _.range(startYear, startYear + 30)
}


export const sum = (obj, query, streams) =>
  Object.entries(obj).reduce((acc: any, [k, v]) => {
    let stream = streams.find(d => d.name === k)
    return !!stream ? acc + (stream[query] ? v : 0) : acc + v
  }, 0)

export const getAfterTaxIncome = (obj, rate, streams) => {
  let newObj = {}
  Object.entries(obj).forEach(([k, v]) => {
    let stream = streams.find(d => d.name === k)
    return !!stream && !stream.taxable ? (newObj = { ...newObj, [k]: +v }) : (newObj = { ...newObj, [k]: +v * (1 - rate) })
  })
  return newObj
}

export const beforePension = (streams, year) => {
  let income = {}
  streams.map(stream => {
    const value = Math.max(...Object.values(stream.in).map((d: any) => (d.start < year && d.end > year ? d.value : 0)))
    return (income = insert0(income, [stream.name], value))
  })
  const cppEligibleIncome = sum(income, "cppEligible", streams)
  return { income, cppEligibleIncome }
}
