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
  TextAndTwoSliders,
  TextInput,
} from 'HOC/connectRedux_HOC'

/**
 * <OnboardWizard> is being rendered for each piece of the array selected to be shown in the parent component. It is being passed props
 *  */

export const OnboardWizard: FC<any> = (props) => {
  const { id, title, component, subTitle, state } = props

  return (
    <Wrapper>
      <Header>
        <H2>{title}</H2>
        <h3>{subTitle}</h3>
      </Header>
      <Content>
        {component === 'Button' ? ( //As the array of wizard data is mapped through each item contains a component
          <Button {...props} />
        ) : component === 'TextInput' ? ( //If the component equals "TextInput" it will render a textbox and pass in props
          <TextInput {...props} />
        ) : component === 'MultiSelect' ? (
          <MultiSelect {...props} />
        ) : component === 'CumulativeSelect' ? (
          <CumulativeSelect {...props} />
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
        {id === 'numberOfChildren' ? (
          <Children>
            {_.range(1, state.user_reducer.numberOfChildren + 1).map((d) => (
              <TextInput
                id={`child${d}BirthYear`}
                reducer="user_reducer"
                type="year"
                label={`child${d}BirthYear`}
              />
            ))}
          </Children>
        ) : id === 'numberOfProperties' ? (
          <Properties>
            {_.range(1, state.user_reducer.numberOfProperties + 1).map((d) => (
              <TextAndTwoSliders />
            ))}
          </Properties>
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
  top: 20%;
  left: 25%;
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
const H2 = styled.h2`
 margin-bottom: 2rem;
`
