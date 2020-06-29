import React, { FC } from "react"
import styled from "styled-components"

interface ISliderProps {
  bottomLabel: string
  childId?: any
  max: number
  min: number
  step: number
  id: string
  reducer: string
  topLabel: string
  title: string
  type?: string
  state: any
  set: (id: string, reducer: string, value: any, childId?: any) => void
}

export const Slider: FC<ISliderProps> = ({ childId, id, min, topLabel, bottomLabel, reducer, type, state, max, set, step }) => {
  // const value = func1(state)
  const value = childId ? state[reducer][id][childId] : state[reducer][id]
  
  return (
    <Wrapper>
      <Label>{topLabel}</Label>
      <Value
        type="text"
        autoComplete="off"
        onChange={e => set(id, reducer, e.target.value, childId)}
        value={type === "percentage" ? `${value}%` : type === "year" ? value : value.toLocaleString()}
      />
      <RangeBar
        type="range"
        onChange={e => set(id, reducer, +e.target.value, childId)}
        value={value}
        max={max}
        min={min}
        step={step}
        percentage={`${((value - min) / (max - min)) * 100}%`} //the percentage is used to set the linear gradient, haveing two colors on either side of the selector circle thumb
      />
      <Label style={{ marginTop: "-1.4rem" }}>{bottomLabel}</Label>
    </Wrapper>
  )
}

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  margin-top: 1rem;
  margin-left: -3rem;
  position: relative;
  width: 20rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Label = styled.div`
  font-size: 1.4rem;
  color: ${props => props.theme.color.darkGrey};
  text-transform: capitalize;
`
interface IRange {
  percentage: string
}

const RangeBar = styled.input<IRange>`
  width: 15rem;
  height: 2px;
  -webkit-appearance: none;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  border-radius: 12px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  transition: all 1s ease;
  background: linear-gradient(90deg, ${props => "#707070 "} ${props => props.percentage}, ${props => "#C8C7C7"} ${props => props.percentage});
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border: 0.5px solid #707070;
    border-radius: 50%;
    cursor: pointer;
  }

  &:active::-webkit-slider-thumb {
    background: #707070;
  }
`

const Value = styled.input`
  margin-top: 1rem;
  text-align: center;
  padding: 0.3rem;
  width: 11rem;
  border-radius: 5px;
  color: #5a5758;
  background: none;
  border: none;
  cursor: pointer;
  &:focus {
    background: lightGrey;
  }
  font-size: 2.3rem;
  outline: none;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output.
