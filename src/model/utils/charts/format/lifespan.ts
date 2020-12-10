import lifespanData from "data/LifeSpanData.json"

/**  format.lifespan
 * takes data in json format showing the survival rates of men and women, estimated for 2025  and
 * converts it into data that the area chart can read. To be read it must have a year for each object
 * and to make it stacked the higher number must have the lower value subtracted from it.
 *@param none lifespan data is held in the data json folder
 *@returns an array of objects with year and values that can be used in a stacked area chart
 **/

export const lifespan = (): Lifespan => {
  //data retrieved from https://www.osfi-bsif.gc.ca/Eng/oca-bac/as-ea/Pages/mpsspc.aspx

  const data = lifespanData.map((d: LifespanYear) => {
    return {
      year: d.age,
      male: d.men2025,
      female: d.women2025 - d.men2025,
    }
  })
  return { chartData: data, rawData: lifespanData }
}

//types

interface Year {
  year: number
  male: number
  female: number
}


interface LifespanYear {
  age: number
  men2025: number
  women2025: number
}


interface Lifespan {
  chartData: Year[]
  rawData: LifespanYear[]
}
