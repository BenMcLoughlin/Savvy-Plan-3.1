import React, { FC } from "react"
import styled from "styled-components"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  state: any
  setDirection?: (direction: string) => void
  handleChange: () => void
  backHandleChange?: () => void //this allows a specific instance of the wizard to attach a special handle change when the next button is clicked. Prepares the state for the next
}

export const Back: FC<IProps> = ({ backHandleChange, setDirection, handleChange, state }) => {
  const { progress } = state.ui_reducer
  return (
    <ArrowLeft
      onClick={() => {
        if (setDirection) {
          setDirection("back")
        }
        if (backHandleChange) backHandleChange()
        handleChange()
      }}
    />
  )
}

//---------------------------STYLES-------------------------------------------//

const ArrowLeft = styled(ArrowLeftS)`
  height: 4.2rem;
  width: 4.2rem;
  color: #c8c7c7;
  cursor: pointer;
  position: absolute;
  top: 12rem;
  left: 8%;
`
