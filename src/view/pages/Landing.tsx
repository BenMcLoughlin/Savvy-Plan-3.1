import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group"
import { LinkButton } from "view/components"
import { Chart } from "view/charts/Chart"
import image from "data/assets/dashboard.png"
import { Section, Row, P, H1, H2 } from "model/styles/Styled-Components"
import { introduction } from "model/utils/charts/format"
import * as I from "model/types"

interface IProps {
  state: I.state
  set: any
}

export const Landing: FC<IProps> = ({ state, set }) => {
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
      <Section height={50} marginTop={13}>
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
        <PositionButton>
          <LinkButton link="/login" label="Get Started" handleChange={() => null} />
        </PositionButton>
        <PositionChart>
          <Chart
            set={set}
            state={state}
            color_selector={"red"}
            chartName={"landingSavings"}
            chartType={"area"}
            chartSize={"cover"}
            getChartData={introduction}
          />
        </PositionChart>
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
const PositionButton = styled.div`
  position: absolute;
  left: 15rem;
  top: 25rem;
  z-index: 1000;
`
const PositionChart = styled.div`
  position: absolute;
  left: 0rem;
  top: 25rem;
  height: 40rem;
  width: 120rem;
`

interface IScroll {
  scrollPercentage: number
  scrollMax: number
}
