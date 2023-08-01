
import { useCallback } from "react";
import { useZoom } from "./useZoom";
import { MAX_ZOOM } from "./constants";

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