import React, { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { ChartNav } from "components"
import { getSavings } from "calculations/savings/savings.function"
import { drawAreaChart } from "charts/createChartFunctions/createAreaChart"
import { getSavingsArrayForChart } from "calculations/savings/create/createChartArray"

interface IProps {
  state: any
  color_selector: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const SavingsChart: FC<IProps> = ({ state, set }) => {

  const dataObject = getSavings(state)

  const data  = getSavingsArrayForChart(state, dataObject)

  const {selectedUser} = state.ui_reducer

  const inputRef = useRef(null)

  const className = "savingsChart"


  useEffect(() => {

    if (inputRef && inputRef.current) {
      const width = inputRef.current.offsetWidth
      const height = inputRef.current.offsetHeight
      drawAreaChart(className, data, height, state, width)
    }

    
  }, [dataObject, set, state])

  return (
    <Wrapper>
     <Canvas className={className} ref={inputRef} />
      <ChartNavWrapper>
        <ChartNav options={["tfsa", "rrsp", "personal", "combined"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
      </ChartNavWrapper>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70rem;
  position: relative;
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
  top: 10rem;
  left: 4rem;
`

// {/* <ChartNavWrapper>
// <ChartNav options={["tfsa", "rrsp", "nopersonal", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
// </ChartNavWrapper> */}
