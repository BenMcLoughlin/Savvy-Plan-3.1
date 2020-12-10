import styled from "styled-components"
import React, { FC } from "react"

interface IProps {
  props: any
}

export const Column: FC<IProps> = ({children}) => {

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}


//---------------------------STYLES-------------------------------------------//
const Wrapper = styled.div`

`