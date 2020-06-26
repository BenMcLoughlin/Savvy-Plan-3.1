import React, { FC } from "react"
import styled from "styled-components"
import * as components from "HOC/connectRedux_HOC"
import _ from "lodash"
import { TextInput } from "HOC/connectRedux_HOC"

/**
 * <OnboardWizard> is being rendered for each piece of the array selected to be shown in the parent component. It is being passed props
 *  */

export const OnboardWizard: FC<any> = props => {
  const { id, title, component, subTitle, state, setProgress } = props
  const renderComponent = () => {
    const Component = components[component]
    return <Component {...props} setProgress={setProgress} />
  }

  return (
    <Wrapper>
      <Header>
        <H2>{title}</H2>
        <h3>{subTitle}</h3>
      </Header>
      <Content>
        {renderComponent()}
        {id === "numberOfChildren" ? (
          <Children>
            {_.range(1, state.user_reducer.numberOfChildren + 1).map(d => (
              <TextInput id={`child${d}BirthYear`} reducer="user_reducer" type="year" label={`child${d}BirthYear`} />
            ))}
          </Children>
        ) : null}
      </Content>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  height: 80%;
  width: 100%;
  flex-direction: column;
  position: absolute;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8%;
  margin-left: 25%;
`

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2%;
`

const Children = styled.div`
  min-height: 40rem;
  width: 30rem;
  display: flex;
  flex-wrap: start;
  flex-direction: column;
  position: absolute;
  top: 8rem;
`
const H2 = styled.h2`
  margin-bottom: 2rem;
`
