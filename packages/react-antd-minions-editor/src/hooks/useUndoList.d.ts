import { ISnapshot } from "../interfaces/state";
export declare function useUndoList(): {
    undoList: ISnapshot[];
    setUndoList: (undos: ISnapshot[]) => void;
};
