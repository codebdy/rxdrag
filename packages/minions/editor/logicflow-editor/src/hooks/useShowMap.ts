import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "./useEditorStore";
import { ActionType } from "../actions";

export function useShowMap() {
  const [showMap, setShowMap] = useState<boolean>()
  const store = useEditorStore()

  const handleShowMapChange = useCallback((sm: boolean) => {
    setShowMap(sm)
  }, [])

  const doSetZoom = useCallback((sm: boolean) => {
    store?.dispatch({ type: ActionType.SHOW_MAP, payload: sm })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeShowMapChange(handleShowMapChange)
    return unsub
  }, [handleShowMapChange, store])

  useEffect(() => {
    setShowMap(store?.store.getState().showMap || false)
  }, [store?.store])

  return { showMap, setShowMap: doSetZoom }
}