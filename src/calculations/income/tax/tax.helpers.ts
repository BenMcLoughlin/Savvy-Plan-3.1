import {FTR, PTR, taxCredits} from "calculations/income/tax/tax.data"


export const getTax = (inc1, type) => {
  let inc = inc1 > 0 ? inc1 : 0
  const rates = type === "federal" ? FTR : PTR
  const {rate, constant} = Object.values(rates).find((d:any):any => inc >= d.bot && inc < d.top)        //find the object that contains the bracket details the income fits into
  const tax = inc * rate - constant 
  return tax                                                                                    //return the provincial taxes for that income amount, this is done by mulitplying income by the rate and subtracting the constant
}



export const getTaxCredits = (income, type) => {                                                                          //determines the tax savings from the crdits claimed at that age, either federally or provincially
  const lowestRate = type === "fed" ? FTR[1].rate : PTR[1].rate                                                                              //Credits are multiplied by the lowest rate, which is either federal or provincial
  const donationRate = type === "fed" ? 0.33 : 0.168                                                                                         //Credits are multiplied by the lowest rate, which is either federal or provincial
 
  
   const basicPersonal = taxCredits.basicPersonal[type]

}
