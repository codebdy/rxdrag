import { Store } from "redux";
import { Action } from "../actions";
import { IState } from "../interfaces/state";
import { ChangeFlagChangeListener, MetasChangeListener, RedoListChangeListener, SelectedChangeListener, UndoListChangeListener, ZoomChangeListener } from "../interfaces/interfaces";
export declare class EditorStore {
    store: Store<IState>;
    constructor(debugMode?: boolean);
    dispatch: (action: Action) => void;
    subscribeZoomChange(listener: ZoomChangeListener): import("redux").Unsubscribe;
    subscribeMetasChange(listener: MetasChangeListener): import("redux").Unsubscribe;
    subscribeSelectedChange(listener: SelectedChangeListener): import("redux").Unsubscribe;
    subscribeUndoLisrtChange(listener: UndoListChangeListener): import("redux").Unsubscribe;
    subscribeRedoLisrtChange(listener: RedoListChangeListener): import("redux").Unsubscribe;
    subscribeChangeFlagChange(listener: ChangeFlagChangeListener): import("redux").Unsubscribe;
}
