import React, { FC, useState, useEffect } from "react"
import * as I from "model/types"
import { DualSelect, PickString, Button } from "view/components"
import { Chart } from "view/charts/Chart"
import styled from "styled-components"
import * as format from "model/utils/charts/format"
import mockState from "data/mockState.json"

interface Props {
  state: I.state
  set: I.set
}

export const Pricing: FC<Props> = ({ state, set }) => {
  const [value, setValue] = useState<string>("")
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)

  useEffect(() => {
    console.log("format.income():", format.income(mockState))
  }, [])
  return (
    <Wrapper>
      <Left>
        <DualSelect
          handleChange={() => setIsAdvisor(true)}
          handleChange2={() => setIsAdvisor(false)}
          option1={"Financial Advisor"}
          option2={"single household"}
          value={isAdvisor}
        />
        <Card>
          <Text>
            <h2>1 Year License</h2>
          </Text>
          <Hr />
          <Row>
            <h3>Price</h3>
            <h3>{`${isAdvisor ? "$600" : "$50"}`}</h3>
          </Row>
          <Row>
            <h3>GST & PST</h3>
            <h3>{`${isAdvisor ? "$72" : "$5.40"}`}</h3>
          </Row>
          <Hr />
          <Row>
            <h2>Total</h2>
            <h3>{`${isAdvisor ? "$672" : "$55.40"}`}</h3>
          </Row>
          <Button label={"buy"} handleChange={() => null} />
        </Card>
      </Left>
      <ChartWrapper>
        <Chart
          chartName={"income"}
          state={state}
          set={set}
          chartType={"bar"}
          getChartData={format.income}
        />
      </ChartWrapper>
      <PickStringWrapper>
        <PickString value="income" handleChange={() => null} />
      </PickStringWrapper>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  text-align: center;
`

const Left = styled.div`
  position: absolute;
  top: 10rem;
  left: 10rem;
  height: 40rem;
  width: 50rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const Card = styled.div`
  height: 30rem;
  width: 40rem;
  padding: 2rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  ${props => props.theme.neomorph}
`

const Text = styled.div`
  height: 4rem;
`

const Hr = styled.div`
  width: 90%;
  height: 0.1rem;
  background: grey;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  width: 25rem;
  justify-content: space-between;
  align-items: center;
`

const ChartWrapper = styled.div`
  position: absolute;
  top: 23rem;
  left: 60rem;
  width: 70rem;
  height: 25rem;
  justify-content: center;
  display: flex;
`

const PickStringWrapper = styled.div`
  position: absolute;
  top: 15rem;
  left: 60rem;
  width: 70rem;
  height: 30rem;
  justify-content: center;
  display: flex;
`
