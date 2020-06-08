import React, { FC, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { ArrowLeftS } from '@styled-icons/remix-line'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface IProps {
  label: string
  array: string[]
}

export const InfoCard: FC<IProps> = ({array, label}) => {
  const [position, setPosition] = useState<number>(0)
  const [direction, setDirection] = useState<string>('forward')

  const { length } = array

  return (
    <Wrapper>
      <Title>{label}</Title>
      <Content>
      </Content>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 10rem;
  width: 40rem;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`

const Title = styled.div`
  font-size: 1.6rem;
  color: #5a5758;
  padding: 2rem;
  text-transform: capitalize;
`
const Content = styled.div`
  font-size: 1.6rem;
  color: #5a5758;
  padding: 2rem;
`
const Selector = styled.div`
  font-size: 1.6rem;
  padding: 2rem;
  position: absolute;
  top: 16rem;
  left: 6rem;
  height: 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  width: 20rem;
  justify-content: space-around;
`
interface ICircle {
  selected: boolean
}

const Circle = styled.div<ICircle>`
  background: ${(props) => (props.selected ? '#5A5758' : '#dddddd')};
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:after {
    content: '';
    height: 2rem;
    width: 2rem;
    background: green;
  }
`

const ArrowLeft = styled(ArrowLeftS)`
  height: 2.2rem;
  width: 2.2rem;
  color: #c8c7c7;
  cursor: pointer;
`

const ArrowRight = styled(ArrowLeftS)`
  height: 2.2rem;
  width: 2.2rem;
  color: #c8c7c7;
  cursor: pointer;
  transform: rotate(180deg);
`
const Text = styled.h3`
  position: absolute;
  top: 5rem;
  left: 2rem;
`
