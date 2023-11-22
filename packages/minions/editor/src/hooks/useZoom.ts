import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "./useEditorStore";
import { ActionType } from "../actions";

export function useZoom() {
  const [zoom, setZoom] = useState<number>(0)
  const store = useEditorStore()
  const handleZoomChange = useCallback((zm: number) => {
    setZoom(zm)
  }, [])

  const doSetZoom = useCallback((zm: number) => {
    store?.dispatch({ type: ActionType.SET_ZOOM, payload: zm })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeZoomChange(handleZoomChange)
    return unsub
  }, [handleZoomChange, store])

  useEffect(() => {
    setZoom(store?.store.getState().zoom || 0)
  }, [store?.store])

  return { zoom, setZoom: doSetZoom }
}