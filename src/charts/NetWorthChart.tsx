import React, { FC } from "react"
import styled from "styled-components"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const NetWorthChart: FC<IProps> = ({ state, set }) => {
  return (
    <Wrapper>
      <Img alt="#" src={require("assets/netWorth.png")} style={{ height: "20rem" }} onClick={() => set("selectedAccount", "ui_reducer", "incomeDummy")} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  margin-left: 2rem;
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
