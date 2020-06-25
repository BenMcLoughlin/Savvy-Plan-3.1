import React, { FC, useState } from "react"
import styled from "styled-components"
import { MultiSliders } from "HOC/connectRedux_HOC"
import { ScrollCircles } from "HOC/connectRedux_HOC"
import { AddPrompt } from "components/buttons/AddPrompt"
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
  parent: string
}

export const TripleSliderSelector: FC<ISliderProps> = ({ addLabel, id, parent, periods, slidersArray, state, set }) => {
  const instance = state.main_reducer[id]
  const [position, setPosition] = useState<number>(0)

  const [direction, setDirection] = useState<string>("forward")
  console.log(slidersArray)
  return (
    <Wrapper parent={parent}>
      <TransitionGroup>
        {slidersArray.map(
          (d, i) =>
            i === position && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Center>
                  <MultiSliders {...d} />
                </Center>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <Change>
        <ScrollCircles periods={periods + 1} setPosition={setPosition} setDirection={setDirection} position={position} />
        <AddPrompt
          onClick={() => {
            addPeriodToStream(instance, periods, id, set)
            setPosition(periods + 1)
          }}
          label={"Add a period where it changed"}
        />
      </Change>
    </Wrapper>
  )
}

//-----------------------------------------------style-----------------------------------------------//

interface IWrapper {
  parent: string
}
const Wrapper = styled.div<IWrapper>`
  position: relative;
  width: 80rem;
  height: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Center = styled.div`
  position: absolute;
  display: flex;
  top: 2%;
  left: 10%;
`

const Change = styled.div`
  width: 47rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  justify-content: space-around;
  align-content: center;
  position: absolute;
  top: 70%;
  left: 20%;
`
