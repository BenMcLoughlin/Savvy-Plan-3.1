import React, { FC, useState } from "react"
import styled from "styled-components"
import _ from "lodash"
import { CSSTransition } from "react-transition-group"
import { TextInput } from "view/components"

interface IProps {
  optionArray?: string[]
  handleChange: (value: string | number) => null
  value: string
}

export const PickSingleOption: FC<IProps> = ({ optionArray, handleChange, value }) => {
  console.log(value)
  return (
    <Wrapper>
      {optionArray &&
        optionArray.map((d: string, i: number) => {
          return (
            <Option key={i} selected={d.toLowerCase() === value} onClick={() => handleChange(d)} id={`${_.camelCase(d)}`}>
              {d}
            </Option>
          )
        })}
      <Pill selected={value} optionArray={optionArray}/>
      <CSSTransition in={value === "write below"} mountOnEnter unmountOnExit timeout={400} classNames="fade-in">
        <TextInput handleChange={e => handleChange(e)} type="year" label={`Gender`}  value={"value"} />
      </CSSTransition>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  width: 30rem;
  min-height: 30rem;
  position: relative;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
`

interface SProps {
  selected: boolean
}

// eslint-disable-next-line
const Option = styled.div<SProps>`
  width: 100%;
  padding: 1rem;
  z-index: 1;
  min-height: 5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
`

interface PProps {
  selected: string
  optionArray: string[]
}

const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 25rem;
        height: 5rem;
        top: -.3rem;
        left: -1.6rem;
        background: ${props => props.theme.color.background};
        ${props => props.theme.neomorph};
        transform: ${props =>
          props.selected === props.optionArray[0]
            ? "translate(0,0rem)"
            : props =>
                props.selected === props.optionArray[1]
                  ? "translate(0,5rem)"
                  : props =>
                      props.selected === props.optionArray[2]
                        ? "translate(0,10rem)"
                        : props =>
                            props.selected === props.optionArray[3] ? "translate(0,15rem)" : props => (props.selected === props.optionArray[4] ? "translate(0,20rem)" : "translateY(0%)")};
        transition: all .3s ease;
        border-radius: 12px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
