import React from 'react'
import styled from "styled-components"

interface Props {
  
}

export const IncomeDisplay = (props: Props) => {
  return (
    <Wrapper>
      
    </Wrapper>
  )
}


//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
grid-area: a;
  height:100%;
  width: 100%;
  border-radius: 10px;
  ${props => props.theme.neomorph};
`