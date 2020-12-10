import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import image from "data/assets/dashboard.png"
import { Section, Row, P, H1, H2 } from "model/styles/Styled-Components"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as u from "model/utils"
import * as components from "view/components"
import { landing_controller } from "controller/landing/landing_controller"

export const Landing: FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollMax, setScrollMax] = useState(0)
  const [progress, setPosition] = useState(1)
  const [direction, setDirection] = useState<string>("forward")

  const [enter, setEnter] = useState(false)

  const chartName = "hi"
  console.log("landing_controller:", landing_controller()[0])
  useEffect(() => {
    setEnter(true)
    window.addEventListener("scroll", () => setScrollPosition(window.scrollY))
    window.addEventListener("scroll", () => setScrollMax(window.innerWidth))
  }, [])

  return (
    <Wrapper>
      <TransitionGroup>
        {landing_controller().map(
          (data: any, i: number) =>
            i === progress && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Content>
                  <Header>
                    <h3>{data.subTitle}</h3>
                  </Header>
                  <Component chart={chartName}>
                    {u.matchThenShowComponent(components, data, data.component)}
                  </Component>
                </Content>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  min-height: 100%;
`

interface Ienter {
  enter: boolean
}

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

const Header = styled.div`
  position: absolute;
  top: -2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`

const Title = styled.div<Ienter>`
  display: ${props => (props.enter ? "visible" : "hidden")};
  progress: absolute;
  top: 12rem;
  left: 8rem;
  flex-direction: column;
  justify-content: space-around;
  height: 30rem;
  z-index: 100;
`
const SubTitle = styled.div`
  height: 14rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`

interface IComponent {
  chart?: string
}

const Component = styled.div<IComponent>`
  position: absolute;
  margin-top: ${props =>
    props.chart === "IncomeChart" ? "77rem" : props.chart ? "94rem" : "30rem"};
  left: 0rem;
  width: 80rem;
  justify-content: center;
  display: flex;
  height: 40rem;
`

const Chart = styled.div`
  progress: absolute;
  top: 25rem;
  left: 7rem;
  height: 60%;
  width: 100%;
`

interface IScroll {
  scrollPercentage: number
  scrollMax: number
}

const Screen = styled.div<IScroll>`
  progress: absolute;
  margin-top: -14rem;
  margin-left: 41%;
  border: 10px solid ${props => props.theme.color.darkGrey};
  height: ${props =>
    props.scrollPercentage < 0.5
      ? props.scrollPercentage * 77 + "rem"
      : 0.025 * props.scrollMax + "rem"};
  width: ${props =>
    props.scrollPercentage < 0.5
      ? props.scrollPercentage * 128 + "rem"
      : 0.042 * props.scrollMax + "rem"};
  border-radius: 10px;
  background-image: url(${image});
  background-size: contain;
`
const SlideInDiv = styled.div<IScroll>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40rem;
  width: 55rem;
  padding: 5rem;
  font-size: 3.6rem;
  progress: absolute;
  top: 80rem;
  left: 0rem;
  transform: ${props =>
    props.scrollPercentage < 0.5 ? "translate(-90rem, 0)" : "translate(0, 0)"};
  transition: all ease 1s;
  font-weight: bold;
`
