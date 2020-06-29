import React, { FC, useEffect } from "react"
import styled from "styled-components"
import { ArrowRightCircle } from "@styled-icons/remix-fill/ArrowRightCircle"

interface IProps {
  setDirection: (value: string) => void
  onClick: (setDirection: any, valid: boolean) => null
  valid: boolean
}

export const Next: FC<IProps> = ({ onClick, setDirection, valid}) => {

  useEffect(() => {
    const pressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        console.log('hello enter was pressed');
        onClick(setDirection, valid)
      }
      if (valid) {
      window.addEventListener("keydown", pressEnter)
      return () => window.removeEventListener("keydown", pressEnter)
    }
  }}, [])

  return (
    <Wrapper>
      <ArrowRight valid={valid} onClick={() => onClick(setDirection, valid)} />
      {valid && <p>Press Enter</p>}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  top: 45%;
  right: 4%;
`

interface ArrowProps {
  valid: boolean
}
const ArrowRight = styled(ArrowRightCircle)<ArrowProps>`
  color: ${props => (props.valid ? "#9AC0CD" : "#C8C7C7")};
  cursor: ${props => (props.valid ? "pointer" : null)};
  height: 7.2rem;
  width: 7.2rem;
`
