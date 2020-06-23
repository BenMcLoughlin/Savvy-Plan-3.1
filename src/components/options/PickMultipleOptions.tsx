import React, { FC, useState } from "react"
import styled from "styled-components"
import { ArrowLeftS } from "@styled-icons/remix-line"

interface IProps {
  array?: any
  reducer: string
  state: any
  user: string
  id: string
  set: (id: string, reducer: string, value: any, childId: string) => void
  remove: (id: string) => void
  textInput?: boolean
  onClick: (value: string) => void
}

export const PickMultipleOptions: FC<IProps> = ({ array, id, onClick, reducer, state, set, textInput, user, remove }) => {
  const { main_reducer } = state

  const [info, showInfo] = useState<string>("")

  console.log("user1Savings".includes(`${user}Savings`))
  console.log(user)

  const arrayOfAccounts = Object.values(main_reducer).filter((d: any) => d.id.includes(`${user}Savings`))

  console.log(arrayOfAccounts)

  return (
    <Wrapper>
      {array &&
        array.map((d: any) => {
          const selected = arrayOfAccounts.filter((v: any) => v.reg === d.reg).length > 0
          console.log(selected)
          return (
            <Square key={d.label} selected={selected}>
              <Text
                selected={selected}
                onClick={() => {
                  if (!selected && d.label !== "none") {
                    // check if the item doesnt already exist, or its not none, and will then create a new income st
                    onClick(d.reg)
                  } //checks if there is no currently selected version, if so it adds a new one, prevents adding mulitple with many clicks
                  if (selected) {
                    //the user needs to be able to remove the new object if they click on it again enabling them to undo the account they added.
                    const selectedInstance: any = Object.values(main_reducer).find((b: any) => b.reg === d.reg) //searches the main reducer to find the matching object to be removed
                    remove(selectedInstance.id) //removes it from the main reducer
                  }
                  if (d.label === "none") {
                    //the user needs to be able to remove the new object if they click on it again enabling them to undo the account they added.
                    const selectedInstances: any = Object.values(main_reducer).filter((b: any) => b.id.includes("savings")) //searches the main reducer to find the matching object to be removed
                    selectedInstances.map(instance => remove(instance.id))
                  }
                }}
              >
                <Circle />
                <CenterCircle selected={selected} />
                <Title>{d.label}</Title>
              </Text>
              <Expand
                onClick={() => {
                  if (info === d.reg) {
                    showInfo("")
                  } else {
                    showInfo(d.reg)
                  }
                }}
              >
                <Arrow open={info === d.reg} selected={selected} />
              </Expand>
              <Info open={info === d.reg}>{d.info}</Info>
            </Square>
          )
        })}
    </Wrapper>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  width: 34rem;
  min-height: 33rem;
  position: relative;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
`

interface SProps {
  selected: boolean
}

const Text = styled.div<SProps>`
  width: 100%;
  padding: 1rem;
  min-height: 6rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${props => (props.selected ? "white" : props.theme.color.darkGrey)};
`

const Square = styled.div<SProps>`
  position: relative;
  background: ${props => (props.selected ? props.theme.color.primary : "white")};
  &:nth-child(1) {
    border-radius: 10px 10px 0 0;
  }
  &:nth-last-child(1) {
    border-radius: 0 0 10px 10px;
  }
`

const Expand = styled.div`
  height: 4.8rem;
  position: absolute;
  right: 0rem;
  top: 0rem;
  width: 4.5rem;
`
interface IInfo {
  open: boolean
  selected?: boolean
}

const Info = styled.div<IInfo>`
  height: ${props => (props.open ? "20rem" : "0")};
  opacity: ${props => (props.open ? "1" : "0")};
  overflow-hidden;
  width: 100%;
  background: white;
  border: ${props => (props.open ? props.theme.color.lightGrey : null)};
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 0 2rem 0 2rem;
  transition: height 0.4s linear;
`

const Arrow = styled(ArrowLeftS)<IInfo>`
  height: 2.3rem;
  width: 2.3rem;
  color: ${props => (props.selected ? "white" : "grey")};
  transform: ${props => (props.open ? "rotate(-90deg)" : "rotate(90deg)")};
  transition: all 0.4s linear;
  position: absolute;
  top: 1rem;
  cursor: pointer;
  right: 0.8rem;
`
const Title = styled.div`
  margin-left: 3rem;
  font-size: 1.4rem;
  font-weight: 800;
  cursor: pointer;
`
const Circle = styled.div`
  height: 2rem;
  width: 2rem;
  font-size: 1.4rem;
  font-weight: 800;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.lightGrey};
  position: absolute;
  top: 1rem;
  left: 1.2rem;
`
const CenterCircle = styled.div<SProps>`
  height: 1.2rem;
  width: 1.2rem;
  font-size: 1.4rem;
  font-weight: 800;
  cursor: pointer;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 1.42rem;
  left: 1.6rem;
`
