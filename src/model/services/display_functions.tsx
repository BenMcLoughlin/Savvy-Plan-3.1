import React from "react"
import * as I from "model/types"
/**
 * recieves an object called components that has all components available in the app. Data refers to an object that has a component type to display and a handle function.
 *  */

export const matchThenShowComponent = (components: I.objects, data: I.a, query: string): I.a => {
  if (!query) return null
  if (query === "chart" || query === "null") return null

  const Component = components[query] //each page renders a unique chart, its name is provided by the props in string format. connectRedux_HOC holds all components so here it finds the chart to be rendered
  return <Component {...data} />
}
