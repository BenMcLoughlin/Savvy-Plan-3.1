/* eslint-disable */
import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { getSavings, getStackedSavings } from "model/calculations/savings/savings.function"
import { drawAreaChart } from "view/charts/drawCharts/drawAreaChart"
import { drawBarChart } from "view/charts/drawCharts/drawBarChart"
import { getSavingsData } from "model/calculations/savings/create/createChartArray"
import { exampleState, dummyRate1Data } from "data/exampleState"
import { comparisonData } from "data/planComparisonData"
import { store } from "index"

interface IProps {
  color_selector: any
  useExampleState?: boolean
  chartData?: string
}

export const SavingsChart: FC<IProps> = ({ color_selector, useExampleState, chartData }) => {
  let state = store.getState()
  if (useExampleState) state = exampleState
  if (chartData) state = dummyRate1Data

  const dataObject = useExampleState ? comparisonData : getSavings(state)

  const { areaData, barData } = getSavingsData(state, dataObject)

  const { selectedPage } = state.ui_reducer

  color_selector = { ...color_selector, user2rrsp: "#F29278" }

  const inputAreaRef = useRef(null)
  const inputBarRef = useRef(null)

  const areaClassName = `${selectedPage}AreaChart`
  const barClassName = "savingsBarChart"

  useEffect(() => {
    if (inputAreaRef && inputAreaRef.current) {
      const areaWidth = inputAreaRef.current.offsetWidth
      const areaHeight = inputAreaRef.current.offsetHeight
      if (!useExampleState) {
        const barWidth = inputBarRef.current.offsetWidth
        const barHeight = inputBarRef.current.offsetHeight
        drawBarChart(color_selector, barClassName, barData, dataObject, barHeight, state, barWidth)
      }
      drawAreaChart(areaClassName, areaData, dataObject, areaHeight, state, areaWidth)
    }
  }, [dataObject])

  return (
    <Wrapper useExampleState={useExampleState}>
      <AreaCanvas className={areaClassName} ref={inputAreaRef} />
      {!useExampleState && <BarCanvas className={barClassName} ref={inputBarRef} />}
      {/* <ChartNavWrapper>
        <ChartNav options={["tfsa", "rrsp", "personal", "combined"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
      </ChartNavWrapper> */}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface Wrapper {
  useExampleState: boolean
}
const Wrapper = styled.div<Wrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: ${props => (props.useExampleState ? "none" : props.theme.neomorph)};
`
const BarCanvas = styled.div`
  width: 100%;
  height: 20%;
  position: absolute;
  top: 80%;
  z-index: 1;
  left: -4rem;
  background: red;
`
const AreaCanvas = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  left: -1rem;
`

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 8rem;
  left: 4rem;
`

// {/* <ChartNavWrapper>
// <ChartNav options={["tfsa", "rrsp", "nopersonal", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
// </ChartNavWrapper> */}
