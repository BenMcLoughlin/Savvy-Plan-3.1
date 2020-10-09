import React, { FC, useState } from "react"
import styled from "styled-components"
import { AddPrompt, MultiSliders, ScrollCircles, Selector } from "components"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { P } from "styles/Styled-Components"

interface ISliderProps {
  addLabel: string
  num: number
  periods: number
  slidersArray: any
  handleChange: () => void
  handlePeriodChange: (value: number) => void
  period: number
  selectorProps: any
}

export const TripleSliderSelector: FC<ISliderProps> = ({ addLabel, periods, handleChange, handlePeriodChange, period, slidersArray, selectorProps }) => {
  const [direction, setDirection] = useState<string>("forward")

  return (
    <Wrapper>
      <TransitionGroup>
        {slidersArray.map(
          (d, i) =>
            i + 1 === period && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Center>
                  <MultiSliders key={i} {...d} />
                </Center>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <Change>
        <P fontSize={1.4}>{selectorProps.explainer}</P>
        <Selector {...selectorProps} />
        {/* <AddPrompt
          handleChange={() => {
            handleChange()
            handlePeriodChange(periods + 1)
          }}
          label={addLabel}
        /> */}
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
  height: 14rem;
  display: flex;
  position: absolute;
  top: 78%;
  left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
