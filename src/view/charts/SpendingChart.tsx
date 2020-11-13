/* eslint-disable */
import React, { FC } from "react"
import styled from "styled-components"
import spendingChartImage from "data/assets/spending.png"

interface IProps {

}

export const SpendingChart: FC<IProps> = ({  }) => {
  //THIS IS JUST A PLACEHODLER FUNCTION FOR NOW


  return (
    <Wrapper>
      <Img
        alt="#"
        src={require("data/assets/spending.png")}
        style={{ height: "20rem" }}
        onClick={() => {
         null
        }}
      />
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Img = styled.img`
  height: 20rem;
  cursor: pointer;
`
