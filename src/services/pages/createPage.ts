import _ from "lodash"
import { createStream } from "services/create_functions"
import { createDebtSliders, createMortgageSliders, createTripleSliders, createPropertySliders } from "services/questions/createTripleSliders"
import * as I from "types"
import { incomeQuestions_data } from "data/questions_data"

/**
 * createPage receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const createPage = (data: I.pages, state: I.appState, set: I.set, parent: I.parent): any => {
  const { selectedId, colorIndex, selectedUser, newStream } = state.ui_reducer

  const { user1BirthYear, user1Name, user2Name } = state.user_reducer

  const instance = state.main_reducer[selectedId]

  const { streamType, chart, addButtonLabel, infoCards} = data

  const pageData = {
    addButtonLabel,
    editPanel: "EditPanel",
    streamType,
    chart,
    infoCards,
    user1Name,
    user2Name,
    createStream: function () {
      //when the user clicks "Add new Stream" this function creates a new stream and sets the id in the ui_reducer to it is displayed
      createStream(colorIndex, set, streamType, "", selectedUser)
      set("newStream", "ui_reducer", true)
    },
  }

  if (instance && !newStream) {
    if (streamType !== "property" && streamType !== "debt") {
      const editPeriod = createTripleSliders(incomeQuestions_data, instance, set, state)
      return { ...pageData, editPeriod }
    }

    if (streamType === "property") {
      const editPeriod = createPropertySliders(instance, set)
      return { ...pageData, editPeriod }
    }

    if (streamType === "debt") {
      const editPeriod = createDebtSliders(instance, set)
      return { ...pageData, editPeriod }
    }
  }

  return pageData
}
