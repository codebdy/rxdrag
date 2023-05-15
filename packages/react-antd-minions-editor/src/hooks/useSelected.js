import { useCallback, useEffect, useState } from "react";
import { ActionType } from "../actions";
import { useEditorStore } from "./useEditorStore";
export function useSelected() {
    const [selected, setSelected] = useState();
    const store = useEditorStore();
    const handleSelectedChange = useCallback((selected) => {
        setSelected(selected);
    }, []);
    const doSetSelected = useCallback((selected) => {
        store?.dispatch({ type: ActionType.SELECTION, payload: selected });
    }, [store]);
    useEffect(() => {
        const unsub = store?.subscribeSelectedChange(handleSelectedChange);
        return unsub;
    }, [handleSelectedChange, store]);
    useEffect(() => {
        setSelected(store?.store.getState().selected);
    }, [store?.store]);
    return { selected, setSelected: doSetSelected };
}
