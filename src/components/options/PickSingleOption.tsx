import React, { FC } from "react"
import styled from "styled-components"

interface IProps {
  array?: string[]
  childId?: any
  id: string
  reducer: string
  state: any
  set: (id: string, reducer: string, value: any, childId: any) => void
  textInput?: boolean
}

export const PickSingleOption: FC<IProps> = ({ array, childId, id, reducer, state, set, textInput }) => {
  const value = childId ? state[reducer][id][childId] : state[reducer][id]
  const { user_reducer } = state

  return (
    <Wrapper>
      {array &&
        array.map((d: string, i: number) => {
          return (
            <Square key={i} selected={d === value} onClick={() => set(id, reducer, d, childId)}>
              {d}
            </Square>
          )
        })}
      {textInput && <Input onChange={e => set("other", reducer, e.target.value, "")} value={user_reducer.other}></Input>}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  width: 30rem;
  min-height: 30rem;
  position: relative;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
`

interface SProps {
  selected: boolean
}

// eslint-disable-next-line
const Square = styled.div<SProps>`
  width: 100%;
  padding: 1rem;
  min-height: 5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 800;
  background: ${props => (props.selected ? props.theme.color.primary : "white")};
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  &:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }
  &:nth-last-child(1) {
    border-radius: 0 0 10px 10px;
  }
  color: ${props => (props.selected ? "white" : props.theme.color.darkGrey)};
`

const Input = styled.input`
  background: none;
  background-color: white;
  ${props => props.theme.color.darkGrey}
  font-size: 1.6rem;
  font-weight: 800;
  padding: 1.2rem;
  display: block;
  width: 100%;
  min-height: 5rem;
  border: ${props => props.theme.border.primary};
  border-radius: 3px;
  color: ${props => props.theme.color.mediumGrey};
  border-radius: 0 0 10px 10px;
  &:focus {
    outline: none;
  }
`