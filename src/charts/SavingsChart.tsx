import React, { FC } from "react"
import styled from "styled-components"
import { ChartNav } from "components"

interface IProps {
  state: any
  data: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const SavingsChart: FC<IProps> = ({ data, state, set }) => {

    //THIS IS JUST A PLACEHODLER FUNCTION FOR NOW
    const instance: any = Object.values(state.main_reducer).filter((d: any) => d.id.includes("Savings"))[0]

  return (
    <Wrapper>
      <Img alt="#" src={require("assets/savings.png")} style={{ height: "20rem" }} onClick={() => {
        if (instance) set("selectedId", "ui_reducer", instance.id)
       }}  />
      <ChartNavWrapper>
      <ChartNav options={["tfsa", "rrsp", "personal", "combined"]} handleChange={(value) => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount}/>
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
  top: 10rem;
  left: 4rem;
`

// {/* <ChartNavWrapper>
// <ChartNav options={["tfsa", "rrsp", "nopersonal", "combined"]} id={"selectedAccount"} reducer={"ui_reducer"} />
// </ChartNavWrapper> */}
