import React, { FC, useState } from "react"
import styled from "styled-components"
interface Props {}

interface IProps {
  state: any
  set: any
}

export const ManageRedux: FC<IProps> = ({ state, set }) => {
  const [progress, setProgress] = useState<number>()

  return (
    <Wrapper>
      <Storage
        onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}
      >
        Clear Storage
      </Storage>
      <Progress>
        <Go onClick={() => set("progress", "ui_reducer", progress)}>go to</Go>
        <ProgressInput type="number" onChange={(e: any) => setProgress(+e.target.value)} />
      </Progress>
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  background: black;
  height: 7rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 12rem;
  color: white;
  padding: 1rem;
`
const Storage = styled.div`
  height: 5rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`
const ProgressInput = styled.input`
  height: 3rem;
  width: 2rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`
const Progress = styled.div`
  height: 5rem;
  width: 10rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
`
const Go = styled.button`
  height: 3rem;
  width: 4rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
`
