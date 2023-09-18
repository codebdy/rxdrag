import classNames from "classnames"
import { memo } from "react"
import styled from "styled-components"
import { CANVS_ID } from "../../consts"
import { Droppable } from "../../dnd"
import { IFlattenedItem } from "../../interfaces/flattened"
import { SortableItem } from "./SortableItem"

const DropContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
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

const Ghost = styled.div`
  display: flex;
  padding: 6px 8px;
  box-sizing: border-box;
  transition: all 0.2s;
`

const GhostInner = styled.div`
  position: relative;
  flex: 1;
  height: 8px;
  background-color: ${props => props.theme.token?.colorPrimary};
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  &::after{
    content: "";
    position: absolute;
    left: 0px;
    top: -4px;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    border: solid 2px ${props => props.theme.token?.colorPrimary};
    background-color: ${props => props.theme.token?.colorBgBase};
  }
`

export const SortableTree = memo((
  props: {
    items?: IFlattenedItem[],
    indentationWidth: number,
  }
) => {
  const { items, indentationWidth } = props;

  return (
    <Droppable
      droppableId={CANVS_ID}
      placeholderOffset={20}
      renderGhost={
        (innerRef, snapshot) => {
          let indentation = 0
          if (snapshot?.delta) {
            indentation = (Math.trunc(snapshot.delta.x / indentationWidth)) * indentationWidth
          }

          return (
            <Ghost ref={innerRef} style={{ paddingLeft: indentation + 8 }}><GhostInner /></Ghost>
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