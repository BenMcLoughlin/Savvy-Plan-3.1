import React, { FC } from "react"
import styled from "styled-components"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  set: (id: string, reducer: string, value: any, childId?: string) => void
  setDirection: (direction: string) => void
  onClick: () => void
}

export const Back: FC<IProps> = ({ set, setDirection, onClick }) => {
  return (
    <ArrowLeft
      onClick={() => {
        setDirection("back")
        onClick()
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
  top: 10rem;
  left: 10rem;
`
