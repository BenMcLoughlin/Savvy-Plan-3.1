import React, { FC } from 'react'
import styled from 'styled-components'
import { SideNav, Income, Savings, Display } from 'HOC/connectRedux_HOC'
import {incomePage_data} from "data/pageData/incomePage_data"

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: any) => void
}

export const Layout: FC<IProps> = ({ state, setValue_action }) => {
  const {selectedPage} = state.ui_reducer

  return (
    <Wrapper>
      <Title>Your Financial Plan</Title>
      <Nav>
      <SideNav id={'selectedPage'} reducer={'ui_reducer'} />
      </Nav>
    < Content>
    {
      selectedPage === "income" ? <Display data={incomePage_data(state, setValue_action)}/> :
      selectedPage === "savings" ? <Savings/> :
      null
    }
 
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
