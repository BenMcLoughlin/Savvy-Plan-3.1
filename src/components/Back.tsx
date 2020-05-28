import React, {FC} from 'react'
import styled from "styled-components"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  id: string
  reducer: string
  setValue_action: (id: string, reducer: string, value: any, childId: string) => void;
  setDirection: (direction: string) => void
  value: number
}

export const Back: FC<IProps> = ({id, reducer, setValue_action, value, setDirection}) => {
    return (
           < ArrowLeft onClick={() => { 
               setDirection("back")
               setValue_action(id, reducer, value, "")}}/>
    )
}

//---------------------------STYLES-------------------------------------------//

const ArrowLeft = styled(ArrowLeftS)`
    height: 4.2rem;
    width: 4.2rem;
    color: #C8C7C7;
    cursor: pointer;
    position: absolute;
    top: 10rem;
    left: 10rem;
`

