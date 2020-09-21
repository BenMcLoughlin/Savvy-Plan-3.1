import _ from 'lodash'
import * as I from "calculations/income/types"

export const getThisYearsIncome = (stream: I.incomeStream, year: I.year) => {
  const {periods} = stream
  //step 1. Check all periods to see if year falls within the period Start or End
  const value = _.range(periods + 1).map((n) => {
    if (year >= stream[`period${n}StartYear`] && year < stream[`period${n}EndYear`])
      return stream[`period${n}Value`];
    else return 0;
  });
  return Math.max(...value);
};

export const getIncomeStreams = ({ main_reducer }, user: string, year: I.year, query: string) => {
  const userIncomeStreams_array = Object.values(main_reducer).filter(
    (d:any) => (d.streamType === "income" || d.streamType === "savings")  && d.owner === user
  ).filter((d:any) => query === "getTaxable" ? d.taxable : query === "getNonTaxable" ? !d.taxable : d.cppEligible );

  let incomeStreams = {};
  userIncomeStreams_array.map(
    (stream: any) => (incomeStreams = { ...incomeStreams, [stream.name]: getThisYearsIncome(stream, year) })
  );

  return incomeStreams;
};

export const sumObjects = (streams) => {

  if (Object.values(streams).length > 0) {
    const streamsWithoutYear = _.omit(streams, ["year"])
    return (Object.values(streamsWithoutYear)).reduce((a:any, n:any) => a + n)
  }
return 0
} ;