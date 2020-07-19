import React, { FC, useState } from "react"
import styled from "styled-components"
import { AddPrompt, MultiSliders, ScrollCircles } from "components"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface ISliderProps {
  addLabel: string
  num: number
  periods: number
  slidersArray: any
  handleChange: () => void
}

export const TripleSliderSelector: FC<ISliderProps> = ({ addLabel, periods, handleChange, slidersArray }) => {

  const [position, setPosition] = useState<number>(0)

  const [direction, setDirection] = useState<string>("forward")

  return (
    <Wrapper>
      <TransitionGroup>
        {slidersArray.map(
          (d, i) =>
            i === position && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Center>
                  <MultiSliders key={i} {...d} />
                </Center>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <Change>
        <ScrollCircles periods={periods + 1} setPosition={setPosition} setDirection={setDirection} position={position} />
        <AddPrompt
          handleChange={() => {
            handleChange()
            setPosition(periods + 1)
          }}
          label={addLabel}
        />
      </Change>
    </Wrapper>
  )
}

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  position: relative;
  width: 80rem;
  height: 22rem;
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
  height: 4rem;
  display: flex;
  position: absolute;
  top: 70%;
  left: 20%;
`
