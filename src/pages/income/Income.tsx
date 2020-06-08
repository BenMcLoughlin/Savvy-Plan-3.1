import React, { FC } from 'react'
import styled from 'styled-components'
import { EditCard, UserIncomeChart } from 'HOC/connectRedux_HOC'
import { AddButton } from 'components/buttons/AddButton'
import { createStream } from 'services/ui_functions'
import { newIncomeStream } from 'services/ui_functions'

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

export const Income: FC<IProps> = ({ state, setValue_action }) => {
  const { main_reducer, ui_reducer } = state
  const { selectedId } = ui_reducer //when an income instance is clicked on it's it is placed in the ui_reducer for all components to have access to it
  const instance = main_reducer[selectedId] //instance refers the object being displayed, for example Wal mart income

  const { birthYear } = state.user_reducer

  const newStream = newIncomeStream('#00BDD3', 'Employment', 'Wal Mart Income', 0, true, +birthYear + 18, 15000, +birthYear + 40)

  return (
    <Wrapper>
      <UserIncomeChart />
      {selectedId ? (
        <EditCard {...instance} />
      ) : (
        <Dialogue>
          <AddPrompt>
            <AddButton
              onClick={() => {
                createStream(newStream, setValue_action, 'income')
              }}
            />{' '}
            <p>Add a new income stream</p>
          </AddPrompt>
          <h4>Or click on a bar in the chart if you would like to edit that income stream.</h4>
        </Dialogue>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100rem;
  width: 70rem;
`
const Dialogue = styled.div`
  width: 60rem;
  height: 10rem;
  text-align: center;
  margin-left: 5rem;
  margin-top: 6rem;
`

const AddPrompt = styled.div`
  width: 33rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: underline;
  line-height: 2rem;
`
