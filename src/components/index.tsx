import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { EditPanel as _EditPanel } from "./cards/EditPanel"
import { appState } from "../types/reducer_types"

//Buttons
export { AddButton } from "./buttons/AddButton"
export { AddPrompt } from "./buttons/AddPrompt"
export { Back } from "./buttons/Back"
export { Button } from "./buttons/Button"
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
export { Header } from "./layout/Header"
export { Footer } from "./layout/Footer"

//Nav
export { ChartNav } from "./nav/ChartNav"
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
export { MultiSliders } from "./sliders/MultiSliders"
export { Slider } from "./sliders/Slider"

//Text Input
export { EditTitle } from "./textInput/EditTitle"
export { MultipleTextInput } from "./textInput/MultipleTextInput"
export { TextInput } from "./textInput/TextInput"

//Smart Components Connected to Redux

const mapStateToProps = (state: appState) => ({ state })

export const EditPanel = compose(connect(mapStateToProps, { set, remove }))(_EditPanel)
