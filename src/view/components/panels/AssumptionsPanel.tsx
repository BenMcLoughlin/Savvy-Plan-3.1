/* eslint-disable */
import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import * as I from "model/types"
import { DualSelect, Slider } from "view/components"
import { ArrowLeftS } from "@styled-icons/remix-line"
import { ThreeDotsVertical } from "@styled-icons/bootstrap"
import { assumptions_props } from "controller/assumptions/assumptions_props"
import { store } from "index"
import { TransitionGroup, CSSTransition } from "react-transition-group"

interface IProps {
  showAssumptionsPanel?: boolean
  showRetirementTabs?: boolean
}

export const AssumptionsPanel: FC<IProps> = ({ showAssumptionsPanel, showRetirementTabs }) => {
  const state = store.getState()
  const {
    ui_reducer: { isMarried },
  } = state

  const { firstName } = state.user_reducer.user1

  const [panelState, setPanelState] = useState({
    panelOpen: false,
    sideTabVisible: false,
    retirementTabVisible: false,
    selectedPanelTab: "rates",
    selectedUserTab: firstName,
  })

  const setValue = newState => {
    setPanelState({ ...panelState, ...newState })
  }

  const {
    panelOpen,
    sideTabVisible,
    retirementTabVisible,
    selectedPanelTab,
    selectedUserTab,
  } = panelState

  const { slidersArray, user1Name, user2Name } = assumptions_props(
    selectedPanelTab,
    selectedUserTab
  )

  const transitionKeys = ["rates", "retirementFactors", user1Name, user2Name]

  useEffect(() => {
    if (showAssumptionsPanel) {
      setValue({ sideTabVisible: true })
      setTimeout(() => {
        setValue({ sideTabVisible: true, panelOpen: true })
      }, 1000)
    }
    if (showRetirementTabs) {
      setValue({ retirementTabVisible: true })
      setTimeout(() => {
        setValue({
          retirementTabVisible: true,
          selectedPanelTab: "retirementFactors",
          panelOpen: true,
        })
      }, 1000)
    }
  }, [showAssumptionsPanel, showRetirementTabs])

  return (
    <>
      {sideTabVisible && (
        <Wrapper panelOpen={panelOpen}>
          {retirementTabVisible && (
            <Tabs panelOpen={panelOpen}>
              <DualSelect
                type={"tab"}
                handleChange={value => setValue({ selectedPanelTab: value })}
                handleChange2={value => setValue({ selectedPanelTab: value })}
                option1={"rates"}
                option2={"retirementFactors"}
                value={selectedPanelTab === "rates"}
              />{" "}
              {isMarried && (
                <UserSelector selectedPanelTab={selectedPanelTab}>
                  <DualSelect
                    type={"tab"}
                    handleChange={value => setValue({ selectedUserTab: value })}
                    handleChange2={value => setValue({ selectedUserTab: value })}
                    option1={user1Name}
                    option2={user2Name}
                    value={selectedUserTab === user1Name}
                  />
                </UserSelector>
              )}
            </Tabs>
          )}
          <Panel panelOpen={panelOpen}>
            {!panelOpen && (
              <Title onClick={() => setValue({ panelOpen: !panelOpen })}>
                <DotsIcon /> Assumptions
              </Title>
            )}
            {panelOpen && (
              <>
                <TransitionGroup component={null}>
                  {transitionKeys.map(
                    transitionKey =>
                      (transitionKey === selectedPanelTab || transitionKey === selectedUserTab) && (
                        <CSSTransition timeout={800} classNames="fade-in">
                          <Row>
                            {slidersArray.map(data => (
                              <Slider {...data} />
                            ))}
                          </Row>
                        </CSSTransition>
                      )
                  )}
                </TransitionGroup>

                <ArrowLeft onClick={() => setValue({ panelOpen: !panelOpen })} />
              </>
            )}
          </Panel>
        </Wrapper>
      )}
    </>
  )
}
//${props => (props.panelOpen ? "70rem" : "4rem")};
//  ${props => props.theme.neomorph}
//---------------------------STYLES-------------------------------------------//

interface Props {
  panelOpen?: boolean
  selectedPanelTab?: string
}
const Wrapper = styled.div<Props>`
  position: absolute;
  top: 55rem;
  left: 0rem;
  z-index: 500;
`
const Panel = styled.div<Props>`
  height: 20rem;
  width: ${props => (props.panelOpen ? "110rem" : "4rem")};
  justify-content: space-around;
  color: white;
  padding: 1rem;
  transition: all 0.5s ease;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  ${props => props.theme.neomorph};
`

const Title = styled.div`
  height: 5rem;
  width: 15rem;
  margin-top: 4rem;
  margin-left: -6.6rem;
  cursor: pointer;
  font-size: 1.7rem;
  color: ${props => props.theme.color.darkGrey};
  transition: all 0.5s ease;
  letter-spacing: 0.1rem;
  transform: rotate(90deg);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-weight: ;
`

const Tabs = styled.div<Props>`
  width: ${props => (props.panelOpen ? "70rem" : "0rem")};
  position: absolute;
  height: 4rem;
  top: -4.2rem;
  z-index: 5000;
  overflow: hidden;
  display: flex;
  transition: all 0.5s ease;
`

const Row = styled.div`
  display: flex;
  flex-wrap: start;
  flex-gap: 3rem;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  margin-left: 5rem;
  > * {
    margin-left: 1rem;
  }
`
const UserSelector = styled.div<Props>`
  width: ${props => (props.selectedPanelTab === "retirementFactors" ? "35rem" : "0rem")};
  height: 3rem;
  transition: all 0.5s ease;
  overflow: hidden;
  position: absolute;
  top: 0.4rem;
  left: 2rem;
  position: relative;
`

const ArrowLeft = styled(ArrowLeftS)`
  height: 4.2rem;
  width: 4.2rem;
  color: #c8c7c7;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
`
const DotsIcon = styled(ThreeDotsVertical)`
  height: 2rem;
  width: 2rem;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  color: ${props => props.theme.color.primary};
  cursor: pointer;
`
