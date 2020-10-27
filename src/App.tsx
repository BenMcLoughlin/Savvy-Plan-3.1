import React, { useMemo } from "react"
import styled from "styled-components"
import { Header, Footer, Login, PrivateRoute, Loading } from "view/components"
import { ThemeProvider } from "styled-components"
import { theme } from "model/styles/theme"
import { Account, Display, LandingPage, Pricing, Product, Questions } from "view/containers"
import { Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import * as pages_data from "data"
import { createPage } from "model/services/pages/createPage"
import { onboard_questions } from "controller/questions/onboarding"
import { connect } from "react-redux"
import * as I from "model/types"
import { set, remove } from "model/redux/actions"

const App = ({ remove, state, set }) => {
  const { progress, selectedPage } = state.ui_reducer
  const { isLoading } = state.auth_reducer

  const newPageData = pages_data[`${selectedPage}Page_data`] //each page has a function that recieves state and returns a large object with all the up to date values, this matches data with the selected page
 // console.log("state:", JSON.stringify(state, null, 4))
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Content>
          <BrowserRouter>
            <Header />
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/pricing" component={Pricing} />

                <PrivateRoute path="/account" component={Account} />
                <PrivateRoute path={`/onboarding`} render={() => <Questions data={onboard_questions(pages_data.onboard_data, state, set, progress, remove)} />} />
                <PrivateRoute exact path="/plan" render={() => <Display data={createPage(newPageData, state, set, "display", remove)} />} />
              </>
            )}
          </BrowserRouter>
        </Content>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  )
}

const mapStateToProps = (state: I.state) => ({
  state,
})

export default connect(mapStateToProps, { set, remove })(App)

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  min-height: 90vh;
  min-width: 110vh;
`
interface Props {}

const Content = styled.div<Props>`
  background: ${props => props.theme.background}
  width: 100%;
  width: 100%;
  min-height: 90rem;

  background: #FFFFFF;
background: -webkit-linear-gradient(top left, #FFFFFF, #F4F4F3);
background: -moz-linear-gradient(top left, #FFFFFF, #F4F4F3);
background: linear-gradient(to bottom right, #FFFFFF, #F4F4F3);
`
//background: radial-gradient(circle, rgba(227, 229, 230, 1) -20%, rgba(226, 226, 226, 1) 350%);

// GREEN
// background: #FFFFFF;
// background: -webkit-linear-gradient(left, #FFFFFF, #D3DAD8);
// background: -moz-linear-gradient(left, #FFFFFF, #D3DAD8);
// background: linear-gradient(to right, #FFFFFF, #D3DAD8);

// GREY
// background: -webkit-radial-gradient(top left, #FFFFFF, #DDDCDC);
// background: -moz-radial-gradient(top left, #FFFFFF, #DDDCDC);
// background: radial-gradient(to bottom right, #FFFFFF, #DDDCDC);

//GREY GREEN LINEAR
// background: #FFFFFF;
// background: -webkit-linear-gradient(left, #FFFFFF, #E8ECEB);
// background: -moz-linear-gradient(left, #FFFFFF, #E8ECEB);
// background: linear-gradient(to right, #FFFFFF, #E8ECEB);

//GREY RADIAL
// background: #FFFFFF;
// background: -webkit-radial-gradient(center, #FFFFFF, #F3F3F2);
// background: -moz-radial-gradient(center, #FFFFFF, #F3F3F2);
// background: radial-gradient(ellipse at center, #FFFFFF, #F3F3F2);

// background: #e6e6e6;
// background: -webkit-linear-gradient(bottom right, #e6e6e6, #ffffff);
// background: -moz-linear-gradient(bottom right, #e6e6e6, #ffffff);
// background: linear-gradient(to top left, #e6e6e6, #ffffff);
