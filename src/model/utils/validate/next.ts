import * as I from "model/types"
import * as isValid from "model/utils/validate"

/**  next
* used to ensure the user has entered valid content, if true then the next button will appear
 *@param value
 *@returns 
**/ 
  


export const next = (value: I.a, data: I.objects): boolean => {
  const { component, name } = data || {
    component: "dummy",
    type: "dummy",
  }

  switch (component) {
    case "null":
      return true
    case "TextInput":
      return name === "year" ? isValid.year(value) : value.length > 2
    case "PickSingleOption":
      return value.length > 1
    case "Slider":
      return true
    case "DualSelect":
      return true
    case "TripleSliderSelector":
      return true
    default:
      return true
  }
}
