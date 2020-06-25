import React, { FC } from "react"
import styled from "styled-components"
import { AddButton } from "components/buttons/AddButton"

interface IProps {
  onClick(): void
  label: string
}

export const AddPrompt: FC<IProps> = ({ onClick, label }) => {
  return (
    <Wrapper>
      <AddButton onClick={onClick} />
      <P>{label}</P>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  width: 25rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  margin-left: 0rem;
  font-weight: bold;
  position: relative;
`
const P = styled.p`
  position: absolute;
  left: 3.3rem;
`