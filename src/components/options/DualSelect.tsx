import React, { FC } from 'react'
import styled from 'styled-components'

interface IProps {
  id: string
  onClick?: () => void
  reducer: string
  value1: string | number
  value2: string | number
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: any) => void
}

export const DualSelect: FC<IProps> = ({ id, onClick, reducer, state, setValue_action, value1, value2 }) => {
  const selected = state.ui_reducer.selectedUser //enters the reducer and grabs the corrosponding value to show if it is selected or not

  return (
    <Wrapper>
      <Option
        onClick={() => {
          if (onClick) {
            onClick()
          }
          setValue_action(id, reducer, value1)
        }}
        selected={selected === value1}
      >
        {value1}
      </Option>
      <Option
        onClick={() => {
          setValue_action(id, reducer, value2)
        }}
        selected={selected.length === 0 || selected === value2} //when the page first loads it sets both colors to grey but I want the initial color or the bar to be white
      >
        {' '}
        {value2}
      </Option>
      <Pill selected={selected} value1={value1}></Pill>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: inline-flex;
  height: 4rem;
  background-color: rgb(230, 228, 227);
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
  value1: string | number
}

const Option = styled.div<OProps>`
  position: relative;
  min-width: 16rem;
  color: ${(props) => (props.selected ? props.theme.color.ice : 'grey')};
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
  font-size: ${(props) => props.theme.fontSize.smallMedium};
`
const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 16rem;
        height: 4rem;
        background-color: ${(props) => props.theme.color.primary};
        transform: ${(props) => (props.selected === props.value1 ? 'translate(0,0)' : 'translateX(100%)')};
        transition: all .3s ease;
        border-radius: 25px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
