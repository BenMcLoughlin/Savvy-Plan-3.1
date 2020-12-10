import React, { FC, useState } from "react"
import * as I from "model/types"
import { TextInput, Button, Back } from "view/components"
import { Link } from "react-router-dom"
import styled from "styled-components"
import * as backend from 'model/utils/backend'

interface Props {
  state: I.state
}

export const ResetPassword: FC<Props> = ({ state }) => {
  const [value, setValue] = useState<string>("")

  return (
    <Wrapper>
      <BackButton to={"login"}>
        <Back handleChange={() => null} />
      </BackButton>

      <Content>
        <Text>
          <h2>What's your email address?</h2>
          <h4>We'll send a link to reset your email to this address</h4>
        </Text>
        <TextInput
          label={"email"}
          type={"email"}
          name={"email"}
          value={value}
          handleChange={e => setValue(e.target.value)}
        />
        <Button type="submit" label={"send email"} handleChange={() => backend.forgotPassword(value)} />
      </Content>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: relative;
  display: flex;
  text-align: center;
`

const Text = styled.div`
  height: 8rem;
  width: 50rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  justify-content: space-around;
`

const Content = styled.div`
  position: absolute;
  top: 10rem;
  left: 34rem;
  height: 40rem;
  width: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const BackButton = styled(Link)`
  font-size: 1.6rem;
  font-weight: 200;
  text-decoration: none;
  color: grey;
`
