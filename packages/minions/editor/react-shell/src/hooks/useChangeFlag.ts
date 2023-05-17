import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "./useEditorStore";
import { ActionType } from "../actions";

export function useChangeFlag() {
  const [changeFlag, setChangeFlag] = useState<number>(0)
  const store = useEditorStore()

  const handleChangeFlagChange = useCallback((selected: number) => {
    setChangeFlag(selected)
  }, [])

  const doSetChangeFlag = useCallback((changeFlag: number) => {
    store?.dispatch({ type: ActionType.SET_CHANGE_FLAG, payload: changeFlag })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeChangeFlagChange(handleChangeFlagChange)
    return unsub
  }, [handleChangeFlagChange, store])

  useEffect(() => {
    setChangeFlag(store?.store.getState().changeFlag || 0)
  }, [store?.store])

  return { changeFlag, setChangeFlag: doSetChangeFlag }
}