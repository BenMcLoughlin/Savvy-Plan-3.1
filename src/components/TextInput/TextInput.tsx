import React, { FC } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

interface IProps {
  id: string
  childId?: string
  label: string
  placeholder?: string
  reducer: string
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
  textInput?: boolean
  type: string
}

export const TextInput: FC<IProps> = ({ id, childId, label, placeholder, reducer, state, setValue_action, type }) => {
  const subject = state[reducer][id]

  const valid = subject.toString().length === 4 && +subject > 1930 && +subject < 2095

  return (
    <Wrapper>
      <Label>{_.startCase(label)}</Label>
      <Input
        placeholder={placeholder}
        type={type === 'year' ? 'number' : 'text'}
        step={1}
        onChange={(e) => setValue_action(id, reducer, e.target.value, childId)}
      />
      {type === 'year' && subject.length === 4 && !valid && <Text>Please Enter a valid year eg. 1990</Text>}
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
  color: ${(props) => props.theme.color.darkGrey};
  font-weight: 800;
  position: absolute;
  top: 2.2rem;
  left: 2rem;
`
const Text = styled.label`
  position: relative;
  top: 3rem;
  left: 3rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.salmon};
`
const Input = styled.input`
  background-color: white;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 1.2rem;
  display: block;
  width: 30rem;
  padding: 3rem 0rem 2rem 2rem;
  margin-top: 1rem;
  height: 9rem;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.color.darkGrey};
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.green};
  }
`
