import React, { FC } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import { InfoCard, TripleSelector } from "HOC/connectRedux_HOC"
import { AddButton } from "components/buttons/AddButton"

interface IProps {
  data: any
}

export const Display: FC<IProps> = ({ data }) => {

  const renderChart = () => {
    const Chart = components[data.chart]
    return <Chart />
  }
  const renderUserEditForm = () => {
    const EditForm = components[data.userEditForm]
    return <EditForm {...data.editProps} />
  }

  return (
    <Wrapper>
      <Chart>{renderChart()}</Chart>
      <InfoCards>
        {data.infoCards.map(d => (
          <InfoCard key={d.label} label={d.label} array={d.array} />
        ))}
      </InfoCards>
      <Edit>{data.editProps ? renderUserEditForm() : 
                <AddPrompt>
                <AddButton onClick={() => data.createStream()}/>
                <p>{data.addButtonLabel}</p>
              </AddPrompt>
      }</Edit>
       <CenterNav>{data.spouseName && <TripleSelector id={"selectedUser"} reducer={"ui_reducer"} />}</CenterNav>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 80rem 30rem;
  grid-template-rows: 37rem 30rem;
  grid-template-areas:
    "a b"
    "c b";
`
const Chart = styled.div`
  grid-area: a;
  display: flex;
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
`

const AddPrompt = styled.div`
  display: flex;
  width: 18rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  margin-left: -50rem;
  font-weight: bold;
`
const CenterNav = styled.h1`
  position: absolute;
  top: 38rem;
  left: 52rem;
  width: 40rem;
  height: 4rem;
`
