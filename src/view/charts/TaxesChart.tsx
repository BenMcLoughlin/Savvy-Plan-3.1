/* eslint-disable */
import React, { FC } from "react"
import styled from "styled-components"
import { ChartNav } from "view/components"

interface IProps {


}

export const TaxesChart: FC<IProps> = () => {
  return (
    <Wrapper>
      <Img alt="#" src={require("data/assets/taxes.png")} style={{ height: "20rem" }} onClick={() => null} />
      <ChartNavWrapper>
        <ChartNav options={["Taxes Owing", "Taxes Saved"]} handleChange={value => null} value={null} />
      </ChartNavWrapper>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
const ChartNavWrapper = styled.div`
  position: absolute;
  top: 10.5rem;
  left: 4rem;
`
