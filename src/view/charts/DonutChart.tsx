/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import { drawDonutChart, createSunburstData } from "view/charts/createChartFunctions/createDonutChart"
import * as I from "model/types"
import { buildIncomeForcast } from "model/calculations/income/income"


interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  enableNav?: boolean
  show?: string
}

export const DonutChart: FC<IProps> = ({ color_selector, enableNav, show, state, set }) => {

  const { selectedUser } = state.ui_reducer
  const inputRef = useRef(null)
  const className = "savingsSunburstChart"
  const data = useMemo(() => createSunburstData(state), [state.stream_reducer, selectedUser])

  useEffect(() => {

    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawDonutChart(color_selector, className, data, height, width)
    }
  }, [color_selector, data, set, selectedUser, state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80rem;
  height: 50rem;
  ${props => props.theme.neomorph};
  border-radius: 15px;
  margin-top: 14rem;
`
const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`