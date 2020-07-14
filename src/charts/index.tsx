import { set } from "../redux/actions"
import { appState } from "types/reducer_types"
import { compose } from "redux"
import { connect } from "react-redux"

import { IncomeChart as _IncomeChart } from "charts/IncomeChart"
import { SavingsChart as _SavingsChart } from "charts/SavingsChart"
import { NetWorthChart as _NetWorthChart } from "charts/NetWorthChart"
import { TaxesChart as _TaxesChart } from "charts/TaxesChart"
import { SpendingChart as _SpendingChart } from "charts/SpendingChart"

const mapStateToProps = (state: appState) => ({ state })

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
