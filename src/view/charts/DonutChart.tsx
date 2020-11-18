/* eslint-disable */
import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import { drawDonutChart } from "view/charts/drawCharts/drawDonutChart"
import * as I from "model/types"
import { buildIncomeForcast } from "model/calculations/income/income"
import "./tooltip.css"

interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  enableNav?: boolean
  data?: string
}

export const DonutChart: FC<IProps> = ({ color_selector, enableNav, data, state, set }) => {

  const { selectedUser } = state.ui_reducer
  const inputRef = useRef(null)
  const className = "donutChart"

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawDonutChart(color_selector, className, data, height, width, state)
    }
  }, [color_selector, data, set, selectedUser, state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef} />
      {/* <div className="tooltipWrapper">
        <div className="tooltipTitle">Bens Target RRSP</div>
        <div className="displayBox">
          <div className="displayValue1">165k</div>
          <div className="subTitle">Ideal Value at age 65</div>
        </div>
        <div className="displayTitle">So it can provide</div>
        <div className="displayBox">
          <div className="displayValue1">11k</div>
          <div className="subTitle">Income per year till age 95</div>
        </div>
      </div> */}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50rem;
  height: 30rem;
  ${props => props.theme.neomorph};
  border-radius: 15px;
  margin-top: -2rem;
  margin-left: -10rem;
`
const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`
