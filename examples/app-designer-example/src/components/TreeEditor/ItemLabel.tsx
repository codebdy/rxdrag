import { memo, useCallback, useMemo, useState } from "react"
import { EditButton } from "./EditButton"
import type { FieldNames } from "."
import { RemoveButton } from "./RemoveButton"
import { handleBlockClick } from "./utils"
import styled from "styled-components";

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

export const ItemLabel = memo((
  props: {
    node?: unknown,
    entityConfig: IEntityConfig,
    treeFieldNames?: FieldNames,
    icon?: React.ReactNode,
    readOnly?: boolean,
    parent?: unknown,
  }
) => {
  const { node, entityConfig, treeFieldNames, icon, readOnly, parent } = props;
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
    return node?.[treeFieldNames?.count || ""]
  }, [node, treeFieldNames?.count])

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
      {node?.[treeFieldNames?.name || ""]}
      <span style={{display: 'none'}}>({count || 0})</span>
      {
        (hover || editOpen || addOpen || deleteOpen) && !readOnly &&
        <Actions
          className="item-acions"
          onClick={handleBlockClick}
        >
          <EditButton
            parent={node}
            treeFieldNames={treeFieldNames}
            entityConfig={entityConfig}
            onOpenChange={handleAddOpenChange}
          />
          <EditButton
            parent={parent}
            value={node}
            treeFieldNames={treeFieldNames}
            entityConfig={entityConfig}
            onOpenChange={handleEditOpenChange}
          />
          <RemoveButton
            value={node}
            treeFieldNames={treeFieldNames}
            entityConfig={entityConfig}
            onOpenChange={handleDeleteOpenChange}
          />
        </Actions>
      }
    </StyledItem>
  )
})
