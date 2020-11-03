/* eslint-disable */
import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { getSavings } from "model/calculations/savings/savings.function"
import { drawAreaChart } from "view/charts/createChartFunctions/createAreaChart"
import { drawBarChart } from "view/charts/createChartFunctions/createBarChart"
import { getSavingsData } from "model/calculations/savings/create/createChartArray"

interface IProps {
  state: any
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  exampleState?: any
}

export const SavingsChart: FC<IProps> = ({ color_selector, state, exampleState, set }) => {
  if (exampleState) state = exampleState()

  console.log(state)
  const dataObject = getSavings(state)

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
      const barWidth = inputBarRef.current.offsetWidth
      const barHeight = inputBarRef.current.offsetHeight
      drawAreaChart(areaClassName, areaData, dataObject, areaHeight, state, areaWidth)
      drawBarChart(color_selector, barClassName, barData, dataObject, barHeight, set, state, barWidth)
    }
  }, [dataObject, set, state])

  return (
    <Wrapper>
      <AreaCanvas className={areaClassName} ref={inputAreaRef} />
      <BarCanvas className={barClassName} ref={inputBarRef} />
      {/* <ChartNavWrapper>
        <ChartNav options={["tfsa", "rrsp", "personal", "combined"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
      </ChartNavWrapper> */}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110rem;
  height: 33rem;
  border-radius: 15px;
  ${props => props.theme.neomorph};
`
const BarCanvas = styled.div`
  width: 100%;
  height: 20%;
  position: absolute;
  top: 80%;
  z-index: 1;
  left: -4rem;
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
