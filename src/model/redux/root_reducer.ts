import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { main_reducer } from "model/redux/main_reducer"
import user_reducer from "model/redux/user_reducer"
import ui_reducer from "model/redux/ui_reducer"
import { auth_reducer } from "model/redux/auth_reducer"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["main_reducer", "user_reducer", "ui_reducer", "auth_reducer"],
}

const root_reducer = combineReducers({
  ui_reducer,
  main_reducer,
  user_reducer,
  auth_reducer,
})

export default persistReducer(persistConfig, root_reducer)
