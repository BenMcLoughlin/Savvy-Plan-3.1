import React from "react"
import styled from "styled-components"
import { store } from "index"
import * as u from "model/utils"

export const NestEgg = () => {
  const state = store.getState()

  const combined = u.combine(state.calc_reducer.user1, state.calc_reducer.user2)
 console.log('combined:', combined)
  //const { rrspNestEgg, tfsaNestEgg, nregNestEgg } = combined

  const nestEgg = 1600000//rrspNestEgg + tfsaNestEgg + nregNestEgg
  return (
    <Wrapper>
      <Card>
        <Title fontSize={"1.9rem"} bold={"bold"}>
          Target Nest Egg
        </Title>
        <Value fontSize={"2.7rem"}>{u.asCurrency(nestEgg)}</Value>
        <Title>So it can provide</Title>
        <Value fontSize={"2.7rem"}>30K</Value>
        <Title>Retirement Income</Title>
        <Title>Topping you up to a total of</Title>
        <Value fontSize={"2.7rem"}>30K</Value>
        <Title>After Tax Per Year</Title>
      </Card>
    </Wrapper>
  )
}

interface Props {
  fontSize?: string
  bold?: string
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 25rem;
  height: 30rem;
  margin-left: 50rem;
`
const Card = styled.div`
  width: 100%;
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
