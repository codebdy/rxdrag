import { memo, useState } from "react"
import styled from "styled-components"
import { ZoombaleCanvasShell } from "./ZoombaleCanvasShell"
import { CanvasView } from "./CanvasView"

const CanvasContainer = styled.div`
  padding: 400px;
  padding-top: 16px;
  min-width: 1200px;
  min-height: 1200px;
  cursor: grab;
  display: flex;
`
const CanvasInner = styled.div`
  flex: 1;
  transform-origin: 0px 0px;
`

export const ZoomableCanvas = memo((

) => {
  const [zoom, setZoom] = useState(1)
  const [grabbing, setGrabbing] = useState(false);

  return (
    <ZoombaleCanvasShell
      onGrabbing={setGrabbing}
      zoom={zoom}
      onZoomChange={setZoom}
    >
      <CanvasContainer
        style={{
          cursor: grabbing ? "grabbing" : "grab"
        }}
      >
        <CanvasInner
          className="zoomable-canvas-inner"
          style={{
            transform: `scale(${zoom})`,
          }}
          draggable={false}
        >
          <CanvasView />
        </CanvasInner>
      </CanvasContainer>
    </ZoombaleCanvasShell>
  )
})