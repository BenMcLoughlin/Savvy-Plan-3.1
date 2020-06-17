import React, { FC, useState } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import { Comment } from "components/cards/Comment"
import { ProgressBar, Next, Back, OnboardWizard } from "HOC/connectRedux_HOC"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { onboard_data } from "data/wizard_data"
import { Redirect } from "react-router-dom"

interface IProps {
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId: string) => void
}

export const Onboard: FC<IProps> = ({ state, setValue_action }) => {
  const { progress } = state.ui_reducer

  const [direction, setDirection] = useState<string>("forward")

  const data = onboard_data(state, setValue_action, progress)

  const { length } = data

  if (progress === length) return <Redirect to="/plan" />

  const renderChart = chart => {
    const Chart = components[chart] //each page renders a unique chart, its name is provided by the props in string format. connectRedux_HOC holds all components so here it finds the chart to be rendered
    return <Chart {...data} />
  }

  return (
    <Wrapper>
      <ProgressBar length={length} progress={progress} />
      <Text>
        {progress > 0 ? <h3 style={{ fontWeight: "bold" }}>Why we Ask</h3> : null}
        <h4>{data[progress].ask}</h4>
      </Text>
      {progress}
      <Content>
        <TransitionGroup>
          {data.map(
            (d: any, i: number) =>
              i === progress && (
                <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                  <OnboardWizard {...d} />
                </CSSTransition>
              )
          )}
        </TransitionGroup>
      </Content>

      {data[progress].chart ? (
        <Chart>
          {renderChart(data[progress].chart)}
          {data[progress].comment ? <Comment data={data[progress]}/> : null }
        </Chart>
      ) : null}
      {progress > 0 && (
        <>
          <Back id="progress" reducer="ui_reducer" value={progress > 0 ? progress - 1 : 1} setDirection={setDirection} />
          <Next props={data[progress]} value={progress < length ? progress + 1 : length} setDirection={setDirection} progress={progress} />
        </>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
`
const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
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
