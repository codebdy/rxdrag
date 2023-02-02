import { useCallback, useEffect, useState } from "react";
import { ActionType } from "../actions";
import { useEditorStore } from "./useEditorStore";

export function useZoom() {
  const [zoom, setZoom] = useState<number>()
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

  useEffect(()=>{
    setZoom(store?.store.getState().zoom)
  }, [store?.store])

  return { zoom, setZoom: doSetZoom }
}