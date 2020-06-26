import React, { FC, useEffect } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import { InfoCard, TripleSelector, Onboard } from "HOC/connectRedux_HOC"
import { AddPrompt } from "components/buttons/AddPrompt"
import _ from "lodash"
import * as wizardData from "data/wizard"

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
    set("selectedId", "ui_reducer", "")
  }, [data.page])

  const renderChart = () => {
    const Chart = components[data.chart] //each page renders a unique chart, its name is provided by the props in string format. connectRedux_HOC holds all components so here it finds the chart to be rendered
    return <Chart {...data} />
  }
  const renderUserEditForm = () => {
    const EditForm = components[data.userEditForm]
    return <EditForm {...data} />
  }

  const newWizardArray = wizardData[`create${_.startCase(selectedPage)}Array`] //each page has a function that recieves state and returns a large object with all the up to date values, this matches data with the selected page

  const instance = state.main_reducer[selectedId]

  return (
    <Wrapper>
      <Chart>{renderChart()}</Chart>
      <InfoCards>
        {data.infoCards.map(d => (
          <InfoCard key={d.label} label={d.label} array={d.array} />
        ))}
      </InfoCards>
      <Edit>
        {selectedId && newStream && <Onboard data={newWizardArray(instance, set, state, remove, "display")} />}
        {data.editPeriod  && renderUserEditForm()} {/*if edit props has been set in the data, which is conditional to selectedId being true, then a edit box will appear */}
        {!selectedId && (
        <Left>
          <AddPrompt onClick={() => data.createStream()} label={data.addButtonLabel} />{" "}
        </Left>
      )}
      </Edit>
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
  width: 85rem;
  height: 10rem;
  margin-top: -5rem;
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
