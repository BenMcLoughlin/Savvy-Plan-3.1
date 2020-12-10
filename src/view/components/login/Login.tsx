import React, { useState, useEffect, FC } from "react"
import styled from "styled-components"
import { TextInput, Button, SocialMediaIcons } from "view/components"
import * as C from "view/components"
import * as I from "model/types"
import { CSSTransition } from "react-transition-group"
import { Redirect } from "react-router-dom"
import { store } from "index"
import { Link } from "react-router-dom"
import * as backend from "model/utils/backend/index"

type FormProps = {
  email: string
  password: string
  passwordConfirm: string
  isAdvisor: boolean
  planType: string
  advisor: ""
  role: ""
}

export const Login: FC = () => {
  const state = store.getState()
  const [isAdvisor, setIsAdvisor] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)

  const userWantsTo = isNewUser ? "signup" : "login"

  const { token, errors } = state.auth_reducer

  const [formData, setFormData] = useState<FormProps>({
    email: "ben@hotmail.com",
    password: "ben@hotmail.com",
    passwordConfirm: "ben@hotmail.com",
    isAdvisor,
    advisor: "",
    role: "",
    planType: "trial",
  })

  const setForm = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { email, password, passwordConfirm } = formData

  useEffect(() => window.localStorage.clear(), [])

  const handleSubmit = async e => {
    e.preventDefault()
    backend[isNewUser ? "signUp" : "login"](formData)
  }

  if (token) {
    return <Redirect to="/onboarding" />
  }
  console.log("formData:", formData)
  return (
    <PageSize>
      <Wrapper>
        <Left>
          <H2>Welcome to Savvy Plan</H2>
          <Div>
            I am a...{" "}
            <C.DualSelect
              handleChange={() => {
                setFormData({ ...formData, isAdvisor: true })
                setIsAdvisor(true)
              }}
              handleChange2={() => {
                setIsAdvisor(false)
                setFormData({ ...formData, isAdvisor: false })
              }}
              option1={"financial Advisor"}
              option2={"Not an advisor"}
              value={isAdvisor}
            />
          </Div>
          <Div>
            And I'd like to..{" "}
            <C.DualSelect
              handleChange={() => setIsNewUser(true)}
              handleChange2={() => setIsNewUser(false)}
              option1={"sign up"}
              option2={"sign in"}
              value={isNewUser}
            />
          </Div>
        </Left>
        <Form onSubmit={e => handleSubmit(e)}>
          <TextInput
            label="email"
            handleChange={e => setForm(e)}
            name={"email"}
            value={email}
            type="text"
          />
          <TextInput
            label="password"
            handleChange={setForm}
            name={"password"}
            value={password}
            type="password"
          />
          <CSSTransition
            in={isNewUser}
            mountOnEnter
            unmountOnExit
            timeout={700}
            classNames="fade-in"
          >
            <TextInput
              label="confirm password"
              handleChange={setForm}
              name={"passwordConfirm"}
              value={passwordConfirm}
              formData={formData}
              type="password"
            />
          </CSSTransition>
          <LowerWrapper isNewUser={isNewUser}>
            <Button type="submit" label={userWantsTo} handleChange={() => null} />
            <p>{`Or ${userWantsTo} with...`}</p>
            <SocialMediaIcons handleChange={() => null} />
            <ButtonAsText to="reset">Forgot Password?</ButtonAsText>
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
const ButtonAsText = styled(Link)`
  font-size: 1.6rem;
  font-weight: 200;
  text-decoration: none;
  color: grey;
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
