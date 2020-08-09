import { createStream } from "services/create_functions"
import { createDebtSliders, createTripleSliders, createPropertySliders } from "services/questions/createTripleSliders"
import * as I from "types"
import { incomeQuestions_data, spendingQuestions_data } from "data/questions_data"

/**
 * createPage receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const createPage = (data: I.pages, state: I.state, set: I.set, parent: I.parent): any => {
  const { selectedId, colorIndex, selectedUser, newStream, selectedPage } = state.ui_reducer

  const { user1Name, user2Name } = state.user_reducer
  const instance = state.main_reducer[selectedId]

  const { streamType, chart, addButtonLabel, infoCards } = data

  let pageData = {
    editPanel: "EditPanel",
    streamType,
    chart,
    infoCards,
    user1Name,
    user2Name,
    sideNav: {
      handleChange: value => {
        set("selectedPage", "ui_reducer", value)
        set("selectedId", "ui_reducer", "") //Sets the id in the ui_reducer to nothing when pages and changed, prevents errors with an edit income box being shown in the savings section etc.
        set("progress", "ui_reducer", 0)
      },
      value: selectedPage,
      options: ["income", "savings", "taxes", "spending", "networth"],
    },
    addPrompt: {
      label: addButtonLabel,
      handleChange: () => {
        createStream(colorIndex, set, streamType, "", selectedUser)
        set("progress", "ui_reducer", 0)
        set("newStream", "ui_reducer", true)
      },
    },
    tripleSelector: {
      handleChange: d => set("selectedUser", "ui_reducer", d),
      user1Name,
      user2Name,
      value: selectedUser,
    },
    editPeriod: {
      //Kept empty because values depend on the selectedId
    },
  }

  if (instance) {
    const { id, name, color } = instance

    const editProps = {
      id,
      handleColorChange: (value: string) => set(id, "main_reducer", value, "color"),
      handleTitleChange: (value: string) => set(id, "main_reducer", value, "name"),
      handlePeriodChange: (value: string) => set("selectedPeriod", "ui_reducer", value),
      handleExit: () =>  {
        console.log('ello:')
        set("newStream", "ui_reducer", false)
        set("selectedId", "ui_reducer", false)
        set("selectedPeriod", "ui_reducer", 0)
      },
      colorValue: color,
      nameValue: name,
      newStream,
    }

    if (instance ) {
      if (streamType === "spending") {
        const tripleSliders = createTripleSliders(spendingQuestions_data, instance, set, state)
        return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
      }

      if (streamType !== "property" && streamType !== "debt") {
        const tripleSliders = createTripleSliders(incomeQuestions_data, instance, set, state)
        return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
      }

      if (streamType === "property") {
        const tripleSliders = createPropertySliders(instance, set)
        return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
      }
      if (streamType === "debt") {
        const tripleSliders = createDebtSliders(instance, set)
        return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
      }
    }
  }

  return pageData
}
