import { configureStore } from "@reduxjs/toolkit";
import { invariant } from "@rxdrag/shared"
import { Store } from "redux";
import { Action } from "../actions";
import { ISnapshot, IState } from "../interfaces/state";
import { ChangeFlagChangeListener, MetasChangeListener, RedoListChangeListener, SelectedChangeListener, UndoListChangeListener, ZoomChangeListener } from "../interfaces/interfaces";
import { mainReducer } from "../reducers/mainReducer";

export class EditorStore {
  store: Store<IState>
  constructor(debugMode?: boolean,) {
    this.store = makeStoreInstance(debugMode || false)
  }

  dispatch = (action: Action) => {
    this.store.dispatch(action)
  }

  subscribeZoomChange(listener: ZoomChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: number | undefined = this.store.getState().zoom

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

  subscribeMetasChange(listener: MetasChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: IState = this.store.getState()

    const handleChange = () => {
      const nextState = this.store.getState()
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeSelectedChange(listener: SelectedChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: string | undefined = this.store.getState().selected

    const handleChange = () => {
      const nextState = this.store.getState().selected
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeUndoLisrtChange(listener: UndoListChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: ISnapshot[] | undefined = this.store.getState().undoList

    const handleChange = () => {
      const nextState = this.store.getState().undoList
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }

  subscribeRedoLisrtChange(listener: RedoListChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: ISnapshot[] | undefined = this.store.getState().redoList

    const handleChange = () => {
      const nextState = this.store.getState().redoList
      if (nextState === previousState) {
        return
      }
      previousState = nextState
      listener(nextState)
    }

    return this.store.subscribe(handleChange)
  }


  subscribeChangeFlagChange(listener: ChangeFlagChangeListener) {
    invariant(typeof listener === 'function', 'listener must be a function.')
    let previousState: number = this.store.getState().changeFlag

    const handleChange = () => {
      const nextState = this.store.getState().changeFlag
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
