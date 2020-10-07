import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export interface IButton {
  label: string
  link: string
  danger?: boolean
  handleChange?: () => void
}

export const LinkButton: FC<IButton> = ({ danger, label, link, handleChange }) => (
  <Wrapper to={link} id="button" onClick={() => handleChange()} danger={danger}>
    {label}
  </Wrapper>
)

//---------------------------STYLES-------------------------------------------//

interface Props {
  danger?: boolean
}

const Wrapper = styled(Link)<Props>`
  height: 4.2rem;
  min-width: 14rem;
  max-width: 17rem;
  border-radius: 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: ${props => props.theme.fontSize.small};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in;
  ${props => props.theme.neomorph};
  background: ${props => (props.danger ? "grey" : props.theme.color.background )};
  color: ${props => props.danger ? "white" : "grey"};
  text-decoration: none;
  text-transform: capitalize;
`
