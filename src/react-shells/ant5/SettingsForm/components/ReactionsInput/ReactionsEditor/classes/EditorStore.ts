import { configureStore } from "@reduxjs/toolkit";
import { invariant } from "core/utils/util-invariant";
import { Store } from "redux";
import { Action } from "../actions";
import { IState } from "../contexts";
import { ZoomChangeListener } from "../interfaces";
import { mainReducer } from "../reducers/mainReducer";

export class EditorStore {
  store: Store<IState>
  constructor(debugMode?: boolean,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  dispatch(action: Action) {
    this.store.dispatch(action)
  }

  subscribeZoomChange(listener: ZoomChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: any = this.store.getState().zoom

    const handleChange = () => {
      const nextState = this.store.getState().zoom
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
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
