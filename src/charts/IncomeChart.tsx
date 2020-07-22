import React, { FC, useRef, useEffect } from "react"
import styled from "styled-components"
import { ChartNav } from "components"
import * as d3 from "d3"
import {drawBarChart} from "charts/createChartFunctions/createBarChart"

interface IProps {
  state: any
  color_selector: any
  income_selector: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}


export const IncomeChart: FC<IProps> = ({ color_selector, income_selector, state, set }) => {
  //THIS IS JUST A PLACEHODLER FUNCTION FOR NOW
  const instance: any = Object.values(state.main_reducer).filter((d: any) => d.id.includes("Income"))[0]
  const inputRef = useRef(null)
  const className = "incomeChart"
  const data = income_selector

  useEffect(()=> {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawBarChart(color_selector, className, data, height, set, state,  width)
    }
 }, [state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef}/>
      <ChartNavWrapper>
        <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
      </ChartNavWrapper>
    </Wrapper>
  )
}


//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: green;
`
const Canvas = styled.div`
        width: 90rem;
        height: 20rem;
        position: absolute;
        top: 12rem;
        left: -5em;
`

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 10.5rem;
  left: 4rem;
`
