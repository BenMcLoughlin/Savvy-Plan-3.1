import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import { stream_reducer } from "model/redux/stream_reducer"
import user_reducer from "model/redux/user_reducer"
import ui_reducer from "model/redux/ui_reducer"
import { auth_reducer } from "model/redux/auth_reducer"
import { encryptTransform } from "redux-persist-transform-encrypt"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["stream_reducer", "user_reducer", "ui_reducer", "auth_reducer"],
  transforms: [
    encryptTransform({
      secretKey: `${process.env.LOCAL_STORAGE_PASSWORD}`,
      onError: function (error) {
        console.log(error.message)
      },
    }),
  ],
}

const root_reducer = combineReducers({
  ui_reducer,
  stream_reducer,
  user_reducer,
  auth_reducer,
})

export default persistReducer(persistConfig, root_reducer)
