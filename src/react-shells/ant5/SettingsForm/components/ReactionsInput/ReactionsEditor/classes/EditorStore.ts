import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import { Action } from "../actions";
import { IState } from "../contexts";
import { mainReducer } from "../reducers/mainReducer";

export class EditorStore {
  store: Store<IState>
  constructor(debugMode?: boolean,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  dispatch(action: Action) {
    this.store.dispatch(action)
  }
}

function makeStoreInstance(debugMode: boolean): Store<IState> {
  // TODO: if we ever make a react-native version of this,
  // we'll need to consider how to pull off dev-tooling
  const reduxDevTools =
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  return configureStore(
    {
      reducer: mainReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
      devTools: debugMode &&
        reduxDevTools &&
        reduxDevTools({
          name: 'dnd-core',
          instanceId: 'dnd-core',
        }),
    }
  )
}
