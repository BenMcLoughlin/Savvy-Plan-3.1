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

  const { stream_reducer, user_reducer, ui_reducer } = state

  const {} = state.calc_reducer

  useMemo(() => buildIncomeForcast(state), [stream_reducer, user_reducer, ui_reducer])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawDonutChart(color_selector, className, data, height, width, state)
    }
  }, [color_selector, data, set, selectedUser, state])

  return (
    <Wrapper>
      <Card>
        <Title fontSize={"1.9rem"} bold={"bold"}>
          Target Nest Egg
        </Title>
        <Value fontSize={"2.7rem"}>607K</Value>
        <Title>So it can provide</Title>
        <Value fontSize={"2.7rem"}>30K</Value>
        <Title>Retirement Income</Title>
        <Title>Topping you up to a total of</Title>
        <Value fontSize={"2.7rem"}>30K</Value>
        <Title>After Tax Per Year</Title>
      </Card>
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

interface Props {
  fontSize?: string
  bold?: string
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 70rem;
  height: 30rem;
  margin-top: -2rem;
  margin-left: -10rem;
`
const Canvas = styled.div`
  width: 60%;
  height: 100%;
  border-radius: 15px;
  ${props => props.theme.neomorph};
`
const Card = styled.div`
  width: 35%;
  height: 100%;
  border-radius: 15px;
  ${props => props.theme.neomorph};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`
const Title = styled.div<Props>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  padding: 0.6rem;
`
const Value = styled.div<Props>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  padding: 0.6rem;
`
