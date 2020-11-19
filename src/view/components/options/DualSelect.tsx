import React, { FC, useState } from "react"
import styled from "styled-components"
import _ from "lodash"

interface IProps {
  handleChange: (option1) => void
  handleChange2: (option2, clickFired) => void
  option1: string
  option2: string
  type?: string
  value: boolean
}

export const DualSelect: FC<IProps> = ({ handleChange, handleChange2, option1, option2, type, value }) => {
  const [clickFired, fireClick] = useState<boolean>(false) //we need to know if a button has been clicked

  return (
    <Wrapper type={type}>
      <Option
        onClick={() => {
          //the onclick is used to create new objects, for instance, do you own a house? "yes", then it creates a house object
          if (handleChange && !clickFired) {
            //but we can't have objects created with every click
            handleChange(option1) //creates the new object
            fireClick(true) //then ensures that clicking again whon't make a new one
          }
        }}
        selected={value}
        id="yes"
      >
        {_.startCase(option1)}
      </Option>
      <Option
        onClick={() => {
          handleChange2(option2, clickFired)
          if (clickFired) {
            fireClick(false)
          } //if the user added a stream by clicking yes then clicks no, this removes that stream
        }}
        selected={!value} //when the page first loads it sets both colors to grey but I want the initial color or the bar to be white
        id="no"
      >
        {" "}
        {_.startCase(option2)}
      </Option>
      <Pill selected={value} type={type}></Pill>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface Props {
  selected?: boolean
  type?: string
}

const Wrapper = styled.div<Props>`
  display: inline-flex;
  height: 3.5rem;
  box-shadow: rgba(64, 62, 61, 0.05) 0px 3px 10px 0px;
  margin: 0px;
  padding: 0px;
  border-radius: ${props => (props.type === "tab" ? "10px 10px 0 0 " : "25px")};
  background: #f4f4f3;
  box-shadow: ${props => (props.type === "tab" ? "-19px -19px 38px #ffffff" : "19px 19px 38px #b0b0af, -19px -19px 38px #ffffff")};
  overflow: hidden;
`

const Option = styled.div<Props>`
  position: relative;
  min-width: 16rem;
  color: ${props => (props.selected ? props.theme.color.ice : "grey")};
  text-align: center;
  z-index: 1;
  transition: all 100ms linear 0s;
  margin: 0px;
  border-radius: 2.5rem;
  text-transform: Capitalize;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;
`
const Pill = styled.div<Props>`
        position: absolute;
        min-width: 17rem;
        overflow: hidden;
        height: 3.5rem;
        background-color: ${props => props.theme.color.steelBlue};
        transform: ${props => (props.selected ? "translate(0,0)" : "translateX(100%)")};
        transition: all .3s ease;
        border-radius: ${props => (props.type === "tab" ? "10px 10px 0 0 " : "25px")};
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
