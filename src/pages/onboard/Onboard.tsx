import React, { FC, useState } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import { Comment } from "components/cards/Comment"
import { ProgressBar, Next, Back, OnboardWizard } from "HOC/connectRedux_HOC"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Redirect } from "react-router-dom"
import { Exit } from "components/buttons/Exit"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
  remove: (id: string) => void
  data: any
}

export const Onboard: FC<IProps> = ({ data, remove, state, set }) => {
  const { progress } = state.ui_reducer

  const [direction, setDirection] = useState<string>("forward")

  const { wizardType, wizardArray } = data

  const { length } = wizardArray

  if (progress === length) return <Redirect to="/plan" />

  const renderChart = chart => {
    const Chart = components[chart] //each page renders a unique chart, its name is provided by the props in string format. connectRedux_HOC holds all components so here it finds the chart to be rendered
    return <Chart {...data} />
  }

  return (
    <Wrapper>
      {wizardType === "onboard" ? (
        <>
          <ProgressBar length={length} progress={progress} />
          <Text>
            {progress > 0 ? <h3 style={{ fontWeight: "bold" }}>Why we Ask</h3> : null}
            <h4>{wizardArray[progress].ask}</h4>
          </Text>
        </>
      ) : (
        <Exit
          onClick={() => {
            set("selectedId", "ui_reducer", "")
            set("newStrem", "ui_reducer", "false")
          }}
        />
      )}
      <Content>
        <TransitionGroup>
          {wizardArray.map(
            (d: any, i: number) =>
              i === progress && (
                <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                  <OnboardWizard {...d} />
                </CSSTransition>
              )
          )}
        </TransitionGroup>
      </Content>
      {wizardArray[progress].chart ? (
        <Chart>
          {renderChart(wizardArray[progress].chart)}
          {wizardArray[progress].comment ? <Comment data={wizardArray[progress]} /> : null}
        </Chart>
      ) : null}
      <Back onClick={() => set("progress", "ui_reducer", progress > 0 ? progress - 1 : 1)} setDirection={setDirection} />
      <Next props={wizardArray[progress]} value={progress < length ? progress + 1 : length} setDirection={setDirection} progress={progress} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const Content = styled.div`
  height: 100%;
  width: 100%;
`
const Text = styled.div`
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  position: absolute;
  left: 10rem;
  top: 25rem;
`

const Chart = styled.div`
  position: absolute;
  top: 42rem;
  left: 32rem;
  height: 20rem;
`
