import React, { FC } from "react"
import styled from "styled-components"
import { PickNumber, TextInput } from "components"
import _ from "lodash"

interface IProps {
  handleChange: (selected: any, value: string) => void
  handleChange2: (event: any, childId: string) => null
  value: number
}

export const PickNumberWithText: FC<IProps> = ({ handleChange, handleChange2, value }) => {
  return (
    <Wrapper>
      <PickNumber handleChange={handleChange} value={value}/>
     <TextBoxes>
     {_.range(1, value + 1).map(d => (
        <TextInput handleChange={(e) => handleChange2(e, `child${d}BirthYear`)} type="year" label={`childNumber${d}BirthYear`} valid={true} value={"value"}/>
      ))}
     </TextBoxes>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 50rem;
  width: 30rem;
`
const TextBoxes = styled.div`
  min-height: 40rem;
  max-height: 60rem;
  overflow:scroll;
  width: 30rem;
  display: flex;
  flex-wrap: start;
  flex-direction: column;
  position: absolute;
  top: 8rem;
`