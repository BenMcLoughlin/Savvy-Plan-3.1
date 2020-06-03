import React, { FC } from 'react'
import styled from 'styled-components'
import { SideNav, Income } from 'HOC/connectRedux_HOC'
import { InfoCard } from 'components/InfoCard'

interface IProps {}

export const Plan: FC<IProps> = ({}) => {
  return (
    <Wrapper>
      <A>
        <Title>Your Financial Plan</Title>
        <SideNav id={'selectedPage'} reducer={'ui_reducer'} />{' '}
      </A>
      <B>
       <Income/>
      </B>
      <C>
        <InfoCard></InfoCard>
        <InfoCard></InfoCard>
      </C>
      <D></D>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 60rem;
  width: 150rem;
  display: grid;
  grid-template-columns: 26rem 80rem 40rem;
  grid-template-rows: 30rem 40rem;
  grid-template-areas:
    'a b c'
    'a d c';
`
const A = styled.div`
  grid-area: a;
  width: 26rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-left: 5rem;
`
const B = styled.div`
  grid-area: b;
`
const C = styled.div`
  grid-area: c;
  width: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50rem;
`
const D = styled.div`
  grid-area: d;
  height: 50rem;
  width: 70rem;
`
/**
 * Styled H1
 * padding: 2rem 0rem 2rem 1rem        ;
 * margin-left: 1rem;
 *  */

const Title = styled.h1`
  padding: 2rem 0rem 2rem 1rem;
  width: 40rem;
  margin-left: -5rem;
`
