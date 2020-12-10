import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "model/redux/actions"
import * as I from "model/types"

//Pages

import { ManagePlan as _ManagePlan } from "./ManagePlan"
import {BuildPlan as _BuildPlan } from "./BuildPlan"

import { Landing as _Landing } from "./Landing"

const mapStateToProps = (state: I.state) => ({
  state,
})



export const Landing = compose(connect(mapStateToProps, { set, remove }))(_Landing)


export const ManagePlan = compose(connect(mapStateToProps, { set, remove }))(_ManagePlan)

export const BuildPlan = compose(connect(mapStateToProps, { set, remove }))(_BuildPlan)
