import React, { FC } from "react"
import styled from "styled-components"
import { ArrowDownLeft } from "@styled-icons/bootstrap/ArrowDownLeft"


export const Arrow: FC = () => {
  return (
    <ArrowLeft/>
  )
}

//---------------------------STYLES-------------------------------------------//

const ArrowLeft = styled(ArrowDownLeft)`
  height: 12.2rem;
  width: 12.2rem;
  color: grey;
  cursor: pointer;
  position: absolute;
  top: 8rem;
  left: -8rem;
`
