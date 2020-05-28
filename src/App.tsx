import React from 'react';
import styled from "styled-components"
import Header from "components/Header"
import Footer from "components/Footer"
import {ThemeProvider} from "styled-components"
import {theme} from "styles/theme"
import {Onboard, Income} from "HOC/connectRedux_HOC"
import { Route } from "react-router-dom"
import { LandingPage } from "pages/landingPage/LandingPage"
import { Plan } from "pages/plan/Layout"
import {BrowserRouter} from "react-router-dom"

export const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <Wrapper>
      <Header/>
        <Content>
          <BrowserRouter>
                        <Route exact path="/" component={LandingPage}/>
                        <Route path="/onboarding" component={Onboard}/>
                        <Route path="/income" component={Income}/>
                        <Route exact path="/Plan" component={Plan} />
          </BrowserRouter>
        </Content>
      <Footer/> 
    </Wrapper>
    </ThemeProvider>
  );
};



//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  min-height: 120vh;
  min-width: 100vh;
`
const Content = styled.div`
background: rgb(252,252,252);
background: radial-gradient(circle, rgba(252,252,252,1) 47%, rgba(237,242,242,1) 100%);
  min-height: 80rem;
  width: 100%;
`