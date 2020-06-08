import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps {}

export const SpouseIncomeChart: FC<IProps> = ({}) => {
  return (
    <Wrapper>
      <Img alt="#" src={require('assets/lifetimeIncome.png')} style={{ height: '20rem' }} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  margin-left: 8rem;
`

const Img = styled.img`
  height: 20rem;
`
