import { createContext } from "react";
export const initialState = {
    changeFlag: 0,
    undoList: [],
    redoList: [],
    metas: {
        reactions: [],
        invokes: [],
    },
    selected: undefined,
    zoom: 1,
};
export const ReacionsEditorStoreContext = createContext(undefined);
export const GraphContext = createContext(undefined);
export const ControllerContext = createContext(undefined);
export const ControllersContext = createContext([]);
