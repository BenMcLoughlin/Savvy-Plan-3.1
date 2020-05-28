import React, {FC, useState} from 'react';
import styled from 'styled-components';
import _ from "lodash"
import { ArrowLeftS } from "@styled-icons/remix-line"
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface IProps {
      
}

export const InfoCard: FC<IProps> = ({ }) => {
  
  const [position, setPosition] = useState<number>(0)
  const [direction, setDirection] = useState<string>("forward")


  const array = [
    "You'll do better if you put all of your money into potatos. The irish are coming. BANANANA!", 
    "one time I lost my cat in a rain storm. He ate BANANAs too many timesss...",
    "I will be the BANANA king of kamchatca. ",
    "lets steel a party boat and buy all the BANANANA's",
    "lets steel a party boat and buy all the BANANANA's",
    "lets steel a party boat and buy all the BANANANA's",
    "lets steel a party boat and buy all the BANANANA's",
  ]

  const { length } = array
  
  return (
    <Wrapper>
      <Title>Insights</Title>
      <Content>
        <TransitionGroup>
          {
            array.map((d, i) => i === position &&
                    <CSSTransition timeout={1000} classNames={`transition-${direction}`} >
                    <Text>{array[position]}</Text>
                  </CSSTransition>    
            )
          }
        </TransitionGroup>
      </Content>
      <Selector>
        <ArrowLeft onClick={() => {
          setPosition(position > 0 ? position - 1 : 0)
          setDirection("back")
        }
        }/>
        {_.range(1, array.length + 1).map((d, i) => <Circle selected={i === position} onClick={() => setPosition(i)}/>)}
        <ArrowRight onClick={() => {
          setPosition(position < length ? position + 1 : length - 1)
          setDirection("forward")
        }
        }/>
      </Selector>
    </Wrapper>
  );
}


//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
height: 20rem;
width: 30rem;
background: white;
box-shadow: 0 1px 2px rgba(0, 0, 0.01, .08);
border-radius: 5px;
position: relative;
overflow: hidden;
`

const Title = styled.div`
  font-size: 1.6rem;
  color: #5A5758;
  padding: 2rem;
`
const Content = styled.div`
  font-size: 1.6rem;
  color: #5A5758;
  padding: 2rem;
`
const Selector = styled.div`
  font-size: 1.6rem;
  padding: 2rem;
  position: absolute;
  top: 16rem;
  left: 6rem;
  height: 1rem;
  display: flex;
  align-content: center;
  align-items: center;
  width: 20rem;
  justify-content: space-around;

`
interface ICircle {
  selected: boolean;
}

const Circle = styled.div<ICircle>`
  background: ${props => props.selected ? "#5A5758" : "#dddddd"};
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:after{
    content: "";
    height: 2rem;
    width: 2rem;
    background: green;
  }
`

const ArrowLeft = styled(ArrowLeftS)`
    height: 2.2rem;
    width: 2.2rem;
    color: #C8C7C7;
    cursor: pointer;
`

const ArrowRight = styled(ArrowLeftS)`
    height: 2.2rem;
    width: 2.2rem;
    color: #C8C7C7;
    cursor: pointer;
    transform: rotate(180deg);
`
const Text = styled.h3`
   position: absolute;
   top: 5rem;
   left: 2rem;
`
