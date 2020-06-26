import React, { FC } from "react"
import styled from "styled-components"
import { ChartNav } from "HOC/connectRedux_HOC"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const IncomeChart: FC<IProps> = ({ state, set }) => {
  return (
    <Wrapper>
      <Img alt="#" src={require("assets/lifetimeIncome.png")} style={{ height: "20rem" }} onClick={() => set("selectedId", "ui_reducer", "incomeDummy")} />
      <ChartNavWrapper>
        <ChartNav options={["before tax", "after tax"]} id={"selectedAccount"} reducer={"ui_reducer"} />
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
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
const ChartNavWrapper = styled.div`
  position: absolute;
  top: 10.5rem;
  left: 4rem;
`
