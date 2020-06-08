import React, { FC } from 'react'
import styled from 'styled-components'
import { SideNav, Income } from 'HOC/connectRedux_HOC'


interface IProps {
  state: any
}

export const Layout: FC<IProps> = ({ state }) => {
  const maritalStatus = state.user_reducer

  return (
    <Wrapper>
      <Title>Your Financial Plan</Title>
      <Nav>
      <SideNav id={'selectedPage'} reducer={'ui_reducer'} />
      </Nav>
    < Content>
    <Income />
    </Content>

    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 60rem;
  width: 150rem;
  display: flex;
`
const Content = styled.div`
  width: 80rem;
`
const Title = styled.h1`
  position: absolute;
  padding: 2rem 0rem 2rem 1rem;
  width: 40rem;
  margin-left: 4rem;
`
const Nav = styled.h1`
 margin-top: 10rem;
 width: 30rem;
 height: 70rem;
`
