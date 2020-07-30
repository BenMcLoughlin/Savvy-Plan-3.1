

const indexationIncreasePerYear = {
  2010:	0.006,
  2011:	0.008,
  2012:	0.028,
  2013:	0.02,
  2014: 0.009,
  2015: 0.017,
  2016: 0.013,
  2017: 0.014,
  2018: 0.015,
  2019: 0.022,
  2020: 0.019,
  2021: 0.019,
  2022: 0.019,
  2023: 0.019,
  2024: 0.019,
  2025: 0.019,
  2026: 0.019,
  2027: 0.019,
  2028: 0.019,
  2029: 0.019,
  2030: 0.019,
  2031: 0.019,
  2032: 0.019,
  2033: 0.019,
  2034: 0.019,
  2035: 0.019,
  2036: 0.019,
  2037: 0.019,
  2039: 0.019,
  2040: 0.019,
  2041: 0.019,
  2042: 0.019,

}


export const adjustByCraIndex = (value) => {

  //the value provided must be in todays dollars
  const thisYear = new Date().getFullYear()

  let indexesOfValue = { } //this is an object that will contain years as the keys and the value indexed as the values

  //back calculate into the past converting the value into its past values
  for(let year = thisYear; year >= 2012; year--) {
    indexesOfValue = {...indexesOfValue, [year]: year === thisYear ? value : Math.ceil(indexesOfValue[year + 1] / (1 + indexationIncreasePerYear[year + 1]))}
}
  //forward calculate into the future estimating the future value
  for(let year = thisYear; year <= 2040; year++) {
    indexesOfValue = {...indexesOfValue, [year]: year === thisYear ? value : Math.ceil(indexesOfValue[year - 1] * (1 + indexationIncreasePerYear[year]))}
}
return indexesOfValue
}