import React, {FC} from 'react';
import styled from 'styled-components';
import {UserIncomeChart} from "charts/income/UserIncomeChart"
import {EditIncome} from "HOC/connectRedux_HOC"

interface IProps {
      
}

export const Income: FC<IProps> = ({}) => {

  return (
    <Wrapper>
      <UserIncomeChart></UserIncomeChart>
      <EditIncome></EditIncome>
    </Wrapper>
  );
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
height: 100rem;
width: 70rem;
`