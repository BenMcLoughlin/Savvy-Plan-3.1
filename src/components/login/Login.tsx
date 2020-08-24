import React, { FC } from "react"
import styled from "styled-components"
import { TextInput, LinkButton } from "components"
import * as I from "types"

interface IProps {
  set: I.set
  state: I.state
}

export const Login: FC<IProps> = ({set, state}) => {
  const {newUser} = state.user_reducer
console.log(newUser)
  return (
    <Wrapper>
      <TextInput label="email" handleChange={() => null} valid={true} value="hi" type="text" />
      <TextInput label="password" handleChange={() => null} valid={true} value="hi" type="password" />
      {
        newUser &&
        <TextInput label="password confirm" handleChange={() => null} valid={true} value="hi" type="password" />
      } 
      <LinkButton label="Sign Up" link="onboarding" handleChange={() => set("newUser", "ui_reducer", false)}/>
      <h4>Forgot password?</h4>
    </Wrapper>
  )
}

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  top: 25%;
  left: 30%;
  width: 56rem;
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`