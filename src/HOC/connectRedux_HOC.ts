import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { IAppState } from "types/reducer_types"

//Pages
import { Onboard as _Onboard } from "pages/onboard/Onboard"
import { OnboardWizard as _OnboardWizard } from "pages/onboard/OnboardWizard"
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
import { SideNav as _SideNav } from "components/nav/SideNav"
import { ColorSelect as _ColorSelect } from "components/dropdowns/ColorSelect"
import { Dropdown as _Dropdown } from "components/dropdowns/Dropdown"
import { ScrollCircles as _ScrollCircles } from "components/scroll/ScrollCircles"
import { EditTitle as _EditTitle } from "components/TextInput/EditTitle"
import { EditIncome as _EditIncome } from "components/cards/EditIncome"
import { TripleSelector as _TripleSelector } from "components/nav/TripleSelector"
import { ChartNav as _ChartNav } from "components/nav/ChartNav"
import { InfoCard as _InfoCard } from "components/cards/InfoCard"
import { MultiSliders as _MultiSliders } from "components/Sliders/MultiSliders"

//CHARTS

import { IncomeChart as _IncomeChart } from "charts/IncomeChart"
import { SavingsChart as _SavingsChart } from "charts/SavingsChart"
import { NetWorthChart as _NetWorthChart } from "charts/NetWorthChart"
import { TaxesChart as _TaxesChart } from "charts/TaxesChart"
import { SpendingChart as _SpendingChart } from "charts/SpendingChart"

const mapStateToProps = (state: IAppState) => ({ state })

//EXPORT SMART CONNECTED COMPONENTS
/**
 * The <ProgressBar> runs along the top right below the header and shows the users progress through the wizard. Its takes its information from  a value called progress
 * in the ui_reducer.
 *  */

export const ProgressBar = compose(connect(mapStateToProps, { set }))(_ProgressBar)

/**
 * A Simple Dark Button that can fire an onclick or set a value in a reducer.
 *  */

export const Button = compose(connect(mapStateToProps, { set }))(_Button)

/**
 * Next is a button with an arrow pointing right that changes color when the user is ready to advance.
 *  */

export const Next = compose(connect(mapStateToProps, { set }))(_Next)

/**
 * Back is a button with an arrow pointing left that enables the user to move back through the wizard.
 *  */

export const Back = compose(connect(mapStateToProps, { set }))(_Back)

/**
 * PickMultipleOptions provides a series of options and allows the user to pick as many as they like.
 *  */
export const PickMultipleOptions = compose(connect(mapStateToProps, { set, remove }))(_PickMultipleOptions)

/**
 * DualSelect allows the user to choose between two options
 *  */
export const DualSelect = compose(connect(mapStateToProps, { set }))(_DualSelect)

/**
 *  PickSingleOption provides a series of options and allows the user to pick only one.
 *  */
export const PickSingleOption = compose(connect(mapStateToProps, { set }))(_PickSingleOption)

/**
 *  TextInput allows the user to enter text to change a name or year.
 *  */
export const TextInput = compose(connect(mapStateToProps, { set }))(_TextInput)

/**
 *  PickNumber enables the user to choose a number starting at 1, there is a plus button and they can increase the numbers available.
 *  */

export const PickNumber = compose(connect(mapStateToProps, { set }))(_PickNumber)

/**
 *  Slider enables the user to change a value with a range Bar or type in a value
 *  */
export const Slider = compose(connect(mapStateToProps, { set }))(_Slider)

/**
 *  A Nav menu sitting above a chart that lets the user shift that data being shown in the chart
 *  */

export const ChartNav = compose(connect(mapStateToProps, { set }))(_ChartNav)

/**
 *  A Card that provides infomation and can be scrolled through.
 *  */
export const InfoCard = compose(connect(mapStateToProps, { set }))(_InfoCard)

/**
 *  It enables the user to see two or more sliders side by side. It recives a number which tells it how many sliders to render.
 * Then it receives props for each slider. 
 *  */
export const MultiSliders = compose(connect(mapStateToProps, { set }))(_MultiSliders)

/**
 * The <Display> component receives page data and renders a page based on the data passed to it. The page
 * will show a chart, edit box, and info cards. .
 *  */

export const Display = compose(connect(mapStateToProps, { set }))(_Display)


export const Layout = compose(connect(mapStateToProps, { set }))(_Layout)


/**
 * The <SideNav> component contains a list of values: "Income", "Spending", "Taxes" etc. The User can click
 * a value to navigate between pages. The Nav is visible non matter which page is rendered.
 *  */

export const SideNav = compose(connect(mapStateToProps, { set }))(_SideNav)

/**
 * The <ColorSelect> component enables the user to select the color of the topic they are editing.
 * */

export const ColorSelect = compose(connect(mapStateToProps, { set }))(_ColorSelect)

/**
 * The <EditTitle> enables the user to change the title of an item they are wanting to edit.
 * */

export const EditTitle = compose(connect(mapStateToProps, { set }))(_EditTitle)

/**
 * The <Dropdown> component enables the user to select an option from a dropdown menu
 * */

export const Dropdown = compose(connect(mapStateToProps, { set }))(_Dropdown)

/**
 * The <ScrollCircles> shows a circle for each option and will enable the user to scroll through the options
 * */

export const ScrollCircles = compose(connect(mapStateToProps, { set }))(_ScrollCircles)

//SMART CONNECTED PAGES
export const Onboard = compose(connect(mapStateToProps, { set, remove }))(_Onboard)
export const OnboardWizard = compose(connect(mapStateToProps, { set }))(_OnboardWizard)

/**
 * The <EditIncome> component enables the user to change all the values pertaining to one subject instance  */

export const EditIncome = compose(connect(mapStateToProps, { set, remove }))(_EditIncome)

/**
 * The <TripleSelector> gives the user 3 options and enables the user to toggle between them  */

export const TripleSelector = compose(connect(mapStateToProps, { set, remove }))(_TripleSelector)

//CHARTS

/**
 * The <IncomeChart> renders a chart showing the users income from age 18-95. If the user clicks on a bar it will set that
 * value's id in the ui_reducer as selectedId and open an edit box.
 *  */

export const IncomeChart = compose(connect(mapStateToProps, { set }))(_IncomeChart)
/**
 * The <SavingsChart> renders a chart showing the users savings from age 18-95.
 *  */

export const SavingsChart = compose(connect(mapStateToProps, { set }))(_SavingsChart)

/**
 * The <NetWorthChart> renders a chart showing the users net worth from current age until  95.
 *  */

export const NetWorthChart = compose(connect(mapStateToProps, { set }))(_NetWorthChart)
/**
 * The <TaxesChart> renders a chart showing the users Taxes from current age until  95.
 *  */

export const TaxesChart = compose(connect(mapStateToProps, { set }))(_TaxesChart)
/**
 * The <SpendingChart> renders a chart showing the users spending from current age until  95.
 *  */

export const SpendingChart = compose(connect(mapStateToProps, { set }))(_SpendingChart)
