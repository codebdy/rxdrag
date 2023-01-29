import { useCallback } from "react";
import { ActionType } from "../actions";
import { MIN_ZOOM } from "../utils";
import { useEditorState } from "./useEditorState";

export function useZoomOut() {
  const { zoom, dispatch } = useEditorState()
  const zoomOut = useCallback(() => {
    let newZoom = zoom - 0.1;
    if (newZoom <= MIN_ZOOM) {
      newZoom = MIN_ZOOM;
    }
    dispatch({ type: ActionType.SET_ZOOM, payload: newZoom })
  }, [dispatch, zoom]);

  return zoomOut;
}
