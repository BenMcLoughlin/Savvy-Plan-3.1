/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import * as draw from "view/charts/drawCharts/index"
import * as I from "model/types"
import * as u from "model/utils"

interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  chartName
  chartType
  getChartData
  user?
  chartSize?
}

export const Chart: FC<IProps> = ({ color_selector, chartName, chartType, state, set, user, getChartData, chartSize }) => {
  const { selectedUser } = state.ui_reducer
  const { user_reducer, stream_reducer } = state

  user = user ? user : 'user1'
  const inputRef = useRef(null)
  const className = `${chartName}`

  const allData = useMemo(() => u.trackFnDuration(getChartData, state, user), [stream_reducer, user_reducer])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      draw[chartType](color_selector, className, allData, height, state, width)
    }
  }, [color_selector, allData, set, selectedUser, state])

  return (
    <Wrapper chartSize={chartSize}>
      <Canvas className={className} ref={inputRef} />
      {/* {enableNav && (
        <ChartNavWrapper>
          <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
        </ChartNavWrapper>
      )} */}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

//${props => props.className === 'savings' ? "50rem" : '23rem'};
interface IWrapper {
  chartSize: string
}
const Wrapper = styled.div<IWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  ${props => (props.chartSize !== "cover" ? props.theme.neomorph : null)};
`
const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 0rem;
  left: 4rem;
`
