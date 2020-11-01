import styled from "styled-components"
import React, { FC } from "react"

interface IProps {
  width?: number
  height?: number
  justify?: string
  fontSize?: number
  fontWeight?: number
  H?: number
}

export const H1: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={1} {...props}>
      {children}
    </Wrapper>
  )
}
export const H2: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={2} {...props}>
      {children}
    </Wrapper>
  )
}
export const H3: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={3} {...props}>
      {children}
    </Wrapper>
  )
}
export const H4: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={4} {...props}>
      {children}
    </Wrapper>
  )
}

export const P1: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={1} {...props}>
      {children}
    </Wrapper>
  )
}
export const P2: FC<IProps> = (props, {props: children}) => {
  return (
    <Wrapper H={2} {...props}>
      {children}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div<IProps>`
  display: flex;
  width: ${props => (props.width ? props.width + "rem" : "100%")};
  height: ${props => (props.height ? props.height + "rem" : "4rem")};
  font-size: ${props => (props.fontSize ? props.fontSize + "rem" : 4 / props.H + "rem")};
  justify-content: ${props => (props.justify ? props.justify : "space-around")};
  line-height: 2.5rem;
  font-size: ${props => (props.fontWeight ? props.fontWeight : "bold")};
`
