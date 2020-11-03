import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import * as components from "view/components"
import { ProgressBar, Next, Back } from "view/components"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { useHistory, Redirect } from "react-router-dom"
import { matchThenShowComponent } from "model/services/display_functions"
import * as I from "model/types"

interface IProps {
  set: I.set
  remove: I.remove
  state: I.state
  data: any
}

export const Questions: FC<IProps> = ({ data, state, set }) => {
  const { progress } = state.ui_reducer
  const [direction, setDirection] = useState<string>("forward")
  const { backButton, nextButton, questions } = data
  const { length } = questions
  const { explanation, backHandleChange, chart, nextHandleChange, showChart } = data.questions[progress]
  const history = useHistory()
  useEffect(() => {
    // saveStore()
    history.push(`/onboarding/${progress}`)
    window.addEventListener("popstate", () => {
      set("progress", "ui_reducer", +history.location.pathname.replace(/\D/g, ""))
    })
    // sendRequest(`http://localhost:5000/api/users/save`, "POST", JSON.stringify(state), {
    //   "Content-Type": "application/json",
    // })
  }, [progress, history])

  if (progress === length - 2) return <Redirect to="/plan" />

  return (
    <Wrapper>
      <ProgressBar length={length} progress={progress} />
      <Text>
        {progress > 0 && <h3 style={{ fontWeight: "bold" }}>Why we Ask</h3>}
        <h4>{explanation}</h4>
      </Text>
      <TransitionGroup>
        {questions.map(
          (data: any, i: number) =>
            i === progress && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Content>
                  <Header>
                    <H2 textLength={data.question.length}>{data.question}</H2>
                    <h3>{data.subTitle}</h3>
                  </Header>
                  <Component chart={chart}>{matchThenShowComponent(components, data, data.component)}</Component>
                </Content>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      {progress > 0 && <Back {...backButton} setDirection={setDirection} backHandleChange={backHandleChange} />}
      {showChart && <Chart>{matchThenShowComponent(components, data.questions[progress], chart)}</Chart>}
      <Next {...nextButton} nextHandleChange={nextHandleChange} setDirection={setDirection} />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%rem;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  position: absolute;
  margin-top: 10rem;
  margin-left: -40rem;
  height: 40rem;
  width: 70rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
interface IComponent {
  chart?: string
}

const Component = styled.div<IComponent>`
  position: absolute;
  margin-top: ${props => (props.chart === "IncomeChart" ? "77rem" : props.chart === "SavingsChart" ? "94rem" : "30rem")};
  left: 0rem;
  width: 80rem;
  justify-content: center;
  display: flex;
  height: 40rem;
`
const Chart = styled.div`
  position: absolute;
  top: 23rem;
  left: 28rem;
  width: 80rem;
  justify-content: center;
  display: flex;
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
  position: absolute;
  top: -2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`

interface IH2 {
  textLength?: number
}
const H2 = styled.h2<IH2>`
  margin-top: ${p => (p.textLength > 100 ? "-7rem" : "-4rem")};
  width: 80rem;
  line-height: 4.4rem;
`
// const TransitionGroup = styled(TransitionGroup)`
//   height: 80rem;
//   width: 100rem;
//   background: grey;
// `
