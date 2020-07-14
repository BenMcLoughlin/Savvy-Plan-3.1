import React, { FC, useEffect } from "react"
import styled from "styled-components"
import * as charts from "charts"
import * as components from "components"
import { Questions } from "HOC/connectRedux_HOC"
import { InfoCard, SideNav, TripleSelector } from "components"
import { AddPrompt } from "components/buttons/AddPrompt"
import _ from "lodash"
import * as hardData from "data/questions/questions_data"
import { matchThenShowComponent } from "services/display_functions"

//DELETE BELOW
import { createStreamQuestionsArray } from "services/questions/createQuestionArray"

interface IProps {
  set: (id: string, reducer: string, value: any, childId?: string) => void
  remove: (id) => void
  state: any
  data: any
}

export const Display: FC<IProps> = ({ data, remove, set, state }) => {
  const { selectedId, newStream, selectedPage } = state.ui_reducer

  useEffect(() => {
    set("selectedId", "ui_reducer", "") //Sets the id in the ui_reducer to nothing when pages and changed, prevents errors with an edit income box being shown in the savings section etc.
    set("progress", "ui_reducer", 0)
  }, [data.page])

  const questionData = hardData[`${selectedPage}Data`] //each page has a function that recieves state and returns a large object with all the up to date values, this matches data with the selected page

  const instance = state.main_reducer[selectedId]

  if (instance) {
    const practiceClass = createStreamQuestionsArray(questionData, instance, set, state, remove, "display")
    console.log(practiceClass);
  }
  
  return (
    <Wrapper>
      <Title>Your Financial Plan</Title>
      <Nav>
        <SideNav handleChange={value => set("selectedPage", "ui_reducer", value)} value={selectedPage} options={["income", "savings", "taxes", "spending", "networth"]} />
      </Nav>
      <Content>
        <Chart>{matchThenShowComponent(charts, data, data.chart)}</Chart>
        <InfoCards>
          {data.infoCards.map(d => (
            <InfoCard key={d.label} label={d.label} array={d.array} />
          ))}
        </InfoCards>
        <Edit>
           {selectedId && newStream && <Questions data={createStreamQuestionsArray(questionData, instance, set, state, remove, "display")} />} 
          {data.editPeriod && matchThenShowComponent(components, data, data.editPanel)}
          {!selectedId && (
            <Left>
              <AddPrompt handleChange={() => data.createStream()} label={data.addButtonLabel} />{" "}
            </Left>
          )}
        </Edit>
        <CenterNav>
          {data.user2Name && <TripleSelector user1Name={"ben"} user2Name={"kelsey"} value={state.ui_reducer.selectedUser} handleChange={d => set("selectedUser", "ui_reducer", d)} />}
        </CenterNav>
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
  grid-area: a;
  display: flex;
`
const Content = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 30rem;
  display: grid;
  grid-template-columns: 80rem 30rem;
  grid-template-rows: 37rem 30rem;
  grid-template-areas:
    "a b"
    "c b";
`

const InfoCards = styled.div`
  grid-area: b;
  height: 50rem;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  flex-wrap: start;
  justify-content: space-around;
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
  top: 35rem;
  left: 50rem;
  width: 40rem;
  height: 4rem;
`
const Left = styled.h1`
  position: absolute;
  top: 5rem;
  left: 10rem;
`
const Title = styled.h1`
  position: absolute;
  padding: 2rem 0rem 2rem 1rem;
  width: 40rem;
  margin-left: 4rem;
`
const Nav = styled.div`
  position: absolute;
  top: 7rem;
  left: 3rem;
  width: 30rem;
  height: 70rem;
`
