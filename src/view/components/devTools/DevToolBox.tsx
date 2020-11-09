import React, { FC, useState } from "react"
import styled from "styled-components"
import { useHttpClient } from "view/hooks"
interface IProps {
  state: any
  set: any
}

export const DevToolBox: FC<IProps> = ({ state, set }) => {
  const [progress, setProgress] = useState<number>()
  const [open, toggleOpen] = useState<boolean>(false)
  const { sendRequest } = useHttpClient(set)

  const saveStore = async () => {
    await sendRequest(`/api/store/saveStore`, "PATCH", JSON.stringify(state), {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + state.auth_reducer.token,
    })
  }

  return (
    <Wrapper open={open} onClick={() => toggleOpen(!open)}>
      <Title>Dev Toolbox</Title>
      <Go onClick={() => set("progress", "ui_reducer", progress)}>go to</Go>
      <ProgressInput type="number" onChange={(e: any) => setProgress(+e.target.value)} />
      {/* <Storage
        onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}
      >
        Clear Storage
      </Storage>
      <Progress>

        <Go onClick={() => saveStore()}>Save data </Go>
     
      </Progress> */}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

interface Wrapper {
  open: boolean
}
const Wrapper = styled.div<Wrapper>`
  background: black;
  height: 17rem;
  width: ${props => (props.open ? "30rem" : "4rem")};
  display: flex;
  flex-direction: column;
  left: 12rem;
  color: white;
  padding: 1rem;
  position: absolute;
  bottom: 9rem;
  left: 0rem;

  transition: all 0.5s ease;
  border-radius: 0 0 10px 10px;
  ${props => props.theme.neomorph}
`
const Title = styled.div`
  height: 5rem;
  width: 10rem;
  margin-top: 3rem;
  margin-left: -5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${props => props.theme.color.darkGrey};
  transform: rotate(90deg);
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
