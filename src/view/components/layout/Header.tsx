import React, { FC } from "react"
import styled from "styled-components"
import logo from "data/assets/logo.svg"
import { LinkButton, ManageRedux } from "view/components"
import { Link } from "react-router-dom"
import * as I from "model/types"
import { ArrowRightS } from "@styled-icons/remix-line"

interface IProps {
  set: I.set
  state: I.state
}

export const Header: FC<IProps> = ({ set, state }) => {
  const { token } = state.auth_reducer
  const options = token ? ["plan", "account"] : ["product", "pricing", "about"]

  return (
    <Wrapper>
      <Logo>
        <img src={logo} height="100%" width="100%" alt="logo" />
      </Logo>
      <ManageRedux />
      <Nav>
        {options.map((string, i) => (
          <Option to={`/${string}`} key={i} onClick={() => null}>
            {string}
            <Arrow></Arrow>
          </Option>
        ))}
      </Nav>
      <Login>
        {token ? (
          <LinkButton link="/" label="Log Out" handleChange={() => set("token", "auth_reducer", null)} />
        ) : (
          <LinkButton link="/login" label="Get Started" handleChange={() => null} />
        )}
      </Login>
    </Wrapper>
  )
}


//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 6.5rem;
  width: 100%;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  position: relative;
`
const Logo = styled.div`
  height: 7.5rem;
  position: absolute;
`
const Login = styled.div`
  position: absolute;
  right: 2rem;
  top: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 23rem;
  font-weight: 600;
`
const H3 = styled(Link)`
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  color: grey;
  font-size: 1.6rem;
`
const Nav = styled.div`
  display: flex;
  height: 100%;
  width: 40rem;
  padding: 2rem;
  margin: 0px;
  margin-left: 5rem;
  padding: 0px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: 28rem;
  margin: 0 auto;
`

const Arrow = styled(ArrowRightS)`
  margin-top: 0.3rem;
  width: 2rem;
  height: 2rem;
  color: grey;
  transform: rotate(0deg);
  transition: all 0.2s ease;
`
const Option = styled(Link)`
  position: relative;
  min-width: 7rem;
  transition: all 2s ease;
  text-align: center;
  z-index: 1;
  transition: all 100ms linear 0s;
  margin: 0px;
  border-radius: 2.5rem;
  text-transform: Capitalize;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  &:hover ${Arrow} {
    transform: rotate(90deg);
    transition: all 0.2s ease;
  }
  text-decoration: none;
  color: ${props => props.theme.color.darkGrey};
`
