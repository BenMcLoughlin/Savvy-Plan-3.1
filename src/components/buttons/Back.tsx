import React, { FC } from "react"
import styled from "styled-components"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  setDirection?: (direction: string) => void
  handleChange: () => void
}

export const Back: FC<IProps> = ({ setDirection, handleChange}) => {

  return (
    <ArrowLeft
      onClick={() => {
        if (setDirection) {setDirection("back")}
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
  top: 15%;
  left: 8%;
`
