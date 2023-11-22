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
  position: absolute;
  right:0;
  top:50%;
  transform: translateY(-50%);
`

export const handleBlockClick = (e: React.MouseEvent) => {
  e.stopPropagation()
}

export type TreeListItemProps = {
  children?: React.ReactNode,
  fixed?: boolean,
  actions?: React.ReactNode,
}

export const TreeListItem = memo(forwardRef<HTMLDivElement, TreeListItemProps>((props, ref) => {
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
          onClick={handleBlockClick}
        >
          {actions}
        </Actions>
      }
    </StyledItem>
  )
}))