import classNames from "classnames"
import { memo, useMemo } from "react"
import styled from "styled-components"
import { CANVS_ID } from "../../consts"
import { Droppable } from "../../dnd"
import { SortableItem } from "./SortableItem"
import { useFlattenItems } from "../../hooks/useFlattenItems"
import { ID } from "@rxdrag/shared"

const DropContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  padding: 4px 8px;
  user-select: none;
  box-sizing: border-box;
  &.over{
    background-color: ${props => props.theme.token?.colorBgElevated};
  }
`

export const SortableTree = memo((
  props: {
    indentationWidth: number,
    tempId?: ID,
    draggingId?: ID,
    selectedId?: ID,
    onSelect?: (id?: ID) => void,
  }
) => {
  const { tempId, indentationWidth, draggingId, selectedId, onSelect } = props;
  const items = useFlattenItems(draggingId)

  const childIds = useMemo(() => items.filter(item => item.meta.id !== tempId).map(item => item.meta.id), [items, tempId])

  return (
    <Droppable
      droppableId={CANVS_ID}
      items={childIds}
    >
      {
        (innerRef, snapshot) => {
          return (
            <DropContainer ref={innerRef} className={classNames('menu-drop-container', { over: snapshot?.isDraggingOver })}>
              {
                items?.map((item) => {
                  return (<SortableItem
                    key={item.meta.id}
                    item={item}
                    tempId={tempId}
                    indentationWidth={indentationWidth}
                    selectedId = {selectedId}
                    onSelect = {onSelect}
                  />)
                })
              }
            </DropContainer>
          )
        }
      }
    </Droppable>
  )
})