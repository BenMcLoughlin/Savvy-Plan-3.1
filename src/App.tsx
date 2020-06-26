import React from "react"
import styled from "styled-components"
import Header from "components/Header"
import Footer from "components/Footer"
import { ThemeProvider } from "styled-components"
import { theme } from "styles/theme"
import { Onboard, Layout } from "HOC/connectRedux_HOC"
import { Route } from "react-router-dom"
import { LandingPage } from "pages/landingPage/LandingPage"
import { BrowserRouter } from "react-router-dom"
import { onboard_data } from "data/wizard/wizard_data"

interface IProps {
  state: any
  set: (id: string, reducer: string, value: any, childId?: string) => void
  remove: (id: string) => void
}

export const App = ({ remove, state, set }) => {
  const { progress } = state.ui_reducer

  const data = onboard_data(state, set, progress, remove)

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header />
        <Content>
          <BrowserRouter>
            <Route exact path="/" component={LandingPage} />
            <Route path="/onboarding" render={() => <Onboard data={data} />} />
            <Route exact path="/Plan" component={Layout} />
          </BrowserRouter>
        </Content>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  min-height: 120vh;
  min-width: 100vh;
`
const Content = styled.div`
  background: rgb(255, 255, 255);
  background: radial-gradient(circle, rgba(255, 255, 255, 1) -20%, rgba(226, 226, 226, 1) 350%);
  height: 90rem;
  width: 100%;
`
