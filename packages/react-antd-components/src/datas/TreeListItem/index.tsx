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
`

const Icon = styled.span`
  margin-right: 4px;
`

const Actions = styled.div`
 // position: absolute;
  //right:0;
  ///top:50%;
  //transform: translateY(-50%);
`

export const handleBlockClick = (e: React.MouseEvent) => {
  e.stopPropagation()
}

export type TreeListItemProps = {
  icon?: React.ReactNode,
  readOnly?: boolean,
  children?: React.ReactNode,
  fixed?: boolean,
  actions?: React.ReactNode,
}

export const TreeListItem = memo(forwardRef<HTMLDivElement, TreeListItemProps>((props, ref) => {
  const { icon, readOnly, children, fixed, actions } = props;
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
      {
        icon && <Icon>
          {icon}
        </Icon>
      }
      <Content>
        {children}
      </Content>

      {/* {node?.[labelKey]}
      <span style={{ display: 'none' }}>({count || 0})</span> */}
      {
        (hover || fixed) &&
        <Actions
          className="item-acions"
        //onClick={handleBlockClick}
        >
          {actions}
          {/* <EditButton
            parent={node}
            idKey={idKey}
            onOpenChange={handleAddOpenChange}
            labelKey={labelKey}
          />
          <EditButton
            parent={parent}
            value={node}
            idKey={idKey}
            labelKey={labelKey}
            onOpenChange={handleEditOpenChange}
          />
          <RemoveButton
            value={node}
            onOpenChange={handleDeleteOpenChange}
            idKey={idKey}
            labelKey={labelKey}
          /> */}
        </Actions>
      }

    </StyledItem>
  )
}))