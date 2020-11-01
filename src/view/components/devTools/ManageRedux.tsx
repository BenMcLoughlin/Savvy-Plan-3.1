import React, { FC, useState } from "react"
import styled from "styled-components"
import { useHttpClient } from "view/hooks"
interface IProps {
  state: any
  set: any
}

export const ManageRedux: FC<IProps> = ({ state, set }) => {
  const [progress, setProgress] = useState<number>()
  const { sendRequest } = useHttpClient(set)

  const sendStore = async () => {
    await sendRequest(`http://localhost:5000/api/store/signup`, "POST", JSON.stringify(state), {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth_reducer.token,
    })
  }

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
        <Go onClick={() => sendStore()}>Send data </Go>
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
