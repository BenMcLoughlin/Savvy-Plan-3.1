import styled from "styled-components"
import React, { FC } from "react"

interface IProps {
  width?: number
  height?: number
  justify?: string
  fontSize?: number
}

export const P: FC<IProps> = (props, { props: children }) => {
  return <Wrapper {...props}>{children}</Wrapper>
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div<IProps>`
  display: flex;
  width: ${props => (props.width ? props.width + "rem" : "100%")};
  height: ${props => (props.height ? props.height + "rem" : "4rem")};
  font-size: ${props => (props.fontSize ? props.fontSize + "rem" : "1.6rem")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  line-height: 2.5rem;
  font-weight: 200;
`
