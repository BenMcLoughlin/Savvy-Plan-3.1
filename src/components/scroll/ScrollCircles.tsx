import React, { FC, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { ArrowLeftS } from '@styled-icons/remix-line'

interface IProps {
  periods: number
  position: number
  setPosition: (position: number) => void
  setDirection: (direction: string) => void
}

export const ScrollCircles: FC<IProps> = ({periods, position, setPosition,  setDirection}) => {

  return (
    <Wrapper>
      <ArrowLeft
        onClick={() => {
          setPosition(position > 0 ? position - 1 : 0)
          setDirection('back')
        }}
      />
      {_.range(1, periods + 1).map((d, i) => (
        <Circle selected={i === position} onClick={() => setPosition(i)} />
      ))}
      <ArrowRight
        onClick={() => {
          setPosition(position < periods ? position + 1 : periods - 1)
          setDirection('forward')
        }}
      />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  font-size: 1.6rem;
  padding: 2rem;
  position: absolute;
  top: 20rem;
  left: 8rem;
  height: 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  width: 20rem;
  justify-content: space-around;
`

const ScrollLabel = styled.div`
  font-size: 1.2rem;
  position: absolute;
  left: 14rem;
  bottom: 0.5rem;
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
