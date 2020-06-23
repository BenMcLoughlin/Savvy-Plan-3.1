import React, { FC } from "react"
import styled from "styled-components"

interface IProps {
  id: string
  reducer: string
  childId: string
  state: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
}

export const EditTitle: FC<IProps> = ({ id, reducer, childId, set, state }) => {
  const title = state[reducer][id][childId]
  return (
    <Wrapper>
      <Input value={title} onChange={e => set(id, reducer, e.target.value, "name")} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 3.5rem;
  width: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`
const Input = styled.input`
  height: 3.5rem;
  padding-left: 1.5rem;
  width: 16rem;
  outline: none;
  background: none;
  color: ${props => props.theme.color.darkGrey};
  border: none;
  font-size: 1.8rem;
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:focus {
    background: lightGrey;
  }
`
