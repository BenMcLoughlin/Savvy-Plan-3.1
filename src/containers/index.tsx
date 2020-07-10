import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { IAppState } from "../types/reducer_types"

//Pages
import { Questions as _Onboard } from "./Questions"
import { Layout as _Layout } from "./Layout"
import { Display as _Display } from "./Display"

const mapStateToProps = (state: IAppState) => ({ state })

export const Display = compose(connect(mapStateToProps, { set, remove }))(_Display)

export const Layout = compose(connect(mapStateToProps, { set }))(_Layout)

export const Questions = compose(connect(mapStateToProps, { set, remove }))(_Onboard)