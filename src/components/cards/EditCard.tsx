import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { ColorSelect, Dropdown, EditTitle, ScrollCircles, Slider } from 'HOC/connectRedux_HOC'
import { Exit } from 'components/buttons/Exit'
import { AddButton } from 'components/buttons/AddButton'
import { addPeriodToStream } from 'services/ui_functions'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Trash2 } from '@styled-icons/feather/Trash2'
import _ from 'lodash'

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
  delete_action: (id: string) => void
}

export const EditCard: FC<IProps> = ({ delete_action, state, setValue_action }) => {
  const [position, setPosition] = useState<number>(0)

  const [direction, setDirection] = useState<string>('forward')

  const selectedId = state.ui_reducer.selectedId

  const instance = state.main_reducer[selectedId]

  const { id, reg, periods, taxable, year0, value0 } = instance

  const lastAge = instance[`yearLast`] - 1988
  
  return (
    <Wrapper>
      <Header>
        <ColorSelect id={id} reducer={'main_reducer'} childId={'color'} />
        <EditTitle id={id} reducer={'main_reducer'} childId={'name'} />
        <Dropdown
          array={['Employment Income', 'Business Income', 'Pension Income', 'Retirement Income', 'Non-Taxable Income']}
          id={id}
          label={'Type'}
          reducer={'main_reducer'}
          childId={'reg'}
        />
        <Exit onClick={() => setValue_action('selectedId', 'ui_reducer', '')} />
      </Header>
      <TransitionGroup>
        {_.range(periods + 1).map((d: any, i: number) => {
          const minYear = instance[`year${i - 1}`] ? instance[`year${i - 1}`] : 1990
          const selectedAge = instance[`year${i}`] - 1988
          return (
            i === position && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <TwoSliders>
                  <Slider
                    bottomLabel={`at age ${selectedAge}`}
                    childId={`year${i}`}
                    id={id}
                    max={2080}
                    min={minYear}
                    step={1}
                    title={'1'}
                    reducer={'main_reducer'}
                    type={'year'}
                    topLabel={i === 0 ? 'I started in' : 'It changed in'}
                  />
                  <Slider
                    bottomLabel={`Before taxes, per year`}
                    childId={`value${i}`}
                    id={id}
                    max={300000}
                    min={1000}
                    step={1000}
                    title={'1'}
                    reducer={'main_reducer'}
                    topLabel={i === 0 ? 'Earning' : 'To Earning'}
                  />
                </TwoSliders>
              </CSSTransition>
            )
          )
        })}
      </TransitionGroup>
      <LastSlider>
        <Slider
          bottomLabel={`At age ${lastAge}`}
          childId={'yearLast'}
          id={id}
          max={2080}
          min={1990}
          step={1}
          title={'1'}
          reducer={'main_reducer'}
          type={'year'}
          topLabel={'And ended in'}
        />
      </LastSlider>
      <ScrollCircles periods={periods + 1} setPosition={setPosition} setDirection={setDirection} position={position} />
      <Change>
        <AddButton
          onClick={() => {
            addPeriodToStream(instance, periods, id, setValue_action)
            setPosition(periods + 1)
          }}
        />
        Add a period where your income changed
      </Change>
      <Delete>
        <TrashIcon
          onClick={() => {
            setValue_action('selectedId', 'ui_reducer', '', '') // sets the seleted ID in the reducer to nothing so the box will no longer show                                                                                                         // determines which income instance to show within the edit box
            delete_action(id)
          }}
        />
      </Delete>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 25rem;
  width: 75rem;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 4rem;
  width: 100%;
  background-color: #73706e;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
`

const Change = styled.div`
  margin-top: 2rem;
  width: 30rem;
  height: 12rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  justify-content: space-around;
  position: absolute;
  top: 14rem;
  left: 29rem;
`
const TwoSliders = styled.div`
  display: flex;
  position: absolute;
  top: 5rem;
  left: 10rem;
  width: 40rem;
  justify-content: space-around;
`
const LastSlider = styled.div`
  width: 40rem;
  height: 20rem;
  position: absolute;
  left: 52rem;
  top: 5rem;
`
const TrashIcon = styled(Trash2)`
  height: 2.5rem;
  width: 2.5rem;
  color: #73706e;
`

const Delete = styled.div`
  height: 1.5rem;
  width: 4.5rem;
  position: absolute;
  top: 21rem;
  right: -1rem;
  font-size: 1.4rem;
  cursor: pointer;
  &:after {
    content: 'Delete';
    top: -2.5rem;
    right: 0.7rem;
    height: 2rem;
    width: 5rem;
    opacity: 0;
    position: absolute;
    transition: opacity 0.5s;
    z-index: 300000;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`
