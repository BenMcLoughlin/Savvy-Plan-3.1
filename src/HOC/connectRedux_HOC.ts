import { compose } from "redux"
import { connect } from "react-redux"
import { setValue_action, delete_action } from "../redux/actions"
import { IAppState } from "types/reducer_types"

//Pages
import { Onboard as _Onboard } from "pages/onboard/Onboard"
import { OnboardWizard as _OnboardWizard } from "pages/onboard/OnboardWizard"
import { Income as _Income } from "pages/income/Income"
import { Savings as _Savings } from "pages/savings/Savings"
import { Layout as _Layout } from "pages/layout/Layout"
import { Display as _Display } from "pages/Display"

//Components

import { ProgressBar as _ProgressBar } from "components/nav/ProgressBar"
import { Button as _Button } from "../components/buttons/Button"
import { Next as _Next } from "components/buttons/Next"
import { Back as _Back } from "components/buttons/Back"
import { PickMultipleOptions as _PickMultipleOptions } from "components/options/PickMultipleOptions"
import { DualSelect as _DualSelect } from "components/options/DualSelect"
import { PickSingleOption as _PickSingleOption } from "components/options/PickSingleOption"
import { TextInput as _TextInput } from "components/TextInput/TextInput"
import { PickNumber as _PickNumber } from "components/options/PickNumber"
import { Slider as _Slider } from "components/Sliders/Slider"
import { TextAndTwoSliders as _TextAndTwoSliders } from "components/TextAndTwoSliders"
import { SideNav as _SideNav } from "components/nav/SideNav"
import { ColorSelect as _ColorSelect } from "components/dropdowns/ColorSelect"
import { Dropdown as _Dropdown } from "components/dropdowns/Dropdown"
import { ScrollCircles as _ScrollCircles } from "components/scroll/ScrollCircles"
import { EditTitle as _EditTitle } from "components/TextInput/EditTitle"
import { EditCard as _EditCard } from "components/cards/EditCard"
import { EditIncome as _EditIncome } from "components/cards/EditIncome"
import { TripleSelector as _TripleSelector } from "components/nav/TripleSelector"
import { ChartNav as _ChartNav } from "components/nav/ChartNav"
import { InfoCard as _InfoCard } from "components/cards/InfoCard"

//CHARTS

import { UserIncomeChart as _UserIncomeChart } from "charts/income/UserIncomeChart"
import { UserSavingsChart as _UserSavingsChart } from "charts/savings/UserSavingsChart"

const mapStateToProps = (state: IAppState) => ({ state })

//EXPORT SMART CONNECTED COMPONENTS
export const ProgressBar = compose(connect(mapStateToProps, { setValue_action }))(_ProgressBar)
export const Button = compose(connect(mapStateToProps, { setValue_action }))(_Button)
export const Next = compose(connect(mapStateToProps, { setValue_action }))(_Next)
export const Back = compose(connect(mapStateToProps, { setValue_action }))(_Back)
export const PickMultipleOptions = compose(connect(mapStateToProps, { setValue_action }))(_PickMultipleOptions)
export const DualSelect = compose(connect(mapStateToProps, { setValue_action }))(_DualSelect)
export const PickSingleOption = compose(connect(mapStateToProps, { setValue_action }))(_PickSingleOption)
export const TextInput = compose(connect(mapStateToProps, { setValue_action }))(_TextInput)
export const PickNumber = compose(connect(mapStateToProps, { setValue_action }))(_PickNumber)
export const Slider = compose(connect(mapStateToProps, { setValue_action }))(_Slider)
export const ChartNav = compose(connect(mapStateToProps, { setValue_action }))(_ChartNav)
export const InfoCard = compose(connect(mapStateToProps, { setValue_action }))(_InfoCard)

/**
 * The <Display> component receives page data and renders a page based on the data passed to it. The page
 * will show a chart, edit box, and info cards. .
 *  */

export const Display = compose(connect(mapStateToProps, { setValue_action }))(_Display)
/**
 * The  TextAndTwoSliders component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<SideNav>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *  */

export const Layout = compose(connect(mapStateToProps, { setValue_action }))(_Layout)

/**
 * The <SideNav> component contains a list of values: "Income", "Spending", "Taxes" etc. The User can click
 * a value to navigate between pages. The Nav is visible non matter which page is rendered.

export const TextAndTwoSliders = compose(connect(mapStateToProps, { setValue_action }))(_TextAndTwoSliders)

/**
 * The <SideNav> component contains a list of values: "Income", "Spending", "Taxes" etc. The User can click
 * a value to navigate between pages. The Nav is visible non matter which page is rendered.
 *  */

export const SideNav = compose(connect(mapStateToProps, { setValue_action }))(_SideNav)

/**
 * The <ColorSelect> component enables the user to select the color of the topic they are editing.
 * */

export const ColorSelect = compose(connect(mapStateToProps, { setValue_action }))(_ColorSelect)

/**
 * The <EditTitle> enables the user to change the title of an item they are wanting to edit.
 * */

export const EditTitle = compose(connect(mapStateToProps, { setValue_action }))(_EditTitle)

/**
 * The <Dropdown> component enables the user to select an option from a dropdown menu
 * */

export const Dropdown = compose(connect(mapStateToProps, { setValue_action }))(_Dropdown)

/**
 * The <ScrollCircles> shows a circle for each option and will enable the user to scroll through the options
 * */

export const ScrollCircles = compose(connect(mapStateToProps, { setValue_action }))(_ScrollCircles)

//SMART CONNECTED PAGES
export const Onboard = compose(connect(mapStateToProps, { setValue_action }))(_Onboard)
export const OnboardWizard = compose(connect(mapStateToProps, { setValue_action }))(_OnboardWizard)

/**
 * The <Income> component is the main component for the income section. It renders the chart along with a wizard
 * enabling the user to input their data and then a user interface that enables them to edit their income if they like.
 *  */

export const Income = compose(connect(mapStateToProps, { setValue_action }))(_Income)
/**
 * The <Savings> component is the main component for the Savingssection. It renders the chart along showing the users
 * savings plan and enables them to edit it.
 *  */

export const Savings = compose(connect(mapStateToProps, { setValue_action }))(_Savings)

/**
 * The <EditCard> component enables the user to change all the values pertaining to one subject instance  */

export const EditCard = compose(connect(mapStateToProps, { setValue_action, delete_action }))(_EditCard)
/**
 * The <EditCard> component enables the user to change all the values pertaining to one subject instance  */

export const EditIncome = compose(connect(mapStateToProps, { setValue_action, delete_action }))(_EditIncome)

/**
 * The <TripleSelector> gives the user 3 options and enables the user to toggle between them  */

export const TripleSelector = compose(connect(mapStateToProps, { setValue_action, delete_action }))(_TripleSelector)

//CHARTS

/**
 * The <UserIncomeChart> renders a chart showing the users income from age 18-95. If the user clicks on a bar it will set that
 * value's id in the ui_reducer as selectedId and open an edit box.
 *  */

export const UserIncomeChart = compose(connect(mapStateToProps, { setValue_action }))(_UserIncomeChart)
/**
 * The <UserSavingsChart> renders a chart showing the users savings from age 18-95.
 *  */

export const UserSavingsChart = compose(connect(mapStateToProps, { setValue_action }))(_UserSavingsChart)
