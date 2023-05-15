import { ISnapshot } from "../interfaces/state";
export declare function useRedoList(): {
    redoList: ISnapshot[];
    setRedoList: (redos: ISnapshot[]) => void;
};
