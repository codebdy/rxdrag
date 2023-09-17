import classNames from "classnames"
import { memo } from "react"
import styled from "styled-components"
import { CANVS_ID } from "../../consts"
import { Droppable } from "../../dnd"
import { IFlattenedItem } from "../../interfaces/flattened"
import { SortableItem } from "./SortableItem"

const DropContainer = styled.div`
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

const Ghost = styled.div`
  display: flex;
  padding: 8px 2px;
  box-sizing: border-box;
`

const GhostInner = styled.div`
  position: relative;
  flex: 1;
  height: 1px;
  border-top: solid 2px ${props => props.theme.token?.colorPrimary};
  box-sizing: border-box;
  &::after{
    content: "";
    position: absolute;
    left: 0px;
    top: -6.5px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    border: solid 2px ${props => props.theme.token?.colorPrimary};
    background-color: ${props => props.theme.token?.colorBgBase};
  }
`

export const SortableTree = memo((
  props: {
    items?: IFlattenedItem[]
  }
) => {
  const { items } = props;

  return (
    <Droppable
      droppableId={CANVS_ID}
      renderGhost={
        (innerRef) => {
          return (
            <Ghost ref={innerRef}><GhostInner /></Ghost>
          )
        }
      }
    >
      {
        (innerRef, snapshot) => {
          return (
            <DropContainer ref={innerRef} className={classNames('menu-drop-container', { over: snapshot?.isDraggingOver })}>
              {
                items?.map((item, index) => {
                  return (<SortableItem key={item.id} item={item} index={index} />)
                })
              }
            </DropContainer>
          )
        }
      }
    </Droppable>

  )
})