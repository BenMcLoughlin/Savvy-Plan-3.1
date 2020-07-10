import React, { FC } from "react"
import styled from "styled-components"
import { Display } from "HOC/connectRedux_HOC"
import { SideNav } from "components"
import * as PageData from "data/pageData"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId?: any) => void
}

export const Layout: FC<IProps> = ({ state, set }) => {
  const { selectedPage } = state.ui_reducer

  const data = PageData[`${selectedPage}Page_data`] //each page has a function that recieves state and returns a large object with all the up to date values, this matches data with the selected page

  return (
    <Wrapper>
      <Title>Your Financial Plan</Title>
      <Nav>
        <SideNav handleChange={value => set("selectedPage", "ui_reducer", value)} value={selectedPage} options={["income", "savings", "taxes", "spending", "networth"]} />
      </Nav>
      <Content>
        <Display data={data(state, set)} /> {/*Display is the main page that shows all the info, it renders the data based on the selectedPage in the ui_reducder */}
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
