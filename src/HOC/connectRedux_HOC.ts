import { compose } from "redux"
import { connect } from "react-redux"
import { set, remove } from "../redux/actions"
import { appState } from "types/reducer_types"

//Pages
import { Questions as _Onboard } from "containers/Questions"
import { Display as _Display } from "containers/Display"
import { App as _App } from "App"

//CHARTS

import { IncomeChart as _IncomeChart } from "charts/IncomeChart"
import { SavingsChart as _SavingsChart } from "charts/SavingsChart"
import { NetWorthChart as _NetWorthChart } from "charts/NetWorthChart"
import { TaxesChart as _TaxesChart } from "charts/TaxesChart"
import { SpendingChart as _SpendingChart } from "charts/SpendingChart"

const mapStateToProps = (state: appState) => ({ state })

export const Display = compose(connect(mapStateToProps, { set, remove }))(_Display)

export const App = compose(connect(mapStateToProps, { set, remove }))(_App)

//SMART CONNECTED PAGES
export const Questions = compose(connect(mapStateToProps, { set, remove }))(_Onboard)

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
