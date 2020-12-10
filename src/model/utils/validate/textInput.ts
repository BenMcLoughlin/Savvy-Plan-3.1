import * as isValid from "model/utils/validate"
import * as I from "model/types"

const errorText = {
  email: "Please provide a valid email address.",
  password: "Please provide a valid password.",
  passwordConfirm: "Passwords provided don't match.",
  year: "Please provide a valid year.",
  child1BirthYear: "Please provide a valid year.",
  child2BirthYear: "Please provide a valid year.",
  child3BirthYear: "Please provide a valid year.",
}

/** textInput
 * validates text input into a text box 
* it checks if its an email, password, passwordConform, year or childyear and it the text is incorrect it will 
* return a error messgae
 *@param name the name of the input field, eg "email" or "year"
 *@param value the value being checked
 *@param formData the form data, used when doing a password confirm to check the other password

 *@returns boolean
**/

export const textInput = (name: string, value: string, formData?: I.loginForm): I.validText => {
  const error =
    name === "email"
      ? isValid.email(value)
      : name === "password"
      ? isValid.password(value)
      : name === "passwordConfirm" && formData
      ? isValid.passwordConfirm(formData)
      : name === "year"
      ? !isValid.year(+value)
      : /BirthYear/.test(name)
      ? !isValid.childYear(+value)
      : false

  return { isError: error, text: errorText[name] }
}
