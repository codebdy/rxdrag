import { useCallback, useEffect, useState } from "react";
import { ActionType } from "../actions";
import { useEditorStore } from "./useEditorStore";
export function useRedoList() {
    const [redoList, setRedoList] = useState([]);
    const store = useEditorStore();
    const handleRedoListChange = useCallback((redos) => {
        setRedoList(redos);
    }, []);
    const doSetRedoList = useCallback((redos) => {
        store?.dispatch({ type: ActionType.SET_REDOLIST, payload: redos });
    }, [store]);
    useEffect(() => {
        const unsub = store?.subscribeRedoLisrtChange(handleRedoListChange);
        return unsub;
    }, [handleRedoListChange, store]);
    useEffect(() => {
        setRedoList(store?.store.getState().redoList || []);
    }, [store?.store]);
    return { redoList, setRedoList: doSetRedoList };
}
