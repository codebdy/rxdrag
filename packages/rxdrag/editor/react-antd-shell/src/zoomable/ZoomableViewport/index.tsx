import { memo, useState } from "react"
import styled from "styled-components"
import { ZoomableViewportShell } from "./ZoomableViewportShell"

const CanvasContainer = styled.div`
  padding: 400px;
  padding-top: 16px;
  min-width: 1200px;
  min-height: 1200px;
  cursor: grab;
  display: flex;
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

  return (
    <ZoomableViewportShell
      onGrabbing={setGrabbing}
      zoom={zoom}
      onZoomChange={setZoom}
    >
      <CanvasContainer
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
      </CanvasContainer>
    </ZoomableViewportShell>
  )
})