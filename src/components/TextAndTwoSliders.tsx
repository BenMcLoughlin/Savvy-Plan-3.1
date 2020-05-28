import React, {FC} from 'react';
import styled from 'styled-components';
import {TextInput, Slider }  from "HOC/connectRedux_HOC"


interface IProps {
      
}

export const TextAndTwoSliders: FC<IProps> = ({}) => {

  return (
    <Wrapper>
      <TextInput id={"firstName"} reducer="user_reducer" type={"string"}/>
                                                                          <Slider
                                                                                bottomLabel={"life span"}
                                                                                id={"lifeSpan"}
                                                                                max={120}
                                                                                step ={1}
                                                                                topLabel ={"I'll plan to live till"}
                                                                                reducer ={"user_reducer"}
                                                                                title ={"Its morbid, we know... "}
                                                                          /> 
                                                                          <Slider
                                                                                bottomLabel={"life span"}
                                                                                id={"lifeSpan"}
                                                                                max={120}
                                                                                step ={1}
                                                                                topLabel ={"I'll plan to live till"}
                                                                                reducer ={"user_reducer"}
                                                                                title ={"Its morbid, we know... "}
                                                                          /> 
    </Wrapper>
  );
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
height: 20rem;
width: 80rem;
display: flex;
justify-content: space-around;
`