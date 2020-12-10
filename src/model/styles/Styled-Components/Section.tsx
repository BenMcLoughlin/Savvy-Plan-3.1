import styled from "styled-components"
import React, { FC } from "react"

interface IProps {
  width?: number
  height?: number
  justify?: string
  marginTop?: number
}

export const Section: FC<IProps> = props => {
  return <Wrapper {...props}>{props.children}</Wrapper>
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div<IProps>`
  display: flex;
  width: ${props => (props.width ? props.width + "rem" : "100%")};
  height: ${props => (props.height ? props.height + "rem" : "100%")};
  margin-top: ${props => (props.marginTop ? props.marginTop + "rem" : "0")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
`
