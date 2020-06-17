import React, { FC } from "react"
import styled from "styled-components"
import { ChartNav } from "HOC/connectRedux_HOC"

interface IProps {
  state: any
  data: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

export const SavingsChart: FC<IProps> = ({ data, state, setValue_action }) => {
  console.log(data)
  return (
    <Wrapper>
      <Img alt="#" src={require("assets/savings.png")} style={{ height: "20rem" }} onClick={() => setValue_action("selectedId", "ui_reducer", "incomeDummy")} />
      <ChartNavWrapper>
        <ChartNav options={["tfsa", "rrsp", "non-reg", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
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

const Img = styled.img`
  height: 20rem;
  width: 80rem;
  cursor: pointer;
`
const ChartNavWrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 4rem;
`

// {/* <ChartNavWrapper>
// <ChartNav options={["tfsa", "rrsp", "non-reg", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
// </ChartNavWrapper> */}
