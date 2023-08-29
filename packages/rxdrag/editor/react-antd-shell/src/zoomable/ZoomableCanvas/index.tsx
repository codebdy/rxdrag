import { memo, useState } from "react"
import styled from "styled-components"
import { ZoombaleCanvasShell } from "./ZoombaleCanvasShell"

const CanvasContainer = styled.div`
  padding: 400px;
  padding-top: 40px;
  min-width: 1200px;
  min-height: 1200px;
  cursor: grab;
`

export const ZoomableCanvas = memo(() => {
  const[grabbing, setGrabbing] = useState(false);

  return (
    <ZoombaleCanvasShell
      onGrabbing = {setGrabbing}
    >
      <CanvasContainer
        style={{
          cursor: grabbing ? "grabbing" : "grab"
        }}
      >
        <div style={{ width: 500, height: 500, background: 'black' }}>

        </div>
      </CanvasContainer>
    </ZoombaleCanvasShell>
  )
})