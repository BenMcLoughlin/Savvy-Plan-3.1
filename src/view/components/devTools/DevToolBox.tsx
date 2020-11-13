/* eslint-disable */
import React, { FC, useState } from "react"
import styled from "styled-components"
import * as I from "model/types"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  set: I.set
}

export const DevToolBox: FC<IProps> = ({set}) => {
  const [progress, setProgress] = useState<number>()
  const [open, toggleOpen] = useState<boolean>(false)
  const [input, setInput] = useState<I.a>({
    value1: "ui_reducer",
    value2: "",
    value3: "",
  })

  const { value1, value2, value3 } = input
    console.log(value2)

  const handleChange = e => setInput({ ...input, [e.target.name]: e.target.value })
  const onSubmit = e => 
    set('ui_reducer', {selectedUser: "user1"})


  return (
    <Wrapper open={open}>
      {!open && <Title onClick={() => toggleOpen(!open)}>Dev Toolbox</Title>}
      {open && (
        <OpenWrapper>
          <ArrowLeft onClick={() => toggleOpen(!open)} />
          <Column>
            <FormTitle>Set In Redux</FormTitle>
            <Form>
              <InputWrapper>
                <Label>Reducer</Label>
                <Input value={value1} name={"value1"} onChange={e => handleChange(e)} />
              </InputWrapper>
              <InputWrapper>
                <Label>Key</Label>
                <Input value={value2} name={"value2"} onChange={e => handleChange(e)} />
              </InputWrapper>
              <InputWrapper>
                <Label>Value</Label>
                <Input value={value3} name={"value3"} onChange={e => handleChange(e)} />
              </InputWrapper>
              <Button onClick={() => set(value1, {[value2]: value3})}>Set</Button>
            </Form>
          </Column>
        </OpenWrapper>
      )}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface Wrapper {
  open: boolean
}
const Wrapper = styled.div<Wrapper>`
  background: black;
  height: 17rem;
  width: ${props => (props.open ? "70rem" : "4rem")};
  display: flex;
  flex-direction: column;
  left: 12rem;
  color: white;
  padding: 1rem;
  position: absolute;
  bottom: 9rem;
  left: 0rem;

  transition: all 0.5s ease;
  border-radius: 0 0 10px 10px;
  ${props => props.theme.neomorph}
  z-index: 10000;
`
const OpenWrapper = styled.div`
  position: relative;
`
const Title = styled.div`
  height: 5rem;
  width: 10rem;
  margin-top: 3rem;
  margin-left: -5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${props => props.theme.color.darkGrey};
  transform: rotate(90deg);
`
const FormTitle = styled.div`
  height: 2rem;
  margin-bottom: 2rem;
  width: 12rem;
  color: ${props => props.theme.color.darkGrey};
  font-size: 1.4rem;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  top: 3rem;
  left: 5rem;
`
const Form = styled.div`
  height: 3rem;
  width: 55rem;
  display: flex;
  justify-content: space-between;
`
const InputWrapper = styled.div`
  position: relative;
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: normal;
  pointer-events: none;
  color: ${props => props.theme.color.darkGrey};
  font-weight: 800;
  position: absolute;
  top: 1.2rem;
  left: 2rem;
`

const Input = styled.input`
  background-color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem;
  display: block;
  width: 15rem;
  padding: 3rem 0rem 2rem 2rem;
  margin-top: 1rem;
  height: 4rem;
  border: none;
  border-radius: 5px;
  background: ${props => props.theme.color.background};
  color: ${props => props.theme.color.darkGrey};
  ${props => props.theme.neomorph};
  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.color.green};
    color: ${props => props.theme.color.darkGrey};
  }
`
const ArrowLeft = styled(ArrowLeftS)`
  height: 4.2rem;
  width: 4.2rem;
  color: #c8c7c7;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
`
const Button = styled.button`
  height: 3.2rem;
  min-width: 8rem;
  max-width: 17rem;
  border-radius: 100px;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  color: ${props => props.theme.color.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: ${props => props.theme.fontSize.small};
  cursor: pointer;
  outline: none;
  margin-top: 2rem;
  margin-left: 2rem;
  transition: all 0.2s ease-in;
  text-transform: capitalize;
  ${props => props.theme.neomorph};
  background: ${props => props.theme.color.background};
`
