import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { state } from "../types/reducer_types"

//Pages
import { Questions as _Onboard } from "./Questions"
import { Display as _Display } from "./Display"

const mapStateToProps = (state: state) => ({
  state,
})

export const Display = compose(connect(mapStateToProps, { set, remove }))(_Display)

export const Questions = compose(connect(mapStateToProps, { set, remove }))(_Onboard)
