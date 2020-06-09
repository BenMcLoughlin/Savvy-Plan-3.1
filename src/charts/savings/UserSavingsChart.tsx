import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

export const UserSavingsChart: FC<IProps> = ({ state, setValue_action }) => {
  return (
    <Wrapper>
      <Img
        alt="#"
        src={require('assets/savings.png')}
        style={{ height: '20rem' }}
        onClick={() => setValue_action('selectedId', 'ui_reducer', 'incomeDummy')}
      />
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
  width: 70rem;
`

const Img = styled.img`
  height: 20rem;
  width: 80rem;
  cursor: pointer;
`
