/* eslint-disable */
import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { drawAreaChart } from "view/charts/drawCharts/drawAreaChart"
import { store } from "index"
import * as I from "model/types"

interface IProps {
  data: I.a
  chartName: string
  dataObject?: I.a
}

export const AreaChart: FC<IProps> = ({ data, dataObject, chartName }) => {
  let state = store.getState()

  const inputAreaRef = useRef(null)

  const className = `${chartName}AreaChart`

  useEffect(() => {
    if (inputAreaRef && inputAreaRef.current) {
      const areaWidth = inputAreaRef.current.offsetWidth
      const areaHeight = inputAreaRef.current.offsetHeight
      drawAreaChart(className, data, dataObject, areaHeight, state, areaWidth)
    }
  }, [state])

  return (
    <Wrapper>
      <AreaCanvas className={className} ref={inputAreaRef} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: ${props => props.theme.neomorph};
`

const AreaCanvas = styled.div`
  width: 100%;
  height: 80%;
  left: -1rem;
`

// {/* <ChartNavWrapper>
// <ChartNav options={["tfsa", "rrsp", "nopersonal", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
// </ChartNavWrapper> */}
