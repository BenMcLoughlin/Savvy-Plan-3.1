import React, { FC } from 'react'
import styled from 'styled-components'
import { EditCard, UserIncomeChart, TripleSelector } from 'HOC/connectRedux_HOC'
import { AddButton } from 'components/buttons/AddButton'
import { createStream } from 'services/ui_functions'
import { newIncomeStream } from 'services/ui_functions'
import { InfoCard } from 'components/cards/InfoCard'
import { incomeInsights_data, incomeActionSteps_data, howThisWorks_data } from 'data/income_data'

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

export const Income: FC<IProps> = ({ state, setValue_action }) => {
  const { main_reducer, ui_reducer } = state
  const { selectedId } = ui_reducer //when an income instance is clicked on it's it is placed in the ui_reducer for all components to have access to it
  const instance = main_reducer[selectedId] //instance refers the object being displayed, for example Wal mart income

  const { birthYear, maritalStatus } = state.user_reducer

  const newStream = newIncomeStream('#00BDD3', 'Employment', 'Wal Mart Income', 0, true, +birthYear + 18, 15000, +birthYear + 40)

  const incomeInsights = incomeInsights_data(state, setValue_action)
  const incomeActionSteps = incomeActionSteps_data(state, setValue_action)
  const howThisWorks= howThisWorks_data(state, setValue_action)

  return (
    <Wrapper>
      <A>
        <UserIncomeChart />
      </A>
      <B>
        <InfoCard label={'insights'} array={incomeInsights} />
        <InfoCard label={'action steps'} array={incomeActionSteps} />
        <InfoCard label={'how this works'} array={howThisWorks} />
      </B>
      <C>
        {selectedId ? (
          <EditCard {...instance} />
        ) : (
            <AddPrompt>
              <AddButton
                onClick={() => {
                  createStream(newStream, setValue_action, 'income')
                }}
              />
              <p>New income stream</p>
            </AddPrompt>
        )}
      </C>
      <CenterNav>{maritalStatus === 'married' && <TripleSelector id={'selectedUser'} reducer={'ui_reducer'} />}</CenterNav>
      <Text>
        <h3 style={{ fontWeight: 'bold' }}>Why this matters</h3>
        <h4>
          This chart shows your all the different sources that make up your income. In order to retire you'll need to replace your working
          income with passive income streams like pension income or investment income.
        </h4>
      </Text>
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
    'a b'
    'c b';
`
const A = styled.div`
  grid-area: a;
  display: flex;
`
const B = styled.div`
  grid-area: b;
  height: 70rem;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  flex-wrap: start;
  justify-content: space-around;
`
const C = styled.div`
  grid-area: c;
  display: flex;
  justify-content: center;
`

const AddPrompt = styled.div`
  display: flex;
  width: 16rem;
  display: flex;
  justify-content: space-between;
  margin-left: -50rem;
`
const CenterNav = styled.h1`
  position: absolute;
  top: 38rem;
  left: 52rem;
  width: 40rem;
  height: 4rem;
`
const Text = styled.div`
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  position: absolute;
  left: 10rem;
  top: 45rem;
`
