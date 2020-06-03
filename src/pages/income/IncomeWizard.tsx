import React, { FC } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import {
  Button,
  CumulativeSelect,
  DualSelect,
  MultiSelect,
  NumberSelect,
  Slider,
  TextInput,
} from 'HOC/connectRedux_HOC'
import { newIncomeStream } from 'pages/income/data'
import { createStream, addPeriodToStream } from 'services/ui_functions'
import { colorArray_data } from 'styles/color_data'

/**
 * The <IncomeWizard> walks the user through adding details regarding their income. Its goal
 * is to store those details in the main reducer which then sends the data to build the chart.
 * It collects the info in a step by step question process created in the income_data function which returns an array of questions.
 * and is held in the parent component, Income. The function is mapped through and renders one
 * question at a time by matching the progress position with the array index from the income_data array. The wizard then
 * checks to see which component it received and renders the question accordingly.
 *  */

export const IncomeWizard: FC<any> = (props) => {
  const { id, title, component, subTitle, state, setValue_action } = props

  return (
    <Wrapper>
      <Header>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
      </Header>
      <Content>
        {component === 'Button' ? (
          <Button {...props} value={1} />
        ) : component === 'TextInput' ? (
          <TextInput {...props} />
        ) : component === 'MultiSelect' ? (
          <MultiSelect {...props} />
        ) : component === 'CumulativeSelect' ? (
          <CumulativeSelect array={['12']} {...props} />
        ) : component === 'DualSelect' ? (
          <DualSelect {...props} />
        ) : component === 'NumberSelect' ? (
          <NumberSelect {...props} />
        ) : component === 'Slider' ? (
          <Slider {...props} />
        ) : component === 'TwoSliders' ? (
          <Row>
            <Slider {...props.props1} />
            <Slider {...props.props2} />
          </Row>
        ) : null}
      </Content>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  width: 70rem;
  flex-direction: column;
  position: absolute;
  flex-wrap: start;
  top: 2rem;
  left: 3rem;
`
const Header = styled.div`
  height: 10rem;
  width: 70rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const Row = styled.div`
  display: flex;
  width: 40rem;
  justify-content: space-between;
`

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

const Children = styled.div`
  min-height: 40rem;
  width: 30rem;
  display: flex;
  flex-wrap: start;
  flex-direction: column;
  position: absolute;
  top: 15rem;
`
const Properties = styled.div`
  min-height: 40rem;
  display: flex;
  flex-wrap: start;
  flex-direction: column;
  position: absolute;
  top: 12rem;
  left: -2rem;
`
