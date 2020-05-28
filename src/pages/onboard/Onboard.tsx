import React, {FC, useState} from "react"
import styled from "styled-components"
import {ProgressBar, Next, Back,  OnboardWizard} from "HOC/connectRedux_HOC"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {onboard_data} from "pages/onboard/data"
import { Redirect } from "react-router-dom"

interface IProps {
  state: any
}

export const Onboard: FC<IProps>= ({state}) => {

    const { progress } = state.ui_reducer
  
    const [direction, setDirection] = useState<string>("forward")

    const data = onboard_data(state.user_reducer)

    const { length } = data
    
    if (progress === length) return <Redirect to="/plan" />
    
  return (
      <Wrapper>
      <ProgressBar length={length} progress={progress} />
        <Text>
               {progress > 0 ? <h3 style={{fontWeight: "bold"}}>Why we Ask</h3> : null} 
                <h3>{data[progress].ask}</h3>
      </Text>
      {progress}
        <Content>
          <TransitionGroup>
              {
                              data.map((d,i) => i === progress &&
                              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`} >
                                              <OnboardWizard {...d} />
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
`
const Content = styled.div`
        height: 100%;
        width: 100%; 
        display: flex;
        justify-content: center;
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
`
