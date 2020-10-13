import React, { FC, useState } from "react"
import styled from "styled-components"
import _ from "lodash"
import { AddButton } from "view/components/buttons/AddButton"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface IProps {
  value: number
  handleChange: any
}

export const PickNumber: FC<IProps> = ({ handleChange, value }) => {
  const [topNumber, setTopNumber] = useState<number>(4)

  const optionArray = _.range(1, topNumber)

  return (
    <Wrapper value={value} optionArray={optionArray}>
      <TransitionGroup1>
        {optionArray.map(number => (
          <CSSTransition key={number} timeout={300} classNames={`transition`}>
            <Number selected={number === value} onClick={() => handleChange(number)}>
              {number}
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
  width: 55rem;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
`
interface NProps {
  selected: boolean
}

const Number = styled.div<NProps>`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.fontSize.smallMedium};
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
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
        border-radius: 50%;
        background: ${props => props.theme.color.background};
        ${props => props.theme.neomorph};
        transform: ${props => `translate(${(+props.value - 1) * 5}rem, 0)`};
        transition: all .3s ease;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`

// transform: ${props =>
//   props.selected === props.optionArray[0]
//     ? "translate(0,0)"
//     : props =>
//         props.selected === props.optionArray[1]
//           ? "translate(5rem,0)"
//           : props =>
//               props.selected === props.optionArray[2]
//                 ? "translate(10rem,0)"
//                 : props =>
//                     props.selected === props.optionArray[3] ? "translate(15rem,0)" : props => (props.selected === props.optionArray[4] ? "translate(20rem,0)" : "translateY(0%)")};
