import React, {FC} from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"

interface IProps {
  progress: number,
  length: number
}

export const ProgressBar: FC<IProps> = ({ progress, length}) => {
    let squares = _.range(progress)
    return (
        <Wrapper>
        {squares.map(d => <Square length={length} key={d} />)}
        </Wrapper>
    )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
        position: absolute;
        top: 7rem;
        left: 0rem;
        height: 0.5rem;
        width: 100%; 
        background: #EAE2E2;
        box-shadow: 0 1px 2px rgba(0,0,0.01,.08);
        display: flex;
        
`
interface ISquare {
  length: number
}

const Square = styled.div<ISquare>`

        height: 0.5rem;
        width: ${props => `${(1/props.length)*145}rem`}; 
        background: #9AC0CD;

`
