import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group"
import { LinkButton } from "view/components"
import * as I from "model/types"
import { SavingsChart } from "view/charts"
import image from "data/assets/dashboard.png"
import { Section, Row, P, H1, H2 } from "model/styles/Styled-Components"
import "./dummyTooltipCSS.css"

interface IProps {
  set: I.set
  state: I.state
  remove: I.remove
}

export const LandingPage: FC<IProps> = ({ remove, state, set }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollMax, setScrollMax] = useState(0)

  const [enter, setEnter] = useState(false)

  useEffect(() => {
    setEnter(true)
    window.addEventListener("scroll", () => setScrollPosition(window.scrollY))
    window.addEventListener("scroll", () => setScrollMax(window.innerWidth))
  }, [])

  return (
    <Wrapper>
      <Section height={90}>
        <Title enter={enter}>
          <CSSTransition in={enter} timeout={2000} classNames={`transition-forward`}>
            <H1>See your financial future</H1>
          </CSSTransition>
          <CSSTransition in={enter} timeout={2000} classNames={`transition-back`}>
            <SubTitle>
              <H2>We do the math you make the decisions</H2>
              <Row width={40}>
                <LinkButton link="/login" label="Get Started" />
                <LinkButton link="/login" label="I'm an Advisor" />
              </Row>
            </SubTitle>
          </CSSTransition>
        </Title>
        <Chart>
          <SavingsChart useExampleState={true} />
        </Chart>
      </Section>
      <Section height={80}>
        <Screen scrollPercentage={scrollPosition / scrollMax} scrollMax={scrollMax}></Screen>
        <SlideInDiv scrollPercentage={scrollPosition / scrollMax} scrollMax={scrollMax}>
          <div>Redefining Financial Planning</div>
          <P fontSize={1.6}>We help you answer one question: are you ok financially? </P>
          <LinkButton link="/login" label="Learn More" />
        </SlideInDiv>
      </Section>
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

const Title = styled.div<Ienter>`
  display: ${props => (props.enter ? "visible" : "hidden")};
  position: absolute;
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
const Chart = styled.div`
  position: absolute;
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
  position: absolute;
  margin-top: -14rem;
  margin-left: 41%;
  border: 10px solid ${props => props.theme.color.darkGrey};
  height: ${props => (props.scrollPercentage < 0.5 ? props.scrollPercentage * 77 + "rem" : 0.025 * props.scrollMax + "rem")};
  width: ${props => (props.scrollPercentage < 0.5 ? props.scrollPercentage * 128 + "rem" : 0.042 * props.scrollMax + "rem")};
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
  position: absolute;
  top: 80rem;
  left: 0rem;
  transform: ${props => (props.scrollPercentage < 0.5 ? "translate(-90rem, 0)" : "translate(0, 0)")};
  transition: all ease 1s;
  font-weight: bold;
`
