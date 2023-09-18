import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable } from "../../dnd"

const Container = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  margin: 0px 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  flex-shrink: 0;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem,
    index: number
  }
) => {
  const { item, index } = props
  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {
        (innerRef) => {
          return <Container ref={innerRef}>
            {
              item.title
            }
            ({item.id})
          </Container>
        }
      }

    </Draggable>
  )
})