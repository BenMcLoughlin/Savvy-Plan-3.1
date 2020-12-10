import * as I from "model/types"

/**  email
 * checks if it is a valid email
 *@param string
 *@returns boolean
 **/

export const email = (email: string) => !/\S+@\S+\.\S+/.test(email)

/**  password
 * checks if it is a valid password
 *@param string
 *@returns boolean
 **/
export const password = (password: string) => password.length < 6 || password.length > 20

/**  passwordConfirm
 * checks if it is a valid passwordConfirm
 *@param string
 *@returns boolean
 **/
export const passwordConfirm = (formData: I.loginForm) =>
  formData.password !== formData.passwordConfirm
