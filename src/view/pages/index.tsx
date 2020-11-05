import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "model/redux/actions"
import * as I from "model/types"

//Pages
import { About as _About } from "./About"
import { Account as _Account } from "./Account"
import { Product as _Product } from "./Product"
import { Pricing as _Pricing } from "./Pricing"
import { Display as _Display } from "./Display"
import { Questions as _Onboard } from "./Questions"

import { LandingPage as _LandingPage } from "./LandingPage"

const mapStateToProps = (state: I.state) => ({
  state,
})

export const About = compose(connect(mapStateToProps, { set, remove }))(_About)
export const Account = compose(connect(mapStateToProps, { set, remove }))(_Account)

export const LandingPage = compose(connect(mapStateToProps, { set, remove }))(_LandingPage)

export const Product = compose(connect(mapStateToProps, { set, remove }))(_Product)

export const Pricing = compose(connect(mapStateToProps, { set, remove }))(_Pricing)

export const Display = compose(connect(mapStateToProps, { set, remove }))(_Display)

export const Questions = compose(connect(mapStateToProps, { set, remove }))(_Onboard)
