import React, { FC, useRef, useEffect } from "react"
import styled from "styled-components"
import { ChartNav } from "components"
import { drawBarChart } from "charts/createChartFunctions/createBarChart"
import * as I from "types"
import { getIncomeArrayForChart } from "calculations/income/create/createChartArray"
import { CSSTransition } from "react-transition-group"

interface IProps {
  state: I.state
  color_selector: any
  income_selector: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const IncomeChart: FC<IProps> = ({ color_selector, income_selector, state, set }) => {
  color_selector = { ...color_selector, user1CppBenefit: "#F29278", user2CppBenefit: "#F29278", ccbBenefit: "#536D7A", user1OasBenefit: "#3B7B8E", user2OasBenefit: "#3B7B8E" }
  const data = getIncomeArrayForChart(state, income_selector)

  const inputRef = useRef(null)
  const className = "incomeChart"

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawBarChart(color_selector, className, data, income_selector, height, set, state, width)
    }
  }, [color_selector, data, income_selector, set, state])

  return (
    <Wrapper>
      <Canvas className={className} ref={inputRef} />
      {/* <ChartNavWrapper>
        <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
      </ChartNavWrapper> */}
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
