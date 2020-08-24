import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { EditPanel as _EditPanel } from "./cards/EditPanel"
import { Header as _Header } from "./layout/Header"
import { Login as _Login } from "./login/Login"
import * as I from "types"


const mapStateToProps = (state: I.state) => ({ state })

//Buttons
export { AddButton } from "./buttons/AddButton"
export { AddPrompt } from "./buttons/AddPrompt"
export { Back } from "./buttons/Back"
export { Button } from "./buttons/Button"
export { LinkButton } from "./buttons/LinkButton"
export { Exit } from "./buttons/Exit"
export { Next } from "./buttons/Next"

//Cards
export { Comment } from "./cards/Comment"
export { InfoCard } from "./cards/InfoCard"
export { TripleSliderSelector } from "./cards/TripleSliderSelector"

//Dropdowns
export { ColorSelect } from "./dropdowns/ColorSelect"
export { Dropdown } from "./dropdowns/Dropdown"

//layout
export const Header = compose(connect(mapStateToProps, { set, remove }))(_Header)
export { Footer } from "./layout/Footer"

//login
export const Login = compose(connect(mapStateToProps, { set, remove }))(_Login)

//Nav
export { ChartNav } from "./nav/ChartNav"
export { HeaderNav } from "./nav/HeaderNav"
export { ProgressBar } from "./nav/ProgressBar"
export { SideNav } from "./nav/SideNav"
export { TripleSelector } from "./nav/TripleSelector"

//Options
export { DualSelect } from "./options/DualSelect"
export { PickMultipleOptions } from "./options/PickMultipleOptions"
export { PickNumber } from "./options/PickNumber"
export { PickSingleOption } from "./options/PickSingleOption"
export { PickNumberWithText } from "./options/PickNumberWithText"

//Scroll
export { ScrollCircles } from "./scroll/ScrollCircles"

//Sliders
export { MultiSliders } from "./sliders1/MultiSliders"
export { Slider } from "./sliders1/Slider"

//Text Input

export { EditTitle } from "./textInput1/EditTitle"
export { MultipleTextInput } from "./textInput1/MultipleTextInput"
export { TextInput } from "./textInput1/TextInput"

//Smart Components Connected to Redux


export const EditPanel = compose(connect(mapStateToProps, { set, remove }))(_EditPanel)

