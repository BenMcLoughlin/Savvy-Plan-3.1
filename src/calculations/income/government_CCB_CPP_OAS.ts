import { ccbRates } from "calculations/income/data/CPP_data"

export const  cppIncome = (state) => {

}

export const  ccbIncome = (state) => {

}
// //HELPER FUNCTIONS
// export const sum = (age, name, query, reducer) => Object.values(reducer).map(d => d[name] === query 
//   && age >= d.age1
//   && age < d.age2 ?
//   d.value : 0 )
//   .reduce((a, n) => a + n)

// export const  ccbIncome = (birthYear, main_reducer, user_reducer) => {
   

//     const kidsArray = Object.keys(user_reducer).filter(d => d.startsWith("child"))         //filter out an array of strings that say "child1BirthYear", they can add as many kids as they like
//     const firstKidBirthYear = user_reducer[kidsArray[1]]                                   //grab first year that they have a kid
//     const lastKidBirthYear = user_reducer[kidsArray[kidsArray.length - 1]]                //grab last year that they have a kid
//     const ageAtFirstChild =  firstKidBirthYear - birthYear                                 //determine their age at first child
//     const ageAtLastChild =  (lastKidBirthYear - birthYear) + 17                                                         //determine their age when last child turns 17


//         const array = []
//         for (let age = ageAtFirstChild; age <=ageAtLastChild; age++) {
//            const inc = sum(age, "taxable", true, main_reducer)
    
//          //  console.log(inc);
    
//             const currentYear = birthYear + age
//             const ages = kidsArray.map(d => currentYear - user_reducer[d])
            
//            // console.log(ages);
    
//             const kids = kidsArray.filter(d => user_reducer[d] <= currentYear).length
//             const r1 = ccbRates[kids].r1
//             const r2 = ccbRates[kids].r2
//             const c = ccbRates[kids].c
    
//            // console.log("currentYear", currentYear, "kids", kids);
    
//             const max = ages.map(d => d >= 0 && d <= 6 ? 6639 : d <= 17 ? 5602 : 0).reduce((a, n) => a + n)
    
//             const reduction = inc <= 31120 ? 0 : inc <= 67426 ? (inc - 31120) * r1 : ((inc - 67426) * r2) + c 
//             const value = max - reduction > 0 ? max - reduction : 0
           
//             array.push({
//                     color: "#ffd152", 
//                     age1: age, 
//                     type: "otherIncome", 
//                     stream: "Child Benefit", 
//                     taxable: false, 
//                     age2: age + 1, 
//                     incomeType: "otherIncome",
//                     value: value,
//             })
//         }                                                            
//         return array


//         }


// export const addCcbToIncome = (income_selector, ccbArray) => {
// console.log(ccbArray);
//     for (let i = 0; i < ccbArray.length; i++) {
//         const id = `ccb${ccbArray[i].age1}`
//         income_selector[id] = {...ccbArray[i]}
//     }  
//     return income_selector
// }

export const  oasIncome = (state) => {

}
