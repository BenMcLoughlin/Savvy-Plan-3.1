import React, { FC } from "react"
import styled from "styled-components"
import { Exit } from "components/buttons/Exit"
import { TripleSliderSelector, DualSelect, ColorSelect, EditTitle } from "components"
import { Trash2 } from "@styled-icons/feather/Trash2"
import * as I from "types"

interface ISliderProps {
  editPeriod: any
  set: I.set
  remove: I.remove
  id: string;
  handleColorChange: (value: string) => void;
  handleTitleChange: (value: string) => void;
  colorValue: string;
  nameValue: string;
}

export const EditPanel: FC<ISliderProps> = ({ editPeriod, remove, set}) => {
  
const {id, handleColorChange, handleTitleChange, handleExit, colorValue, nameValue, newStream } = editPeriod

  return (
    <Wrapper>
      <Header>
         <ColorSelect handleChange={(value: string) => handleColorChange(value)} value={colorValue}  />
        <EditTitle handleChange={(value: string) => handleTitleChange(value)} value={nameValue} selectedFocus={newStream}/>  
        {editPeriod.dualSelectorProps && <DualSelect {...editPeriod.dualSelectorProps} />}
        <Exit handleChange={() => handleExit()} />
      </Header>
      <Center>
        <TripleSliderSelector {...editPeriod.tripleSliders} />
      </Center>
      <BottomRight>
        <TrashIcon
          onClick={() => {
            set("selectedId", "ui_reducer", "", "") // sets the seleted ID in the reducer to nothing so the box will no longer show                                                                                                         // determines which income instance to show within the edit box
            remove(id)
          }}
        />
      </BottomRight>
    </Wrapper>
  )
}


//-----------------------------------------------style-----------------------------------------------//

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
  margin-top: -2rem;
  z-index: 200;
`
const Header = styled.div`
  height: 4rem;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  color: white;
  font-size: ${props => props.theme.fontSize.smallMedium};
  border-bottom: 0.3px solid ${props => props.theme.color.lightGrey};
`

const TrashIcon = styled(Trash2)`
  height: 2.5rem;
  width: 2.5rem;
  color: #73706e;
`
const Center = styled.div`
  display: flex;
  position: absolute;
  top: 5rem;
`
const BottomRight = styled.div`
  position: absolute;
  top: 21rem;
  right: 1rem;
`
