import React, { FC, useState } from "react"
import styled from "styled-components"
import { MultiSliders } from "HOC/connectRedux_HOC"
import { ScrollCircles } from "HOC/connectRedux_HOC"
import { AddButton } from "components/buttons/AddButton"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { addPeriodToStream } from "services/ui_functions"
import _ from "lodash"
import { isNullOrUndefined } from "util"

interface ISliderProps {
  addLabel: string
  id: string
  num: number
  periods: any
  slidersArray: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
  state: any
}

export const TripleSliderSelector: FC<ISliderProps> = ({addLabel, id, periods, slidersArray, state, set }) => {
  const instance = state.main_reducer[id]
  const [position, setPosition] = useState<number>(0)

  const [direction, setDirection] = useState<string>("forward")

  return (
    <Wrapper>
      <TransitionGroup>
        {slidersArray.map(
          (d, i) =>
            i === position && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <TwoSliders>
                  <MultiSliders {...d} />
                </TwoSliders>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <ScrollCircles periods={periods + 1} setPosition={setPosition} setDirection={setDirection} position={position} />
      <Change>
        <AddButton
          onClick={() => {
            addPeriodToStream(instance, periods, id, set)
            setPosition(periods + 1)
          }}
        />
        {addLabel}
      </Change>
    </Wrapper>
  )
}

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  position: relative;
  width: 64rem;
  height: 12rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Change = styled.div`
  margin-top: 2rem;
  width: 23rem;
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
