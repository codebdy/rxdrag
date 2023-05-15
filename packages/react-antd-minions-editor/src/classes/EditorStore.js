import { configureStore } from "@reduxjs/toolkit";
import { invariant } from "@rxdrag/shared";
import { mainReducer } from "../reducers/mainReducer";
export class EditorStore {
    store;
    constructor(debugMode) {
        this.store = makeStoreInstance(debugMode || false);
    }
    dispatch = (action) => {
        this.store.dispatch(action);
    };
    subscribeZoomChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().zoom;
        const handleChange = () => {
            const nextState = this.store.getState().zoom;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeMetasChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().metas;
        const handleChange = () => {
            const nextState = this.store.getState().metas;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeSelectedChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().selected;
        const handleChange = () => {
            const nextState = this.store.getState().selected;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeUndoLisrtChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().undoList;
        const handleChange = () => {
            const nextState = this.store.getState().undoList;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeRedoLisrtChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().redoList;
        const handleChange = () => {
            const nextState = this.store.getState().redoList;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
    subscribeChangeFlagChange(listener) {
        invariant(typeof listener === 'function', 'listener must be a function.');
        let previousState = this.store.getState().changeFlag;
        const handleChange = () => {
            const nextState = this.store.getState().changeFlag;
            if (nextState === previousState) {
                return;
            }
            previousState = nextState;
            listener(nextState);
        };
        return this.store.subscribe(handleChange);
    }
}
function makeStoreInstance(debugMode) {
    // TODO: if we ever make a react-native version of this,
    // we'll need to consider how to pull off dev-tooling
    const reduxDevTools = typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__;
    return configureStore({
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
    });
}
