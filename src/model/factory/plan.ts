import * as factory from "model/factory"
import * as I from "model/types"
import _ from "lodash"
import { store } from "index"
import { set, remove } from "model/redux/actions"

/**
 * plan receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const plan = (data: I.pages): I.a => {
  const state = store.getState()
  const { selectedUser, selectedPage, selectedScenario } = state.ui_reducer

  const { firstName: user1Name } = state.user_reducer.user1
  const { firstName: user2Name } = state.user_reducer.user2

  const scenarios = 3 //TODO use a method to get the number from the scenarios object

  const scenarioLabels = _.range(scenarios).map(d => state.ui_reducer[`scenarioLabel${d + 1}`])
  const scenarioOptions = _.range(scenarios).map(d => (d < 10 ? `0${d}` : "" + d))

  const { streamType, chart, addButtonLabel, infoCards } = data

  const pageData = {
    editPanel: "EditPanel",
    streamType,
    chart,
    infoCards,
    user1Name,
    user2Name,
    sideNav: {
      handleChange: value => {
        set("ui_reducer", { selectedPage: value })
        set("ui_reducer", { selectedId: "" })
        set("ui_reducer", { progress: 0 })
      },
      value: selectedPage,
      options: ["income", "savings", "taxes", "spending", "networth"],
    },
    scenarioNav: {
      handleChange: value => {
        set("ui_reducer", { selectedScenario: value })
      },
      value: selectedScenario,
      title: "Scenario",
      optionArray: scenarioOptions,
      labelArray: scenarioLabels,
      addNew: () => {
        set("ui_reducer", { scenarios: scenarios + 1 })
      },
    },
    addPrompt: {
      label: addButtonLabel,
      handleChange: () => {
        factory.stream(streamType, "in", selectedUser, "employment")
        set("ui_reducer", { progress: 0 })
        set("ui_reducer", { newStream: true })
        set("ui_reducer", { dualSelectValue: true })
      },
    },
    editPrompt: {
      label: "Edit Income Stream",
      handleChange: () => {
        factory.stream(streamType, "in", selectedUser, "employment")
      },
    },
    tripleSelector: {
      handleChange: (d: string) => set("ui_reducer", { selectedUserd: d }),
      user1Name,
      user2Name,
      value: selectedUser,
    },
    editPeriod: {
      //Kept empty because values depend on the selectedId
    },
  }

  return pageData
}
