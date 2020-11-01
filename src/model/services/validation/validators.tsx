import * as I from "model/types"

export const isValidYear = (year: number): boolean => year > 1932 && year < new Date().getFullYear() - 10

const validateEmail = (email: string) => !/\S+@\S+\.\S+/.test(email)
const validatePassword = (password: string) => password.length < 6 || password.length > 20
const validatepasswordConfirm = (formData: I.formData) => formData.password !== formData.passwordConfirm

const errorText = {
  email: "Please provide a valid email address.",
  password: "Please provide a valid password.",
  passwordConfirm: "Passwords provided don't match.",
  year: "Please provide a valid year.",
}

export const validateText = (name: string, value: string, formData?: I.formData): I.validText => {
  const error =
    name === "email"
      ? validateEmail(value)
      : name === "password"
      ? validatePassword(value)
      : name === "passwordConfirm" && formData
      ? validatepasswordConfirm(formData)
      : name === "year"
      ? !isValidYear(+value)
      : false

  return { isError: error, text: errorText[name] }
}

export const validator = (value: I.a, data: I.objects): boolean => {
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
    default:
      return true
  }
}

export const validateSignUpErrors = (state: I.state): boolean => {
  const { auth_reducer } = state
  const names = ["email", "password", "passwordConfirm"]
  const errors = Object.keys(auth_reducer.errors).filter(d => names.includes(d) && auth_reducer.errors[d] !== null)
  return errors.length === 0
}
