import React, { FC } from "react"
import styled from "styled-components"
import { AddButton } from "view/components/buttons/AddButton"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface IProps {
  optionArray: string[]
  value: number
  handleChange: any
  title?: string
  labelArray?: string[]
  addNew?: () => null
}

export const Selector: FC<IProps> = ({ handleChange, value, addNew, optionArray, title, labelArray }) => {

  return (
    <Wrapper value={value} optionArray={optionArray}>
      <Title>{title ? title : null}</Title>
      <TransitionGroup1>
        {optionArray.map((option,i) => (
          <CSSTransition key={i} timeout={300} classNames={`transition`}>
            <Number selected={i === value} onClick={() => handleChange(i+1)}>
              {option}
              <SelectionTitle>{labelArray[i]}</SelectionTitle>
            </Number>
          </CSSTransition>
        ))}
      </TransitionGroup1>

      <AddWrapper>
        <AddButton
          handleChange={() => {
            handleChange(value+1)
            addNew()}
          }
        />
      </AddWrapper>
      <Pill value={value} optionArray={optionArray} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface PProps {
  value: string | number
  optionArray: string[]
}

const TransitionGroup1 = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 3rem;
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
`
interface NProps {
  selected: boolean
}

const Number = styled.div<NProps>`
  height: 7rem;
  width: 7rem;
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
  top: -5rem;
`
const SelectionTitle = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-weight: 200;
  border-top: 0.4px solid grey;
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
        min-width: 7rem;
        height: 7rem;
        margin-top: 3rem;
        left: -9rem;
        border-radius: 10px;
        background: ${props => props.theme.color.background};
        ${props => props.theme.neomorph};
        transform: ${props => `translate(${(+props.value) * 9}rem, 0)`};
        transition: all .3s ease;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
