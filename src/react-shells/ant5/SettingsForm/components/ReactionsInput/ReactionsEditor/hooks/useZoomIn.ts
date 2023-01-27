import { useCallback } from "react";
import { ActionType } from "../actions";
import { MAX_ZOOM } from "../utils";
import { useEditorState } from "./useEditorState";


export function useZoomIn() {
  const { zoom, dispatch } = useEditorState()
  const zoomIn = useCallback(() => {
    let newZoom = zoom + 0.1;
    if (newZoom >= MAX_ZOOM) {
      newZoom = MAX_ZOOM;
    }
    dispatch({ type: ActionType.SET_ZOOM, payload: newZoom })
  }, [dispatch, zoom]);

  return zoomIn;
}