import { set } from "model/redux/actions"
import { compose } from "redux"
import { connect } from "react-redux"
import * as I from "model/types"

//Import Selectors
import { color_selector } from "model/redux/selectors"

import { IncomeChart as _IncomeChart } from "view/charts/IncomeChart"
import { DonutChart as _DonutChart } from "view/charts/DonutChart"
import { SavingsChart as _SavingsChart } from "view/charts/SavingsChart"
import { NetWorthChart as _NetWorthChart } from "view/charts/NetWorthChart"
import { TaxesChart as _TaxesChart } from "view/charts/TaxesChart"
import { SpendingChart as _SpendingChart } from "view/charts/SpendingChart"

const mapStateToProps = (state: I.state) => ({
  state,
  color_selector: color_selector(state),
})

export const DonutChart = compose(connect(mapStateToProps, { set }))(_DonutChart)

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
