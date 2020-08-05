import React, { FC, useState } from "react"
import styled from "styled-components"
import * as components from "components"
import { ProgressBar, Next, Back } from "components"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Redirect } from "react-router-dom"
import { Exit } from "components/buttons/Exit"
import { matchThenShowComponent } from "services/display_functions"
import { nextButtonProps, exitButtonProps, backButtonProps } from "services/questions/question_functions"
import * as I from "types"

interface IProps {
  set: I.set
  remove: I.remove
  state: I.state
  data: any
  parent: I.parent
}

export const Questions: FC<IProps> = ({ data, state, set, parent }) => {
  const { progress } = state.ui_reducer
  console.log("parent:", parent)
  const [direction, setDirection] = useState<string>("forward")

  const { streamType, questions } = data
  const { length } = questions

  const nextProps = nextButtonProps(progress, questions, state, set)
  const exitProps = exitButtonProps(set)
  const backProps = backButtonProps(progress, set)

  if (progress === length) return <Redirect to="/plan" />

  return (
    <Wrapper parent={parent}>
      {streamType === "Onboarding" ? (
        <>
          <ProgressBar length={length} progress={progress} />
          <Text>
            {progress > 0 ? <h3 style={{ fontWeight: "bold" }}>Why we Ask</h3> : null}
            <h4>{questions[progress].explanation}</h4>
          </Text>
        </>
      ) : (
        <Exit {...exitProps} />
      )}
      <TransitionGroup>
        {questions.map(
          (data: any, i: number) =>
            i === progress && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Question>
                  {
                    parent === "onboard" &&                   <Header>
                    <H2>{data.question}</H2>
                    <h3>{data.subTitle}</h3>
                  </Header>
                  }
                  <Content>{matchThenShowComponent(components, data, data.component)}</Content>
                </Question>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      {/* {questions[progress].chart ? (
        <Chart>
          {matchThenShowComponent(charts, data, data.chart)}
          {renderChart(questions[progress].chart)}
          {questions[progress].comment ? <Comment data={questions[progress]} /> : null}
        </Chart>
      ) : null} */}
      { progress > 0 && <Back {...backProps} setDirection={setDirection} /> }
      <Next {...nextProps} setDirection={setDirection} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//
interface IWrapper {
  parent: string
}

const Wrapper = styled.div<IWrapper>`
  height: 30rem;
  width: ${props => (props.parent === "display" ? "75rem" : "100%")};
  position: relative;
  background: ${props => (props.parent === "display" ? "white" : "none")};
  top: ${props => (props.parent === "display" ? "-2rem" : "0")};
  z-index: 200;

`
const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2%;
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8%;
  margin-left: 25%;
`
const H2 = styled.h2`
  margin-bottom: 2rem;
  width: 50rem;
`
const Question = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  flex-direction: column;
  position: absolute;
  top: 0rem;
`
