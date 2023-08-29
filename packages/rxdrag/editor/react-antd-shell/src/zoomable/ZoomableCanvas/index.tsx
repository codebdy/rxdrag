import { memo } from "react"
import styled from "styled-components"

const CanvasContainer = styled.div`
  min-width: 1200px;
  min-height: 1200px;
  cursor: grab;
`

export const ZoomableCanvas = memo(() => {

  return (
    <CanvasContainer>
      <div style={{ width: 500, height: 500, background: 'black' }}>

      </div>
    </CanvasContainer>
  )
})