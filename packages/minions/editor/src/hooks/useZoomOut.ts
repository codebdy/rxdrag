import { useCallback } from "react";
import { MIN_ZOOM } from "./constants";
import { useZoom } from "./useZoom";

export function useZoomOut() {
  const { zoom = 1, setZoom } = useZoom()
  const zoomOut = useCallback(() => {
    let newZoom = zoom - 0.1;
    if (newZoom <= MIN_ZOOM) {
      newZoom = MIN_ZOOM;
    }
    setZoom(newZoom)
  }, [setZoom, zoom]);

  return zoomOut;
}
