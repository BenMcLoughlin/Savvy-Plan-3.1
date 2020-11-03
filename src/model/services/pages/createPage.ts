import { createStream } from "model/services/create_functions"
import * as I from "model/types"
import _ from "lodash"

/**
 * createPage receives state and provides all the information needed to render the <Display> component. It has the name of the chart that needs to be rendered. The details for the info card
 * and all the information needed for the edit Income component. It removes the need to have those components handleling logic. All details pertaining to income logic are kept here to keep the
 * <Display> box as dumb as possible.
 * */

export const createPage = (data: I.pages, state: I.state, set: I.set): I.a => {
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
        set("selectedPage", "ui_reducer", value)
        set("selectedId", "ui_reducer", "") //Sets the id in the ui_reducer to nothing when pages and changed, prevents errors with an edit income box being shown in the savings section etc.
        set("progress", "ui_reducer", 0)
        if (value === "savings") set("selectedAccount", "ui_reducer", "tfsa")
        if (value === "income") set("selectedAccount", "ui_reducer", "before tax")
      },
      value: selectedPage,
      options: ["income", "savings", "taxes", "spending", "networth"],
    },
    scenarioNav: {
      handleChange: value => {
        set("selectedScenario", "ui_reducer", value)
      },
      value: selectedScenario,
      title: "Scenario",
      optionArray: scenarioOptions,
      labelArray: scenarioLabels,
      addNew: () => {
        set("scenarios", "ui_reducer", scenarios + 1)
        set(`scenarioLabel${scenarios + 1}`, "ui_reducer", "")
        set(`selectedScenario`, "ui_reducer", scenarios)
      },
    },
    addPrompt: {
      label: addButtonLabel,
      handleChange: () => {
        createStream(streamType, "in", selectedUser, "employment", set, state)
        set("progress", "ui_reducer", 0)
        set("newStream", "ui_reducer", true)
        set("dualSelectValue", "ui_reducer", true) //ensures that the select is set to contribute when opened
      },
    },
    editPrompt: {
      label: "Edit Income Stream",
      handleChange: () => {
        createStream(streamType, "in", selectedUser, "employment", set, state)
        set("progress", "ui_reducer", 0)
        set("newStream", "ui_reducer", true)
        set("dualSelectValue", "ui_reducer", true) //ensures that the select is set to contribute when opened
      },
    },
    tripleSelector: {
      handleChange: (d: string) => set("selectedUser", "ui_reducer", d),
      user1Name,
      user2Name,
      value: selectedUser,
    },
    editPeriod: {
      //Kept empty because values depend on the selectedId
    },
  }

  // if (instance) {
  //   const { id, name, color, } = instance

  //   const editProps = {
  //     id,
  //     handleColorChange: (value: string) => set(id, "stream_reducer", value, "color"),
  //     handleTitleChange: (value: string) => set(id, "stream_reducer", value, "name"),
  //     handlePeriodChange: (value: string) => set("selectedPeriod", "ui_reducer", value),
  //     handleDelete: () => {
  //       set("selectedId", "ui_reducer", "", "") // sets the seleted ID in the reducer to nothing so the box will no longer show                                                                                                         // determines which income instance to show within the edit box
  //       remove(id)
  //     },
  //     handleExit: () => {
  //       set("newStream", "ui_reducer", false)
  //       set("selectedId", "ui_reducer", false)
  //     },
  //     colorValue: color,
  //     nameValue: name,
  //     newStream,
  //     dualSelectorProps: {
  //       option1: "contribute",
  //       option2: "withdraw",
  //       value: dualSelectValue,
  //       handleChange: option => {
  //         set("dualSelectValue", "ui_reducer", true)
  //         set("savingsTransaction", "ui_reducer", option)
  //       },
  //       handleChange2: option => {
  //         set("dualSelectValue", "ui_reducer", false)
  //         set("savingsTransaction", "ui_reducer", option)
  //       },
  //     },
  //     dropdownProps: {
  //       optionArray: ["tfsa", "rrsp", "personal", "resp"],
  //       label: "account",
  //       handleChange: option => {
  //         set("selectedAccount", "ui_reducer", option)
  //         set(selectedId, "stream_reducer", option, "reg")
  //       },
  //       selectedValue: selectedAccount,
  //     },
  //     selectedPage,
  //   }

  // if (instance) {
  //   if (streamType === "spending") {
  //     const tripleSliders = createTripleSliders(spendingQuestions_data, instance, set, state)
  //     return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
  //   }

  //   if (streamType === "income") {
  //     const tripleSliders = createTripleSliders(incomeQuestions_data, instance, set, state)
  //     return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
  //   }
  //   if (streamType === "savings") {
  //     const tripleSliders = createSavingsSliders(savingsQuestions_data, instance, set, state)
  //     return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
  //   }

  //   if (streamType === "property") {
  //     const tripleSliders = createPropertySliders(instance, set)
  //     return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
  //   }
  //   if (streamType === "debt") {
  //     const tripleSliders = createDebtSliders(instance, set)
  //     return { ...pageData, editPeriod: { tripleSliders, ...editProps } }
  //   }
  // }
  //}

  return pageData
}