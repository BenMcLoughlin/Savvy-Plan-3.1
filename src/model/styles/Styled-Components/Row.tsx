import styled from "styled-components"
import React, { FC } from "react"

interface IProps {
  width?: number
  justify?: string
}

export const Row: FC<IProps> = props => {
  return <Wrapper {...props}>{props.children}</Wrapper>
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div<IProps>`
  display: flex;
  flex-direction: row;
  width: ${props => (props.width ? props.width + "rem" : "100%")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
`
