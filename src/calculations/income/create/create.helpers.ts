export const getThisYearsIncome = (stream, year) => {
  //step 1. Check all periods to see if year falls within the period Start or End
  const value = [0, 1, 2].map((period) => {
    if (year >= stream[`period${period}StartYear`] && year < stream[`period${period}EndYear`])
      return stream[`period${period}Value`];
    else return 0;
  });
  return Math.max(...value);
};

export const getIncomeStreams = ({ main_reducer }, user, year, query) => {
  const userIncomeStreams_array = Object.values(main_reducer).filter(
    (d:any) => d.streamType === "income" && d.owner === user
  );
  if (query === "getCpp") userIncomeStreams_array.filter((d: any) => d.reg === "regular employment");
  if (query === "getTaxable") userIncomeStreams_array.filter((d: any) => d.taxable);
  //console.log('userIncomeStreams_array:', userIncomeStreams_array)
  let incomeStreams = {};
  userIncomeStreams_array.map(
    (stream: any) => (incomeStreams = { ...incomeStreams, [stream.name]: getThisYearsIncome(stream, year) })
  );

  return incomeStreams;
};

export const sumObjects = (streams) => {

  if (Object.values(streams).length > 0) {
    return  Object.values(streams).reduce((a:any, n:any) => a + n)
  }
return 0
} ;