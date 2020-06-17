import React, { FC, useEffect } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import { InfoCard, TripleSelector } from "HOC/connectRedux_HOC"
import { AddButton } from "components/buttons/AddButton"

interface IProps {
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
  data: any
}

export const Display: FC<IProps> = ({ data, setValue_action }) => {

  useEffect(() => {
    setValue_action('selectedId', "ui_reducer", "") //Sets the id in the ui_reducer to nothing when pages and changed, prevents errors with an edit income box being shown in the savings section etc.
  }, [data.page])

  const renderChart = () => {
    const Chart = components[data.chart] //each page renders a unique chart, its name is provided by the props in string format. connectRedux_HOC holds all components so here it finds the chart to be rendered
    return <Chart {...data} />
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
      {
        <Edit>
          {data.editProps ? (
            renderUserEditForm()
          ) : (
            <AddPrompt>
              <AddButton onClick={() => data.createStream()} />
              <p>{data.addButtonLabel}</p>
            </AddPrompt>
          )}
        </Edit>
      }

      <CenterNav>{data.user2Name && <TripleSelector id={"selectedUser"} reducer={"ui_reducer"} />}</CenterNav>
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
