/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { EditButton } from "./EditButton"
import { RemoveButton } from "./RemoveButton"
import { handleBlockClick } from "./utils"

const StyledItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px 0;
`

const Icon = styled.span`
  margin-right: 4px;
`

const Actions = styled.div`
  position: absolute;
  right:0;
  top:50%;
  transform: translateY(-50%);
  .anticon{
    color: ${props => props.theme.token?.colorPrimary}
  }
`

export const TreeListItemLabel = memo((
  props: {
    node?: any,
    icon?: React.ReactNode,
    readOnly?: boolean,
    parent?: unknown,
    labelKey: string,
    idKey: string,
  }
) => {
  const { node, icon, readOnly, parent, labelKey, idKey } = props;
  const [hover, setHover] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleEditOpenChange = useCallback((opn: boolean) => {
    setEditOpen(opn);
  }, []);

  const handleAddOpenChange = useCallback((opn: boolean) => {
    setAddOpen(opn);
  }, []);

  const handleDeleteOpenChange = useCallback((opn: boolean) => {
    setDeleteOpen(opn);
  }, []);

  const count = useMemo(() => {
    return node?.[labelKey]
  }, [labelKey, node])

  return (
    <StyledItem
      className="tree-editor-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        icon && <Icon>
          {icon}
        </Icon>
      }
      {node?.[labelKey]}
      <span style={{ display: 'none' }}>({count || 0})</span>
      {
        (hover || editOpen || addOpen || deleteOpen) && !readOnly &&
        <Actions
          className="item-acions"
          onClick={handleBlockClick}
        >
          <EditButton
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
          />
        </Actions>
      }
    </StyledItem>
  )
})
