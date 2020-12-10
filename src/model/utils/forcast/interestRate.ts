export const interestRate = (account, state, user, year) => {
  const { birthYear, rrspStartAge, tfsaStartAge } = state.user_reducer[user],
    { r1, r2 } = state.user_reducer,
    tfsaStartYear = birthYear + tfsaStartAge,
    rrspStartYear = birthYear + rrspStartAge

  return account !== "rrsp" && year > tfsaStartYear ? r2 : account === "rrsp" && year > rrspStartYear ? r2 : r1
}
