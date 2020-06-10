import React, { FC, useEffect } from "react"
import styled from "styled-components"

interface IProps {
  id: string
  reducer: string
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId?: string) => void
}

/**
 * The <TripleSelector> component contains a list of values: "Income", "Spending", "Taxes" etc. The User can click
 * a value to navigate between pages. The Nav is visible non matter which page is rendered.
 *  */

export const TripleSelector: FC<IProps> = ({ id, reducer, state, setValue_action }) => {
  const selected = state[reducer][id] //enters the reducer and grabs the corrosponding value to show if it is selected or not

  const { firstName, spouseName } = state.user_reducer
  const options = [`${firstName}`, "Combined", `${spouseName}`]

  useEffect(() => {
    setValue_action(id, reducer, firstName)
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
  height: 5rem;
  width: 30rem;
  margin: 0px;
  margin-left: 5rem;
  padding: 0px;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  margin: 0 auto;
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
  min-width: 10rem;
  transition: all 2s ease;
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
`
const Pill = styled.div<PProps>`
        position: absolute;
        min-width: 10rem;
        height: 3rem;
        top: 1rem;
        left: 0rem;
        background-color: #4F9190;
        transform: ${props =>
          props.selected === props.options[0]
            ? "translate(0rem,0rem)"
            : props =>
                props.selected === props.options[1]
                  ? "translate(10rem,0rem)"
                  : props => (props.selected === props.options[2] ? "translate(20rem,0rem)" : null)};
        transition: all .3s ease;
        border-radius: 25px;
        animation: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s 1 normal forwards running fmdUjs;
}
`
