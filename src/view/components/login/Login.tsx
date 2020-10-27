import React, { useState, FC } from "react"
import styled from "styled-components"
import { DualSelect, TextInput, LinkButton, SocialMediaIcons } from "view/components"
import * as C from "view/components"
import * as I from "model/types"
import { CSSTransition } from "react-transition-group"

interface IProps {
  set: I.set
  state: I.state
}

export const Login: FC<IProps> = ({ set, state }) => {
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)

  const userWantsTo = isNewUser ? "Sign Up" : "Login"
  return (
    <PageSize>
      <Wrapper>
        <Left>
          <H2>Welcome to Savvy Plan</H2>
          <Div>
            I am a...{" "}
            <C.DualSelect handleChange={() => setIsAdvisor(true)} handleChange2={() => setIsAdvisor(false)} option1={"financial Advisor"} option2={"Not an advisor"} value={isAdvisor} />
          </Div>
          <Div>
            And I'd like to.. <DualSelect handleChange={() => setIsNewUser(true)} handleChange2={() => setIsNewUser(false)} option1={"sign up"} option2={"sign in"} value={isNewUser} />
          </Div>
        </Left>
        <Right>
          <TextInput label="email" handleChange={() => null} value="hi" type="text" />
          <TextInput label="password" handleChange={() => null} value="hi" type="password" />
          <CSSTransition in={isNewUser} mountOnEnter unmountOnExit timeout={700} classNames="fade-in">
            <TextInput label="confirm password" handleChange={() => null} value="hi" type="password" />
          </CSSTransition>
          <LowerWrapper isNewUser={isNewUser}>
            <LinkButton link={isNewUser ? "/onboarding" : "/"} label={userWantsTo} handleChange={() => set("isLoggedIn", "auth_reducer", true)} />
            <p>{`Or ${userWantsTo} with...`}</p>
            <SocialMediaIcons handleChange={() => null} />
            <ButtonAsText>Forgot Password?</ButtonAsText>
          </LowerWrapper>
        </Right>
      </Wrapper>
    </PageSize>
  )
}

//-----------------------------------------------style-----------------------------------------------//

const PageSize = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  position: absolute;
  height: 60%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const H2 = styled.h2`
  font-size: 4.6rem;
`
const Div = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  height: 6rem;
  justify-content: space-between;
  width: 33rem;
`
const Left = styled.h2`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 35rem;
  width: 50%;
`
const Right = styled.h2`
  font-size: 1.6rem;
  position: absolute;
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  flex-wrap: start;
  align-items: center;
  min-height: 30rem;
  width: 50%;
  position: relative;
`
const ButtonAsText = styled.h2`
  font-size: 1.6rem;
  font-weight: 200;
`

interface Props {
  isNewUser: boolean
}
const LowerWrapper = styled.div<Props>`
  position: absolute;
  top: 19rem;
  right: 20rem;
  transform: ${props => (props.isNewUser ? "translate(0,10rem)" : "translate(0,0)")};
  transition: all ease 0.4s;
  margin-top: 4rem;
  font-size: 1.6rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
