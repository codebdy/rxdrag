import { useCallback, useEffect, useState } from "react";
import { ActionType } from "../actions";
import { useEditorStore } from "./useEditorStore";
export function useChangeFlag() {
    const [changeFlag, setChangeFlag] = useState(0);
    const store = useEditorStore();
    const handleChangeFlagChange = useCallback((selected) => {
        setChangeFlag(selected);
    }, []);
    const doSetChangeFlag = useCallback((changeFlag) => {
        store?.dispatch({ type: ActionType.SET_CHANGE_FLAG, payload: changeFlag });
    }, [store]);
    useEffect(() => {
        const unsub = store?.subscribeChangeFlagChange(handleChangeFlagChange);
        return unsub;
    }, [handleChangeFlagChange, store]);
    useEffect(() => {
        setChangeFlag(store?.store.getState().changeFlag || 0);
    }, [store?.store]);
    return { changeFlag, setChangeFlag: doSetChangeFlag };
}
