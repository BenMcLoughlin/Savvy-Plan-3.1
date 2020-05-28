import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore} from 'redux'
import root_reducer from "./redux/root_reducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import { App } from "App"
import {theme} from "styles/theme"
import {ThemeProvider} from "styled-components"
// import {persistStore} from "redux-persist"
// import {PersistGate} from "redux-persist/integration/react"

const store = createStore(root_reducer,
  composeWithDevTools(    ));




ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
          <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


