import React, { FC, useState } from "react"
import styled from "styled-components"
import _ from "lodash"
import { AddButton } from "components/buttons/AddButton"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface IProps {
  value: number
  handleChange: any
}

export const ScenarioSelector: FC<IProps> = ({ handleChange, value }) => {
  const [topNumber, setTopNumber] = useState<number>(4)

  const optionArray = _.range(1, topNumber)

  return (
    <Wrapper value={value} optionArray={optionArray}>
      <Title>Scenario</Title>
      <TransitionGroup1>
        {optionArray.map(number => (
          <CSSTransition key={number} timeout={300} classNames={`transition`}>
            <Number selected={number === value} onClick={() => handleChange(number)}>
              0{number}
              <SelectionTitle>Basic</SelectionTitle>
            </Number>
          </CSSTransition>
        ))}
      </TransitionGroup1>

      <AddWrapper>
        <AddButton
          handleChange={() => {
            setTopNumber(topNumber + 1)
          }}
        />
      </AddWrapper>
      <Pill value={value} optionArray={optionArray} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface PProps {
  value: string | number
  optionArray: number[]
}

const TransitionGroup1 = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
`

const Wrapper = styled.div<PProps>`
  height: 5rem;
  width: 35rem;
  display: flex;
  align-items: center;
  position: relative;
  top: 5rem;
  left: 12rem;
`
interface NProps {
  selected: boolean
}

const Number = styled.div<NProps>`
  height: 5rem;
  width: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;
  cursor: pointer;
  margin-right: 2rem;
  z-index: 1;
`

const Title = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 200;
  position: absolute;
  top: -2rem;
`
const SelectionTitle = styled.div`
  font-size: .9rem;
  font-weight: 200;
`

const AddWrapper = styled.div`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 5rem;
        height: 5rem;
        top: -4ren;
        left: 0rem;
        border-radius: 10px;
        background: ${props => props.theme.color.background};
        ${props => props.theme.neomorph};
        transform: ${props => `translate(${(+props.value - 1) * 7}rem, 0)`};
        transition: all .3s ease;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
