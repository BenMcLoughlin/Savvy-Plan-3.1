/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import { drawBarChart } from "view/charts/drawCharts/drawBarChart"
import * as I from "model/types"
import { buildIncomeForcast } from "model/calculations/income/incomeV3"

interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  enableNav?: boolean
  show?: string
}

export const IncomeChart: FC<IProps> = ({ color_selector, enableNav, show, state, set }) => {
  const { selectedUser } = state.ui_reducer
  const { user_reducer } = state
  const {
    r1,
    r2,
    user1: { lifeSpan: u1Ls },
    user2: { lifeSpan: u2Ls },
  } = user_reducer
  const inputRef = useRef(null)
  const className = "incomeChart"
  const { chartArray, yearRange } = useMemo(() => buildIncomeForcast(state), [state.stream_reducer, state.user_reducer, r1, r2, u1Ls, u2Ls])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawBarChart(color_selector, className, chartArray, yearRange, height, state, width)
    }
  }, [color_selector, chartArray, set, selectedUser, state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef} />
      {enableNav && (
        <ChartNavWrapper>
          <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
        </ChartNavWrapper>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 110rem;
  height: 23rem;
  ${props => props.theme.neomorph};
  border-radius: 15px;
`
const Canvas = styled.div`
  width: 90rem;
  height: 20rem;
  position: absolute;
`

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 0rem;
  left: 4rem;
`
