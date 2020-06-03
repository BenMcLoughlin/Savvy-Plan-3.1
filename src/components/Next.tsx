import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowRightCircle } from '@styled-icons/remix-fill/ArrowRightCircle'

interface IProps {
  props: any
  state: any
  setValue_action: (id: string, reducer: string, value: any, childId: string) => void
  setDirection: (value: string) => void
  value: number
  progress: number
}

export const Next: FC<IProps> = ({ props, state, setValue_action, setDirection, value }) => {
  const { id, childId, reducer, type } = props //props are pulled from data even though this button is not being passed props through the map function

  const subject = reducer === 'main_reducer' ? state[reducer][id][childId] : state[reducer][id] //we need to check the value to see if its valid, if its the main reducer then the value is nested by one

  const valid = true
    // type === 'year'
    //   ? subject.toString().length === 4 && +subject > 1930 && +subject < 2095
    //   : type !== 'year'
    //   ? subject.toString().length > 0
    //   : false //checking to see if the input they entered is valid so they can move on

  useEffect(() => {
    const pressEnter = (event: KeyboardEvent) => {
      //this enables us to press enter and move forward
      if (event.key === 'Enter' && valid) {
        setDirection('forward')
        setValue_action('progress', 'ui_reducer', value, '')
        window.removeEventListener('keydown', pressEnter) // I had so much trouble figuring this out, the event listener needs to be removed after it is fired, otherwise it double taps and causes issues
      }
    }
    if (valid) {
      window.addEventListener('keydown', pressEnter)
    }
  }, [state]) //use effect changes whenever the state changes

  return (
    <Wrapper>
      <ArrowRight
        valid={valid}
        onClick={() => {
          setDirection('forward')
          if (valid) {
            setValue_action('progress', 'ui_reducer', value, '')
          }
        }}
      />
      {valid && <p>Press Enter</p>}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  top: 30rem;
  right: 10rem;
`

interface ArrowProps {
  valid: boolean
}
const ArrowRight = styled(ArrowRightCircle)<ArrowProps>`
  color: ${(props) => (props.valid ? '#9AC0CD' : '#C8C7C7')};
  cursor: ${(props) => (props.valid ? 'pointer' : null)};
  height: 7.2rem;
  width: 7.2rem;
`
