import { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { ZoomableViewportShell } from "./ZoomableViewportShell"
import { useCanvasConfig } from "@rxdrag/react-core"

const ViewPort = styled.div`
  padding: 800px;
  padding-top: 16px;
  min-width: 5200px;
  min-height: 1200px;
  cursor: grab;
  display: block;
`
const ViewportInner = styled.div`
  flex: 1;
  transform-origin: 0px 0px;
`

export const ZoomableViewport = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  const [zoom, setZoom] = useState(1)
  const [grabbing, setGrabbing] = useState(false);
  const canvasConfig = useCanvasConfig()

  useEffect(() => {
    setZoom((canvasConfig?.canvasWidth && canvasConfig.screenWidth) ? canvasConfig?.canvasWidth / canvasConfig.screenWidth : 1)
  }, [canvasConfig?.canvasWidth, canvasConfig?.screenWidth])

  return (
    <ZoomableViewportShell
      onGrabbing={setGrabbing}
      zoom={zoom}
      onZoomChange={setZoom}
    >
      <ViewPort
        className="zoomable-viewport"
        style={{
          cursor: grabbing ? "grabbing" : "grab"
        }}
      >
        <ViewportInner
          className="zoomable-canvas-inner"
          style={{
            transform: `scale(${zoom})`,
          }}
          draggable={false}
        >
          {children}
        </ViewportInner>
      </ViewPort>
    </ZoomableViewportShell>
  )
})