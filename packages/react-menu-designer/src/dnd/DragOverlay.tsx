import { CSSProperties, memo, useContext, useRef } from "react"
import styled from "styled-components"
import { useActiveIdState } from "../hooks/useActiveIdState";
import { DraggableContext } from "./contexts";
import { createPortal } from 'react-dom';

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
  const [activeId] = useActiveIdState();
  const draggableId = useContext(DraggableContext)
  const ref = useRef<HTMLDivElement>(null)
  const display = !!activeId && draggableId === activeId;

  return (
    display
      ? createPortal(
        <OverLayContainer
          ref={ref}
          {...props}
        />,
        document.body
      )
      : <></>
  )
})