import React, { FC, useRef, useEffect, useMemo } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"
import { drawBarChart } from "view/charts/createChartFunctions/createBarChart"
import * as I from "model/types"
import { buildIncomeForcast } from "model/calculations/income/income"
import { CSSTransition } from "react-transition-group"

interface IProps {
  state: I.state
  color_selector: any
  set: (id: string, reducer: string, value: any, childId1?: string) => void
  enableNav?: boolean
}

export const IncomeChart: FC<IProps> = ({ color_selector, enableNav, state, set }) => {
  color_selector = { ...color_selector, user1Cpp: "#F29278", user2Cpp: "#F29278", user1Ccb: "#536D7A", user1Oas: "#3B7B8E", user2Oas: "#3B7B8E" }

  const inputRef = useRef(null)
  const className = "incomeChart"
  const { chartArray, inc } = useMemo(() => buildIncomeForcast(state), [state.main_reducer])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawBarChart(color_selector, className, chartArray, inc, height, set, state, width)
    }
  }, [color_selector, chartArray, set, state])

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
