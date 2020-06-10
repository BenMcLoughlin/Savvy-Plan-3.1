import React, { FC, useState } from 'react'
import styled from 'styled-components'

interface IProps {
  array: string[]
  childId: any
  id: string
  label: string
  reducer: string
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId: any) => void
}

export const Dropdown: FC<IProps> = ({ array, childId, id, label, reducer, state, setValue_action}) => {
  const [open, toggleOpen] = useState<boolean>(false)
  const selectedValue = state[reducer][id][childId]

  return (
    <Wrapper>
      <Input onChange={(e) => e} type="text" autoComplete="off" value={selectedValue} onClick={() => toggleOpen(!open)}></Input>
      <Label>{label}: </Label>
      {open && (
        <DropDown>
          {array.map((d: string) => {
            return (
              <Square
                selected={false}
                onClick={() => {
                  setValue_action(id, reducer, d, childId)
                  toggleOpen(false)
                }}
              >
                {d}
              </Square>
            )
          })}
        </DropDown>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 3.5rem;
  width: 22rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 1rem;

`

const Input = styled.input`
  height: 3.5rem;
  padding-left: 1.5rem;
  width: 18rem;
  outline: none;
  background: none;
  color: white;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  position: relative;
  border-radius: 15px;
  &:focus {
    background: ${props => props.theme.color.darkGrey};
  }
`

const DropDown = styled.div`
  position: absolute;
  width: 16rem;
  top: 3.5rem;
  left: 3.2rem;
  background: none;
  z-index: 250;
  overflow: hidden;
  display: flex;
  flex-wrap: start;
  flex-direction: column;
  overflow: scroll;
`
interface ISquare {
  selected: boolean
}

const Square = styled.div<ISquare>`
  width: 100%;
  padding: 0.4rem;
  height: 4.2rem;
  display: flex;
  align-content: center;
  padding-left: 1rem;
  font-size: 1.4rem;
  background-color: ${props => props.theme.color.darkGrey};
  color: white;
  border: 0.5px solid #e0dedd;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.color.darkGrey};
    color: white;
  }
  &:nth-child(1) {
    border-radius: 0;
  }
  &:nth-last-child(1) {
    border-radius: 0 0 10px 10px;
  }
`

const Label = styled.div`
  color: white;
  font-size: 1.4rem;
  position: absolute;
  top: .64rem;
  left: -2rem;
`