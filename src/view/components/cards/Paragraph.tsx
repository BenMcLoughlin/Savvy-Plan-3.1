import React, { FC } from "react"
import styled from "styled-components"

interface IProps {
  text: any
}

export const Paragraph: FC<IProps> = ({ text }) => {
  return <Wrapper>{text}</Wrapper>
}

//---------------------------STYLES-------------------------------------------//


const Wrapper = styled.div`
  height: 83em;
  width: 80rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  border-radius: 5px;
  position: absolute;
  padding: 1rem;
  font-size: 1.6rem;
  line-height: 2.6rem;
`

// top: `${props => props.top ? props.top : 0}rem`;
// left: `${props => props.left ? props.left : 0}rem`;
