import { years, chartDataListener } from "model/utils"


/** Prototupe
 * Object for providing methods to an object above the object on the prototype chain
 * This object holds methods useful when building a forcast which takes state containing stream objects and
 *projecting out their values into the future by year for each user.
 **/

export const forcastMethods = {
  /**  buildForcase
   * Method that creates an array of years from values found in state such as the year the user starts working till when they pass awau.
   * It maps over those years and fires a function called "For Each User" for each year and builds an object with those results assigned ot the year
   * it is important that a forEach is used and not a map becasue the values must be assigned to the main object on each itereation
   * allowing the next years value to have access to all prior values
   *@param fn this must be a function that returns an object and will be passed to forEachUser
   *@returns this the current state of the proto object along with state. It is designed for function chaining.
   **/

  buildForcast(streamType, fn) {
    years(this, streamType).forEach((year, i) => {
      this.merge({ forcast: { [year]: this.forEachUser(fn, year) } })
    })
    return this
  },

  mapForcast(fn) {
    Object.keys(this.forcast).reduce((a, year) => {
      this.merge({ forcast: { [year]: this.forEachUser(fn, year) } })
      return a
    }, {})
    return this
  },

  /**  buildChartArray
   * creates an array with all the required data to fill a chart based on the selectedUser and the selected Account
   *@returns array of objects each with a year and then any number of key values
   **/
  buildChartArray() {
    this.chartData = chartDataListener(this, this.forcast)
    return this
  },

  /**  forEachUser
   *
   * takes one function that will return an object along with any number of arguments,
   * It will fire the function, passing in user and the other arugments
   * @param fn a function that can receive any number of functions but reduced them into one object that is returned for the user
   * @param args could the the index position in the range array or the current year
   * @returns {
   * user1: {}
   * ,
   * user2: {}
   * }
   */

  forEachUser(fn, ...args) {
    const { users } = this.ui_reducer
    return users.reduce((a, user) => ({ ...a, [user]: fn(this, user, ...args) }), {})
  },

  /** used to find important values in the range forcast such as the largest value, or when savings go to zero
   * it will store these values in the obejct as calcResults
   *@param fn a grouping function that recieves any number of functions and returns an object
   *@returns an object split into values for each user with the calculation results.
   **/

  calculate(fn) {
    this.merge({ calcResults: this.forEachUser(fn) })
    return this
  },
  /**  selectStreams
   * says hi
   *@param
   *@returns
   **/

  selectStreams(query) {
    const [key, value] = Object.entries(query)[0]
    if (typeof key === "string") {
      const values = this.filterArray(Object.values(this[key]), value)
      this.releventStreams = Object.assign(Object.create(this), values)
      return this
    }
    return this
  },

  /**  filterStreams
   * used to further filter the selected streams using the proto helper method filterArray
   *@param query an object containing the desired key value pairs
   *@returns an array of the filtered values
   **/

  filterStreams(query) {
    return this.filterArray(Object.values(this.releventStreams), query)
  },
}
