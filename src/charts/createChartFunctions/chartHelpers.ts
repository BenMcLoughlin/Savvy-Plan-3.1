import _ from "lodash"
export const round = number => {
  if (number !== undefined) return (Math.round(number/1000)*1000)/1000
  else return null
}

export const formatName = (name, user1Name,  user2Name) => {

  switch(name) {
    case('user1CppBenefit'): return `${user1Name}'s Canada Pension Plan`
    case('user1OasBenefit'): return `${user1Name}'s Old Age Security`
    case('user2CppBenefit'): return `${user2Name}'s Canada Pension Plan`
    case('user2OasBenefit'): return `${user2Name}'s Old Age Security`
    case('ccbBenefit'): return `Canada Child Benefit`
  }
  return _.startCase(name)
}