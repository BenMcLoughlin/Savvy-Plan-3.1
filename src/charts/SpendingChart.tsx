import React, { FC } from "react"
import styled from "styled-components"

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

export const SpendingChart: FC<IProps> = ({ state, setValue_action }) => {
  return (
    <Wrapper>
      <Img
        alt="#"
        src={require("assets/spending.png")}
        style={{ height: "20rem" }}
        onClick={() => setValue_action("selectedId", "ui_reducer", "incomeDummy")}
      />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
