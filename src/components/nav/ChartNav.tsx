import React, { FC, useEffect } from "react"
import styled from "styled-components"

interface IProps {
  id: string
  reducer: string
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

/**
 * The <ChartNavr> component enables the user to display different subjects in the chart. FOr instance their TFSA savings plan, then swith to RRSP.
 *  */

export const ChartNav: FC<IProps> = ({ id, reducer, state, setValue_action }) => {
  const selected = state[reducer][id] //enters the reducer and grabs the corrosponding value to show if it is selected or not
  const options = ["tfsa", "rrsp", "non-reg", "all accounts"]

  useEffect(() => {
    setValue_action(id, reducer, "tfsa")
  }, [])

  return (
    <Wrapper>
      {options.map(d => (
        <Option onClick={() => setValue_action(id, reducer, d)} selected={selected === d}>
          {d}
        </Option>
      ))}
      <Pill selected={selected} options={options}></Pill>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  height: 3rem;
  width: 32rem;
  padding: 2rem;
  margin: 0px;
  margin-left: 5rem;
  padding: 0px;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  margin: 0 auto;
  border-top: 1px solid ${props => props.theme.color.lightGrey};
  border-bottom: 1px solid ${props => props.theme.color.lightGrey};
`
interface OProps {
  selected: boolean
}
interface PProps {
  selected: string
  options: string[]
}
//["income", "savings", "taxes", "spending", 'networth']

const Option = styled.div<OProps>`
  position: relative;
  min-width: 7rem;
  transition: all 2s ease;
  color: ${props => (props.selected ? props.theme.color.ice : props.theme.color.grey)};
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
  font-size: 1.2rem;
`
const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 8rem;
        height: 2.8rem;
        top: 0rem;
        left: 0rem;
        background-color: lightGrey;
        transform: ${props => props.selected === props.options[0] ? "translate(0rem,0rem)" :
                     props => props.selected === props.options[1] ? "translate(8rem,0rem)" : 
                     props => props.selected === props.options[2] ? "translate(16rem,0rem)" :
                     props => props.selected === props.options[3] ? "translate(24rem,0rem)" :
                   null};
        transition: all .3s ease;
        border-radius: 0px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`

