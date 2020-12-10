/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import * as draw from "view/charts/drawCharts/index"
import * as I from "model/types"
import * as u from "model/utils"
import { chartColors } from "model/styles/color_data"
import * as cards from "view/charts/cards"

interface IProps {
  state: I.state
  color_selector?: any
  set: I.set
  chartName
  chartType
  getChartData
  user?
  chartSize?
  card?
}

export const Chart: FC<IProps> = ({
  chartName,
  chartType,
  state,
  set,
  user,
  getChartData,
  chartSize,
  card,
}) => {
  const { selectedUser } = state.ui_reducer
  const { user_reducer, stream_reducer, ui_reducer } = state

  user = user ? user : "user1"
  const inputRef = useRef(null)
  const className = `${chartName}`

  const allData = useMemo(() => u.trackFnDuration(getChartData, state, user), [
    stream_reducer,
    user_reducer,
    ui_reducer,
  ])

  const colors = () => {
    const object = {}
    Object.assign(object, ...Object.values(stream_reducer).map((d: any) => ({ [d.name]: d.color })))
    return { ...object, ...chartColors }
  }

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      draw[chartType](colors(), className, allData, height, state, width)
    }
  }, [allData, set, selectedUser, state])

  return (
    <>
      <Wrapper chartSize={chartSize} chartType={chartType}>
        <Canvas className={className} ref={inputRef} />
        {/* {enableNav && (
        <ChartNavWrapper>
          <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
        </ChartNavWrapper>
      )} */}
      </Wrapper>
      {card && u.matchThenShowComponent(cards, null, card)}
    </>
  )
}

//---------------------------STYLES-------------------------------------------//

//${props => props.className === 'savings' ? "50rem" : '23rem'};
interface IWrapper {
  chartSize: string
  chartType: string
}
const Wrapper = styled.div<IWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${props => (props.chartType === "donut" ? "42rem" : "100%")};
  width: ${props => (props.chartType === "donut" ? "42rem" : "100%")};
  margin-left: ${props => (props.chartType === "donut" ? "-30rem" : "100%")};
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
