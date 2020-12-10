import * as landing from "model/factory/landing"
/** landing_props
 * creates an array of objects with each object containing the directions to render a page
 * the user can then navigate through the array
 *
 *@param
 *@returns
 **/

export const landing_controller = () => {
  return [landing.intro, "hi"] //[landingPage, pricing, pricing, emailReset]
}
