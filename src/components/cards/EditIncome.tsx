import React, { useState, FC } from "react"
import styled from "styled-components"
import { ColorSelect, Dropdown, EditTitle, ScrollCircles, Slider } from "HOC/connectRedux_HOC"
import { Exit } from "components/buttons/Exit"
import { AddButton } from "components/buttons/AddButton"
import { addPeriodToIncomeStream } from "services/ui_functions"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Trash2 } from "@styled-icons/feather/Trash2"

interface IProps {
  id: string
  instance: any
  periodSliders: any
  addPeriodLabel: string
  dropdown: any
  periods: number
  editTitle: boolean
  lastSlider: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
  remove: (id: string) => void
}

export const EditIncome: FC<IProps> = ({ addPeriodLabel, editTitle, id, lastSlider, dropdown, periods, instance, remove, periodSliders, set }) => {
  const [position, setPosition] = useState<number>(0)

  const [direction, setDirection] = useState<string>("forward")

  return (
    <Wrapper>
      <Header>
        <ColorSelect id={id} reducer={"main_reducer"} childId={"color"} />
        {editTitle ? (
          <>
            <EditTitle id={id} reducer={"main_reducer"} childId={"name"} />
            <Dropdown {...dropdown} />
          </>
        ) : (
          instance.reg
        )}
        <Exit onClick={() => set("selectedId", "ui_reducer", "")} />
      </Header>
      <TransitionGroup>
        {periodSliders.map(
          (d, i) =>
            i === position && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <TwoSliders>
                  <Slider {...d.sliderLeft} />
                  <Slider {...d.sliderRight} />
                </TwoSliders>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <LastSlider>
        <Slider {...lastSlider} />
      </LastSlider>
      <ScrollCircles periods={periods + 1} setPosition={setPosition} setDirection={setDirection} position={position} />
      <Change>
        <AddButton
          onClick={() => {
            addPeriodToIncomeStream(instance, periods, id, set)
            setPosition(periods + 1)
          }}
        />
        {addPeriodLabel}
      </Change>
      <Remove>
        <TrashIcon
          onClick={() => {
            set("selectedId", "ui_reducer", "", "") // sets the seleted ID in the reducer to nothing so the box will no longer show                                                                                                         // determines which income instance to show within the edit box
            remove(id)
          }}
        />
      </Remove>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 25rem;
  width: 75rem;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 4rem;
  width: 100%;
  background-color: #73706e;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  color: white;
  font-size: ${props => props.theme.fontSize.smallMedium};
`

const Change = styled.div`
  margin-top: 2rem;
  width: 30rem;
  height: 12rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  justify-content: space-around;
  position: absolute;
  top: 14rem;
  left: 29rem;
`
const TwoSliders = styled.div`
  display: flex;
  position: absolute;
  top: 5rem;
  left: 10rem;
  width: 40rem;
  justify-content: space-around;
`
const LastSlider = styled.div`
  width: 40rem;
  height: 20rem;
  position: absolute;
  left: 52rem;
  top: 5rem;
`
const TrashIcon = styled(Trash2)`
  height: 2.5rem;
  width: 2.5rem;
  color: #73706e;
`

const Remove = styled.div`
  height: 1.5rem;
  width: 4.5rem;
  position: absolute;
  top: 21rem;
  right: -1rem;
  font-size: 1.4rem;
  cursor: pointer;
  &:after {
    content: "remove";
    top: -2.5rem;
    right: 0.7rem;
    height: 2rem;
    width: 5rem;
    opacity: 0;
    position: absolute;
    transition: opacity 0.5s;
    z-index: 300000;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`
