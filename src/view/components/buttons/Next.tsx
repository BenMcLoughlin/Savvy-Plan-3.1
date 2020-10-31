import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline"
import { CSSTransition } from "react-transition-group"

interface IProps {
  setDirection: (value: string) => void
  handleChange: (setDirection: any, valid: boolean) => void
  nextHandleChange?: () => void //this allows a specific instance of the wizard to attach a special handle change when the next button is clicked. Prepares the state for the next
  valid: boolean
  state: any
}

export const Next: FC<IProps> = ({ handleChange, nextHandleChange, setDirection, valid, state }) => {

  useEffect(() => {
    const pressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleChange(setDirection, valid)
        if (nextHandleChange) nextHandleChange()
      }
    }
    if (valid) {
      window.addEventListener("keydown", pressEnter)
      return () => window.removeEventListener("keydown", pressEnter)
    }
  }, [handleChange, nextHandleChange, setDirection, valid, state])

  return (
    <Wrapper>
      <CSSTransition in={valid} mountOnEnter unmountOnExit timeout={700} classNames="fade-in">
        <Circle valid={valid}>
          <ArrowRight
            valid={valid}
            onClick={() => {
              setDirection("forward")
              handleChange(setDirection, valid)
              if (nextHandleChange) nextHandleChange()
            }}
            id="nextButton"
          />
          <P>Press Enter</P>
        </Circle>
      </CSSTransition>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface validProps {
  valid: boolean
}

const Wrapper = styled.div`
  position: absolute;
  top: 18rem;
  right: 8rem;
`

const Circle = styled.div<validProps>`
  border-radius: 50%;
  background: ${props => props.theme.color.background};
  background: ${props => (props.valid ? props.theme.color.background : "white")};
  ${props => props.theme.neomorph};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7.2rem;
  width: 7.2rem;
`

interface validProps {
  valid: boolean
}
const ArrowRight = styled(ArrowIosForwardOutline)<validProps>`
  cursor: ${props => (props.valid ? "pointer" : null)};
  height: 4.2rem;
  width: 4.2rem;
  color: ${props => props.theme.color.darkGrey};
`
const P = styled.p`
  position: absolute;
  margin-top: 13rem;
  left: 0.6rem;
  width: 12rem;
  font-size: ${props => props.theme.fontSize.small};
`
