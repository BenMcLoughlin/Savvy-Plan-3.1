import React, {FC} from 'react';
import styled from 'styled-components';
import {Slider} from "HOC/connectRedux_HOC"

interface IProps {
      
}

export const EditIncome: FC<IProps> = ({}) => {

  return (
    <Wrapper>
      <Slider
              bottomLabel ={`1988}`}
              childId = {'year1'}
              id={'dummyIncomeInstance'}
              max= {2050}
              min={1990}
              step={1}
              title={"1"}
              reducer={"main_reducer"}
              topLabel={'I started in '}
      />

    </Wrapper>
  );
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
height: 100rem;
width: 100rem;
Background: red;
`