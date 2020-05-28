import React, {FC, useState} from "react"
import styled from "styled-components"
import {ProgressBar, Next, Back,  IncomeWizard} from "HOC/connectRedux_HOC"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { income_data } from "pages/income/data"
import { Redirect } from "react-router-dom"

interface IProps {
  state: any
}

export const Income: FC<IProps>= ({state}) => {

    const { progress } = state.ui_reducer
  
    const [direction, setDirection] = useState<string>("forward")

    const data = income_data(state)

    const { length } = data
    
    const {changeColor: color} = state.ui_reducer                                                                                                            //to keep the color the same as the chart we store the color on the instance object                                      

   if (progress === length) return <Redirect to="/plan" />
    
  return (
      <Wrapper>
      <ProgressBar length={length} progress={progress} />
        <Text>
               <h3 style={{fontWeight: "bold"}}>Why this matters</h3>
                <h3 >{data[progress].ask}</h3>
      </Text>
      {progress}
      <ChartWrapper></ChartWrapper>
        <Content>
          <TransitionGroup>
              {
                              data.map((d,i) => i === progress &&
                              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`} >
                                              <IncomeWizard {...d} />
                                </CSSTransition>)
                  }
        </TransitionGroup> 
               </Content>
               {
                   progress > 0 &&
          <>
                        <Back  id="progress"
                        reducer="ui_reducer"
                        value={progress  > 0 ? progress - 1 : 1}
                        setDirection={setDirection}
                    />
                        <Next
                        props={data[progress]}
                        value={progress  < length ? progress + 1 : length }
                        setDirection={setDirection}
                        progress={progress}
                    />
                    </>
        } 
        </Wrapper>
    )
}
 
//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
        height: 100%;
        width: 100%; 
        box-shadow: 0 1px 2px rgba(0,0,0.01,.08);
        display: flex;
        flex-direction: column;
        align-items: center;
`
const ChartWrapper = styled.div`
        width: 70rem;
        height: 30rem;
`
const Content = styled.div`
        width: 70rem;
        height: 40rem;
        display: flex;
        justify-content: center;
        position: relative;
`
const Text = styled.div`
        height: 20rem;
        width: 20rem; 
        display: flex;
        flex-wrap: flex-start;
        flex-direction: column;
        position: absolute; 
        left: 10rem;
        top: 25rem;
        line-height: 2.2rem;
`

