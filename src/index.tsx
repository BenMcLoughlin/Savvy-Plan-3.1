import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import App from "App"
import { theme } from "model/styles/theme"
import { ThemeProvider } from "styled-components"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import root_reducer from "./model/redux/root_reducer"

export const store = createStore(root_reducer, composeWithDevTools())
export const stateV2 = store.getState()

const persistor: any = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
