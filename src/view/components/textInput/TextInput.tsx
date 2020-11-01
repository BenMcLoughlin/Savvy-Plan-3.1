import React, { FC, useState, ChangeEvent } from "react"
import styled from "styled-components"
import _ from "lodash"
import { validateText } from "model/services/validation/validators"
import * as I from "model/types"

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  placeholder?: string
  set: I.set
  remove: I.remove
  type: string
  value: string
  name?: string
  formData?: I.formData
}

export const TextInput: FC<IProps> = ({ handleChange, formData, label, placeholder, type = "text", value, name = label, remove, set }) => {
  const [enableErrors, setEnableErrors] = useState<boolean>(false)

  const error = validateText(name, value, formData ? formData : null)

  const { isError, text } = error

  return (
    <Wrapper>
      <Label>{_.startCase(label)}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        type={type === "year" ? "number" : type}
        step={1}
        onChange={e => handleChange(e)}
        name={name}
        id="textInput"
        onBlur={() => {
          setEnableErrors(true)
          if (setEnableErrors && isError) {
            set("errors", "auth_reducer", error, name)
          } else {
            remove(name, "auth_reducer")
          }
        }}
      />
      {enableErrors && isError && <Error>{text}</Error>}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: relative;
`
const Label = styled.label`
  font-size: 1.2rem;
  font-weight: normal;
  pointer-events: none;
  color: ${props => props.theme.color.darkGrey};
  font-weight: 800;
  position: absolute;
  top: 2.2rem;
  left: 2rem;
`
const Error = styled.label`
  position: absolute;
  top: 7.3rem;
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.salmon};
`
const Input = styled.input`
  background-color: white;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.2rem;
  display: block;
  width: 30rem;
  padding: 3rem 0rem 2rem 2rem;
  margin-top: 1rem;
  height: 9rem;
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
