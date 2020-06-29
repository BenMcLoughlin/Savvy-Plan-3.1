import React, { FC, useState } from "react"
import styled from "styled-components"

interface IProps {
  childId?: string
  id: string
  onClick1: () => void
  onClick2: () => void
  reducer: string
  option1: string | number
  option2: string | number
  state: any
  set: (id: string, reducer: string, value: any, childId?: any) => void
}

export const DualSelect: FC<IProps> = ({ childId, id, onClick1, onClick2, reducer, state, set, option1, option2 }) => {
  const [clickFired, fireClick] = useState<boolean>(false) //we need to know if a button has been clicked

  const selected = state.ui_reducer.selectedDualSelectOption

  return (
    <Wrapper>
      <Option
        onClick={() => {
          //the onclick is used to create new objects, for instance, do you own a house? "yes", then it creates a house object
          if (onClick1 && !clickFired) {
            //but we can't have objects created with every click
            onClick1() //creates the new object
            fireClick(true) //then ensures that clicking again whon't make a new one
          }
          set("selectedDualSelectOption", "ui_reducer", true) //sets in the reducer a boolean value that tells the wizard how to proceed, eg "do you have a house?", then the house details will be added to the wizard
        }}
        selected={selected}
      >
        {option1}
      </Option>
      <Option
        onClick={() => {
          onClick2()
          set("selectedDualSelectOption", "ui_reducer", false)
          if (clickFired) {
            fireClick(false)
          } //if the user added a stream by clicking yes then clicks no, this removes that stream
        }}
        selected={!selected} //when the page first loads it sets both colors to grey but I want the initial color or the bar to be white
      >
        {" "}
        {option2}
      </Option>
      <Pill selected={selected} option1={option1}></Pill>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: inline-flex;
  height: 3rem;
  background-color: ${props => props.theme.color.lightGrey};
  box-shadow: rgba(64, 62, 61, 0.05) 0px 3px 10px 0px;
  margin: 0px;
  padding: 0px;
  border-radius: 25px;

`
interface OProps {
  selected: boolean
}
interface PProps {
  selected: string
  option1: string | number
}

const Option = styled.div<OProps>`
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
const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 16rem;
        height: 3rem;
        background-color: ${props => props.theme.color.primary};
        transform: ${props => (props.selected ? "translate(0,0)" : "translateX(100%)")};
        transition: all .3s ease;
        border-radius: 25px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
