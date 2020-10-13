
export const isValidYear = year => year > 1932 && year < new Date().getFullYear() - 10

export const validator = (value, data) => {
  const { component, type } = data || {
    component: "dummy",
    type: "dummy",
  }
  

  switch (component) {
    case "null":
      return true
    case "TextInput":
      return type === "year" ? isValidYear(value) : value.length > 2
    case "PickSingleOption":
      return value.length > 1
    case "Slider":
      return true
    case "DualSelect":
      return true
    case "TripleSliderSelector":
      return true
      default: return true
  }
}
