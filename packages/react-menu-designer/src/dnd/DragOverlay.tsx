import { CSSProperties, memo, useContext, useRef } from "react"
import styled from "styled-components"
import { DraggableContext } from "./contexts";
import { createPortal } from 'react-dom';
import { useDndSnapshot } from "./hooks/useDndSnapshot";

const OverLayContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1;
`

export const DragOverlay = memo((
  props: {
    children?: React.ReactNode,
    className?: string,
    style?: CSSProperties,
  }
) => {
  const { style, ...rest } = props;
  const snapshot = useDndSnapshot()
  const draggableId = useContext(DraggableContext)
  const ref = useRef<HTMLDivElement>(null)
  const display = snapshot?.draggingId && draggableId === snapshot?.draggingId;

  return (
    display
      ? createPortal(
        <OverLayContainer
          ref={ref}
          {...rest}
          style={
            {
              width: snapshot.startRect?.width,
              height: snapshot.startRect?.height,
              ...style,
              left: snapshot.startRect?.left,
              top: snapshot.startRect?.top,
              transform: `translate(${snapshot.draggingOffset?.x || 0}px, ${snapshot.draggingOffset?.y || 0}px)`
            }
          }
        />,
        document.body
      )
      : <></>
  )
})