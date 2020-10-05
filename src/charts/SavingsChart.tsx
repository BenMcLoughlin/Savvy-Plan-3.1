import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { ChartNav } from "components"
import { getSavings } from "calculations/savings/savings.function"
import { drawAreaChart } from "charts/createChartFunctions/createAreaChart"
import { drawBarChart } from "charts/createChartFunctions/createBarChart"
import { getSavingsData } from "calculations/savings/create/createChartArray"

interface IProps {
  state: any
  color_selector: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
  parent?: string
}

export const SavingsChart: FC<IProps> = ({ color_selector, state, set }) => {
  const dataObject = getSavings(state)

  const { areaData, barData } = getSavingsData(state, dataObject)

  color_selector = { ...color_selector, user2rrsp: "#F29278" }

  const inputAreaRef = useRef(null)
  const inputBarRef = useRef(null)

  const areaClassName = "savingsAreaChart"
  const barClassName = "savingsBarChart"

  useEffect(() => {
    if (inputAreaRef && inputAreaRef.current) {
      const areaWidth = inputAreaRef.current.offsetWidth
      const areaHeight = inputAreaRef.current.offsetHeight
      const barWidth = inputBarRef.current.offsetWidth
      const barHeight = inputBarRef.current.offsetHeight
      drawAreaChart(color_selector, areaClassName, areaData, dataObject, areaHeight, set, state, areaWidth)
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
  height: 23rem;
  border-radius: 15px;
`
const BarCanvas = styled.div`
  width: 90rem;
  height: 7rem;
  position: absolute;
  top: 14.6rem;
  z-index: 1;
  left: -4rem;
`
const AreaCanvas = styled.div`
  width: 90rem;
  height: 15rem;
  position: absolute;
  top: 2rem;
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
