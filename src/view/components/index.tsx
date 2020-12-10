import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "model/redux/actions"
import { EditPanel as _EditPanel } from "./cards/EditPanel"
import { Header as _Header } from "./layout/Header"
import { Login as _Login } from "./login/Login"
import { ResetPassword as _ResetPassword } from "./login/ResetPassword"
import { Pricing as _Pricing } from "./login/Pricing"
import * as I from "model/types"

//DevButtons
import { Back as _Back } from "view/components/buttons/Back"

//Import Components
import { TextInput as _TextInput } from "view/components/textInput/TextInput"
import { PickNumberWithText as _PickNumberWithText } from "view/components/options/PickNumberWithText"
import { Next as _Next } from "view/components/buttons/Next"

//Import Selectors
import { color_selector } from "model/redux/selectors"

//Chart Imports
import { Chart as _Chart } from "view/charts/Chart"
import { DonutChart as _DonutChart } from "view/charts/DonutChart"

//DevTools
import { DevToolBox as _DevToolBox } from "view/components/devTools/DevToolBox"

//HOC Imports
import { PrivateRoute as _PrivateRoute } from "view/components/HOC/PrivateRoute"

const mapStateToProps = (state: I.state) => ({
  state,
  color_selector: color_selector(state),
})

//html
export { Column } from "view/components/html/Column"
export { Section } from "view/components/html/Section"
export { Row } from "view/components/html/Row"
export { P } from "view/components/html/P"
export { H1, H2, H3, H4 } from "view/components/html/H-Headers"

//Buttons
export { AddButton } from "./buttons/AddButton"
export { AddPrompt } from "./buttons/AddPrompt"

export const Back = compose(connect(mapStateToProps))(_Back)
export { Button } from "./buttons/Button"
export { LinkButton } from "./buttons/LinkButton"
export { Exit } from "./buttons/Exit"
export const Next = compose(connect(mapStateToProps, { set }))(_Next)

export { SocialMediaIcons } from "./buttons/SocialMediaIcons"

//Displays
export { IncomeDisplay } from "./displays/IncomeDisplay"

//DevTools
export const DevToolBox = compose(connect(mapStateToProps, { set }))(_DevToolBox)

//Cards
export { Comment } from "./cards/Comment"
export { InfoCard } from "./cards/InfoCard"
export { TripleSliderSelector } from "./cards/TripleSliderSelector"
export { Paragraph } from "./cards/Paragraph"

//Dropdowns
export { ColorSelect } from "./dropdowns/ColorSelect"
export { Dropdown } from "./dropdowns/Dropdown"

//Higher Order Components
export const PrivateRoute = compose(connect(mapStateToProps, { set }))(_PrivateRoute)
export { Loading } from "./HOC/Loading"

//layout
export const Header = compose(connect(mapStateToProps, { set, remove }))(_Header)
export { Footer } from "./layout/Footer"

//login
export const Login = compose(connect(mapStateToProps, { set, remove }))(_Login)
export const ResetPassword = compose(connect(mapStateToProps, { set, remove }))(_ResetPassword)
export const Pricing = compose(connect(mapStateToProps, { set, remove }))(_Pricing)

//Nav
export { ChartNav } from "./nav/ChartNav"
export { ProgressBar } from "./nav/ProgressBar"
export { SideNav } from "./nav/SideNav"
export { TripleSelector } from "./nav/TripleSelector"
export { Selector } from "./nav/Selector"

//Options
export { DualSelect } from "./options/DualSelect"
export { PickMultipleOptions } from "./options/PickMultipleOptions"
export { PickNumber } from "./options/PickNumber"
export { PickSingleOption } from "./options/PickSingleOption"
export { PickString } from "view/components/options/PickString"
export const PickNumberWithText = compose(connect(mapStateToProps, { set, remove }))(
  _PickNumberWithText
)

//Panels

export { AssumptionsPanel } from "view/components/panels/AssumptionsPanel"

//Scroll
export { ScrollCircles } from "./scroll/ScrollCircles"

//Sliders
export { MultiSliders } from "./sliders/MultiSliders"
export { Slider } from "./sliders/Slider"

//Text Input

export { EditTitle } from "./textInput/EditTitle"

//Smart Components Connected to Redux

export const EditPanel = compose(connect(mapStateToProps, { set, remove }))(_EditPanel)

//Smart Components Connected to Redux

export const TextInput = compose(connect(mapStateToProps, { set, remove }))(_TextInput)

export const Chart = compose(connect(mapStateToProps, { set }))(_Chart)

export const DonutChart = compose(connect(mapStateToProps, { set }))(_DonutChart)
