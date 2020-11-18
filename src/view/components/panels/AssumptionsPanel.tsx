/* eslint-disable */
import React, { FC, useState } from "react"
import styled from "styled-components"
import * as I from "model/types"
import { DualSelect, Slider } from "view/components"
import { ArrowLeftS } from "@styled-icons/remix-line"
import { onboardQuestions } from "controller/questions/questions.controller"
import { store } from "index"

interface IProps {}

export const AssumptionsPanel: FC<IProps> = () => {
  const [progress, setProgress] = useState<number>()
  const [open, toggleOpen] = useState<boolean>(false)
  const [assumption, toggleAssumption] = useState<string>("rates")
  const [input, setInput] = useState<I.a>({
    value1: "ui_reducer",
    value2: "",
    value3: "",
  })
  console.log("Hello")
  const { value1, value2, value3 } = input

  const handleChange = e => setInput({ ...input, [e.target.name]: e.target.value })

  const buildSlidersArray = () => {
    const state = store.getState()
    const { isMarried } = state.ui_reducer
    const q: I.a = []
    const askUser1 = onboardQuestions(q, "user1")
    const askUser2 = onboardQuestions(q, "user2")

    if (assumption === "rates") {
      askUser1.for.rate1()
      askUser1.for.rate2()
      askUser1.for.inflationRate()
      askUser1.for.managementExpenseRatio()
      askUser1.for.lifeSpan()
      if (isMarried) {
        askUser2.for.lifeSpan()
      }
    }
    // if (assumption === "retirementFactors") {
    //   askUser1.for.rrspStartAge()
    //   askUser1.for.tfsaStartAge()
    //   askUser1.for.cppStartAge()
    // }
    return q
  }
  const slidersArray = buildSlidersArray()

  const sliderValues = slidersArray[0].min
  console.log("slidersArray[0]:", sliderValues)
  return (
    <Wrapper open={open}>
      {!open && <Title onClick={() => toggleOpen(!open)}>Assumptions</Title>}
      <Tabs open={open}>
        <DualSelect
          handleChange={value => toggleAssumption(value)}
          handleChange2={value => toggleAssumption(value)}
          option1={"rates"}
          option2={"retirementFactors"}
          value={assumption === "rates"}
        />
      </Tabs>
      {open && (
        <>
          <Row>
            {slidersArray.map(data => (
              <Slider {...data} />
            ))}
          </Row>

          <ArrowLeft onClick={() => toggleOpen(!open)} />
        </>
      )}
    </Wrapper>
  )
}
//${props => (props.open ? "70rem" : "4rem")};
//  ${props => props.theme.neomorph}
//---------------------------STYLES-------------------------------------------//

interface Props {
  open: boolean
}
const Wrapper = styled.div<Props>`
  height: 20rem;
  width: ${props => (props.open ? "100rem" : "4rem")};
  display: flex;
  flex-direction: column;
  left: 0rem;
  color: white;
  padding: 1rem;
  position: absolute;
  top: 35rem;
  transition: all 0.5s ease;
  border-radius: 0 0 10px 10px;
  ${props => props.theme.neomorph};
`
const Body = styled(Wrapper)<Props>`
  width: 100%;
  top: 0rem;
`
const Title = styled.div`
  height: 5rem;
  width: 10rem;
  margin-top: 3rem;
  margin-left: -6rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${props => props.theme.color.darkGrey};
  transform: rotate(90deg);
  transition: all 0.5s ease;
`
const Tabs = styled.div<Props>`
  width: ${props => (props.open ? "40rem" : "0rem")};
  position: absolute;
  top: -5rem;
  z-index: 5000;
  overflow: hidden;
  transition: all 0.5s ease;
`
const SelectTabs = styled.div`
  height: 2rem;
  position: absolute;
  top: -5rem;
  width: 30rem;
  color: ${props => props.theme.color.darkGrey};
  font-size: 1.4rem;
  display: flex;
`
const Tab = styled.div`
  height: 2rem;
  margin-bottom: 2rem;
  width: 22rem;
  color: ${props => props.theme.color.darkGrey};
  font-size: 1.4rem;
  background: yellow;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
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
