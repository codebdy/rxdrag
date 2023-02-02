import { useCallback } from "react";
import { MAX_ZOOM } from "../utils";
import { useZoom } from "./useZoom";


export function useZoomIn() {
  const { zoom = 1, setZoom } = useZoom()
  const zoomIn = useCallback(() => {
    let newZoom = zoom + 0.1;
    if (newZoom >= MAX_ZOOM) {
      newZoom = MAX_ZOOM;
    }
    setZoom(newZoom)
  }, [setZoom, zoom]);

  return zoomIn;
}