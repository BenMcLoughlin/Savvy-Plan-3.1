import React, { useState, useEffect, FC } from "react"
import styled from "styled-components"
import { TextInput, Button, SocialMediaIcons } from "view/components"
import * as C from "view/components"
import * as I from "model/types"
import { CSSTransition } from "react-transition-group"
import { useForm, useHttpClient } from "view/hooks"
import { validateSignUpErrors } from "model/services"
import { Redirect } from "react-router-dom"
import { set } from "model/redux/actions"
import { store } from "index"

export const Login: FC = () => {
  const state = store.getState()
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)

  const userWantsTo = isNewUser ? "signup" : "login"

  const { token, errors } = state.auth_reducer

  const { sendRequest } = useHttpClient()

  const { formData, setForm } = useForm("email", "password", "passwordConfirm")
  const { email, password, passwordConfirm } = formData

  const noErrors = validateSignUpErrors(state)

  useEffect(() => window.localStorage.clear(), [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (noErrors) {
      const res = await sendRequest(`api/users/${userWantsTo}`, "POST", JSON.stringify(formData), {
        "Content-Type": "application/json",
      })
      if (isNewUser && res) {
        await sendRequest(`api/store/createStore`, "POST", JSON.stringify(state), {
          "Content-Type": "application/json",
          Authorization: "Bearer " + res.token,
        })
      }
      if (!isNewUser && res) {
        const response: I.a = await sendRequest(`api/store/getStore`, "GET", null, {
          "Content-Type": "application/json",
          Authorization: "Bearer " + res.token,
        })

        await set("ui_reducer", { ...response.data.data.ui_reducer })
        await set("user_reducer", { ...response.data.data.user_reducer })
        await set("stream_reducer", { ...response.data.data.stream_reducer })
      }

      res && set("auth_reducer", { token: res.token })
    }
  }

  if (token) {
    return <Redirect to="/onboarding" />
  }

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
          {errors.msg && <Error>{errors.msg}</Error>}
        </Form>
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
  font-size: 5.6rem;
  width: 70rem;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  height: 8rem;
  justify-content: space-between;
  width: 33rem;
  margin-top: 2rem;
`
const Error = styled.div`
  position: absolute;
  color: ${props => props.theme.color.salmon};
  font-size: 1.4rem;
  width: 33rem;
  left: 42rem;
  top: 5rem;
`
const Left = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40rem;
  width: 50%;
`
const Form = styled.form`
  font-size: 1.6rem;
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
