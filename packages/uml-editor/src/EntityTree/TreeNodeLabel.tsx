import React, { useCallback, useState } from "react"
import { memo } from "react"
import styled from "styled-components";

const Label = styled.div`
  position: relative;
  display: flex;
  flex:1;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  .node-actions{
    position: absolute;
    right:0;
    z-index: 1;
  }
`

export const TreeNodeLabel = memo((
  props: {
    action?: React.ReactNode,
    children?: React.ReactNode,
    fixedAction?: boolean,
    onClick?: (event: React.MouseEvent<unknown>) => void,
  }
) => {
  const { action, children, fixedAction, onClick } = props;
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback(() => {
    setHover(true)
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false)
  }, []);

  return (
    <Label
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      {
        (hover || fixedAction) &&
        <div className="node-actions" onClick={e => e.stopPropagation()}>
          {action}
        </div>
      }
    </Label>
  )
})

export default TreeNodeLabel