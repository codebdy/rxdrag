import { TreeListItemProps } from "@rxdrag/react-antd-components"
import { forwardRef, memo, useCallback, useState } from "react"
import styled from "styled-components"

const StyledItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  flex:1;
  min-height: 32px;
  display: flex;
  align-items: center;
`

const Actions = styled.div`
`

export const TreeListItemDesigner = memo(forwardRef<HTMLDivElement, TreeListItemProps>((props, ref) => {
  const { children, fixed, actions } = props;
  const [hover, setHover] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <StyledItem
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Content>
        {children}
      </Content>

      {
        (hover || fixed) &&
        <Actions
          className="item-acions"
        >
          {actions}
        </Actions>
      }

    </StyledItem>
  )
}))