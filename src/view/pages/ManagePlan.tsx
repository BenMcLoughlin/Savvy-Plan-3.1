/* eslint-disable */
import React, { FC } from "react"
import styled from "styled-components"

import { AddPrompt, InfoCard, SideNav, TripleSelector, Selector, IncomeDisplay } from "view/components"

import * as I from "model/types"
import { store } from "index"

interface IProps {
  data: I.pages
}

export const ManagePlan: FC<IProps> = ({ data }) => {
  const { selectedId } = store.getState().ui_reducer

  const { addPrompt, chart, editPrompt, editPanel, infoCards, sideNav, scenarioNav, tripleSelector } = data

  return (
    <Wrapper>
      <Selector_ {...scenarioNav} />
      <Nav>
        <SideNav {...sideNav} />
      </Nav>
      <Content>
        <IncomeDisplay></IncomeDisplay>

        <InfoCards>
          <AddPrompt {...addPrompt} />
          <AddPrompt {...editPrompt} />
          <AddPrompt {...addPrompt} />
          <AddPrompt {...addPrompt} />
        </InfoCards>
        {/* <Edit>
          {selectedId ? (
            matchThenShowComponent(components, data, editPanel)
          ) : (
            <Left>
              <AddPrompt {...addPrompt} />
            </Left>
          )}
        </Edit> */}
        <CenterNav>{tripleSelector.user2Name && <TripleSelector {...tripleSelector} />}</CenterNav>
      </Content>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 60rem;
  width: 120rem;
  position: relative;
`
const Chart = styled.div`
  grid-area: c;
  display: flex;
  position: relative;
`
const Content = styled.div`
  height: 90rem;
  width: 90rem;
  margin-top: 7rem;
  margin-left: 30rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 80rem 40rem;
  grid-template-rows: 15rem 30rem;
  grid-template-areas:
    "a b"
    "c b";
`

const InfoCards = styled.div`
  grid-area: b;
  height: 50rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: start;
  > * {
    margin-top: 3rem;
  }
`

const Edit = styled.div`
  grid-area: c;
  display: flex;
  justify-content: center;
  width: 85rem;
  height: 10rem;
  margin-top: 1rem;
  margin-left: -5rem;
  position: relative;
`
const CenterNav = styled.h1`
  position: absolute;
  top: 52rem;
  left: 50rem;
  width: 40rem;
  height: 4rem;
`
const Left = styled.h1`
  position: absolute;
  top: 5rem;
  left: 10rem;
`
const Nav = styled.div`
  position: absolute;
  top: 14rem;
  left: 3rem;
  width: 30rem;
  height: 70rem;
`
const Selector_ = styled(Selector)`
  background: red;
`
