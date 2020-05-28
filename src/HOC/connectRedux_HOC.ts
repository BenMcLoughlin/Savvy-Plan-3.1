

import {compose} from "redux"
import {connect} from "react-redux"
import {setValue_action} from "../redux/actions"
import { IAppState} from "types/reducer_types"

//Pages
import {Onboard as _Onboard} from "pages/onboard/Onboard"
import {OnboardWizard as _OnboardWizard} from "pages/onboard/OnboardWizard"
import { IncomeWizard as _IncomeWizard } from "pages/income/IncomeWizard"
import { Income as _Income } from "pages/income/Income"


//Components

import { ProgressBar as _ProgressBar } from "components/ProgressBar"
import {Button as _Button} from "../components/Button"
import { Next as _Next } from "components/Next"
import { Back as _Back } from "components/Back"
import { CumulativeSelect as _CumulativeSelect } from "components/CumulativeSelect"
import { DualSelect as _DualSelect } from "components/DualSelect"
import { MultiSelect as _MultiSelect } from "components/MultiSelect"
import { TextInput as _TextInput } from "components/TextInput"
import { NumberSelect as _NumberSelect } from "components/NumberSelect"
import { Slider as _Slider } from "components/Slider"
import { TextAndTwoSliders as _TextAndTwoSliders } from "components/TextAndTwoSliders"
import { SideNav as _SideNav } from "components/SideNav"


const mapStateToProps = (state: IAppState) => ({state})



//SMART CONNECTED COMPONENTS
export const ProgressBar = compose(connect(mapStateToProps, { setValue_action }))(_ProgressBar)
export const Button = compose(connect(mapStateToProps, {setValue_action}))(_Button)
export const Next = compose(connect(mapStateToProps, {setValue_action}))(_Next)
export const Back = compose(connect(mapStateToProps, {setValue_action}))(_Back)
export const CumulativeSelect = compose(connect(mapStateToProps, {setValue_action}))(_CumulativeSelect)
export const DualSelect = compose(connect(mapStateToProps, {setValue_action}))(_DualSelect)
export const MultiSelect = compose(connect(mapStateToProps, {setValue_action}))(_MultiSelect)
export const TextInput = compose(connect(mapStateToProps, {setValue_action}))(_TextInput)
export const NumberSelect = compose(connect(mapStateToProps, {setValue_action}))(_NumberSelect)
export const Slider = compose(connect(mapStateToProps, { setValue_action }))(_Slider)

/**
 * The  TextAndTwoSliders component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<SideNav>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *  */

export const TextAndTwoSliders = compose(connect(mapStateToProps, {setValue_action}))(_TextAndTwoSliders)

/**
 * The <SideNav> component contains a list of values: "Income", "Spending", "Taxes" etc. The User can click
 * a value to navigate between pages. The Nav is visible non matter which page is rendered. 
 *  */

export const SideNav = compose(connect(mapStateToProps, { setValue_action }))(_SideNav)


//SMART CONNECTED PAGES
export const Onboard = compose(connect(mapStateToProps, {setValue_action}))( _Onboard)
export const OnboardWizard = compose(connect(mapStateToProps, { setValue_action }))(_OnboardWizard)

/**
 * The <IncomeWizard> walks the user through adding details regarding their income. Its goal
 * is to store those details in the main reducer which then sends the data to build the chart. 
 * It collects the info in a step by step question process created in the income_data function which returns an array of questions.
 * and is held in the parent component, Income. The function is mapped through and renders one 
 * question at a time by matching the progress position with the array index from the income_data array. The wizard then
 * checks to see which component it received and renders the question accordingly.
 *  */

export const IncomeWizard = compose(connect(mapStateToProps, {setValue_action}))(_IncomeWizard)
/**
 * The <Income> component is the main component for the income section. It renders the chart along with a wizard
 * enabling the user to input their data and then a user interface that enables them to edit their income if they like. 
 *  */

export const Income = compose(connect(mapStateToProps, {setValue_action}))(_Income)

