/* eslint-disable */
import React, { FC } from "react"
import styled from "styled-components"
import netWorthImage from "data/assets/netWorth.png"

interface IProps {


}

export const NetWorthChart: FC<IProps> = ({ }) => {

  return (
    <Wrapper>
      <Img
        alt="#"
        src={netWorthImage}
        style={{ height: "20rem" }}
        onClick={() => {
        }}
      />
      <ChartNavWrapper>{/* <ChartNav options={["Taxes Owing", "Taxes Saved"]} id={"selectedAccount"} reducer={"uiReducer"} /> */}</ChartNavWrapper>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
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
