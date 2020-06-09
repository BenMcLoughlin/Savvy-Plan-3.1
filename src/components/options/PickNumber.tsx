import React, { FC, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { AddButton } from 'components/buttons/AddButton'

interface IProps {
  id: string
  reducer: string
  value: number
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId: string) => void
}

export const PickNumber: FC<IProps> = ({ id, value, reducer, state, setValue_action }) => {
  const selected = state[reducer][id]
  const [topNumber, setTopNumber] = useState<number>(value)

  return (
    <Wrapper>
      {_.range(1, topNumber).map((d) => (
        <Number selected={selected === d} onClick={() => setValue_action(id, reducer, d, '')}>
          {d}
        </Number>
      ))}
      <AddWrapper>
        <AddButton onClick={() => setTopNumber(topNumber + 1)} />
      </AddWrapper>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 5rem;
  min-width: 8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
interface NProps {
  selected: boolean
}

const Number = styled.div<NProps>`
  height: 5rem;
  min-width: 5rem;
  background-color: ${(props) => (props.selected ? props.theme.color.grey : 'none')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? props.theme.color.white :  props.theme.color.grey)};
  font-size: ${(props) => props.theme.fontSize.smallMedium};
  font-weight: bold;
  cursor: pointer;
`
const AddWrapper = styled.div`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
