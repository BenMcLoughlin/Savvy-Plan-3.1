import React, { useState, FC } from "react"
import styled from "styled-components"
import { TextInput, Button, SocialMediaIcons } from "view/components"
import * as C from "view/components"
import * as I from "model/types"
import { CSSTransition } from "react-transition-group"
import { useForm, useHttpClient } from "view/hooks"
import { validateSignUpErrors } from "model/services"
import { Redirect } from "react-router-dom"

interface IProps {
  set: I.set
  state: I.state
}

export const Login: FC<IProps> = ({ set, state }) => {
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)

  const userWantsTo = isNewUser ? "signup" : "login"

  const { token } = state.auth_reducer

  const { sendRequest } = useHttpClient(set)

  const { formData, setForm } = useForm("email", "password", "passwordConfirm")
  const { email, password, passwordConfirm } = formData

  const noErrors = validateSignUpErrors(state)

  const handleSubmit = async e => {
    e.preventDefault()
    if (noErrors) {
      const res = await sendRequest(`http://localhost:5000/api/users/${userWantsTo}`, "POST", JSON.stringify(formData), {
        "Content-Type": "application/json",
      })
      // if (isNewUser)
      //   await sendRequest(`http://localhost:5000/api/store/create`, "POST", JSON.stringify(state), {
      //     "Content-Type": "application/json",
      //   })
      set("token", "auth_reducer", res.token)
    }
  }

  if (token) {
    return <Redirect to="/onboarding" />
  }

  return (
    <PageSize>
      <Wrapper>
        <Left>
          <H2>Welcome to Savvy Plan ben@hotmail.com</H2>
          <Div>
            I am a...{" "}
            <C.DualSelect handleChange={() => setIsAdvisor(true)} handleChange2={() => setIsAdvisor(false)} option1={"financial Advisor"} option2={"Not an advisor"} value={isAdvisor} />
          </Div>
          <Div>
            And I'd like to.. <C.DualSelect handleChange={() => setIsNewUser(true)} handleChange2={() => setIsNewUser(false)} option1={"sign up"} option2={"sign in"} value={isNewUser} />
          </Div>
        </Left>
        <Form onSubmit={e => handleSubmit(e)}>
          <TextInput label="email" handleChange={setForm} name={"email"} value={email} type="text" />
          <TextInput label="password" handleChange={setForm} name={"password"} value={password} type="password" />
          <CSSTransition in={isNewUser} mountOnEnter unmountOnExit timeout={700} classNames="fade-in">
            <TextInput label="confirm password" handleChange={setForm} name={"passwordConfirm"} value={passwordConfirm} formData={formData} type="password" />
          </CSSTransition>
          <LowerWrapper isNewUser={isNewUser}>
            <Button type="submit" label={userWantsTo} handleChange={() => null} />
            <p>{`Or ${userWantsTo} with...`}</p>
            <SocialMediaIcons handleChange={() => null} />
            <ButtonAsText>Forgot Password?</ButtonAsText>
            {/* {errors.length > 0 && errors.map((error, i) => <Error i={i}>wrong email easdf and bars</Error>)} */}
          </LowerWrapper>
        </Form>
      </Wrapper>
    </PageSize>
  )
}

//-----------------------------------------------style-----------------------------------------------//

interface IError {
  i: number
}

const Error = styled.div<IError>`
  position: absolute;
  bottom: 24rem;
  width: 30rem;
  left: 0rem;
  height: 10rem;
  color: ${props => props.theme.color.salmon};
`

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
  height: 8rem;
  justify-content: space-between;
  width: 33rem;
  margin-top: 2rem;
`
const Left = styled.h2`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40rem;
  width: 50%;
`
const Form = styled.form`
  font-size: 1.6rem;
  position: absolute;
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  flex-wrap: start;
  flex-wrap: start;
  align-items: center;
  height: 35rem;
  width: 50%;
  position: relative;
  > * {
    margin-top: 2rem;
  }
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
  top: 27rem;
  transform: ${props => (props.isNewUser ? "translate(0,10rem)" : "translate(0,0)")};
  transition: all ease 0.4s;
  font-size: 1.6rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
