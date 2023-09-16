import { memo } from "react"
import styled from 'styled-components';
import { floatShadow, } from "../../utilities";
import { IFlattenedItem } from "../../interfaces/flattened";
import { Draggable } from "../../dnd";

const Container = styled.div`
  position: relative;
  height: 48px;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
`
const Item = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  user-select: none;
  &.dragging{
    opacity: 0.6;
    background-color: ${props => props.theme.token?.colorBgContainer};
    box-shadow: ${floatShadow};
    z-index: 1;
    pointer-events: none;
    color:${props => props.theme.token?.colorText};
  }
`

export const ResourceItem = memo((
  props: { item: IFlattenedItem, index: number }
) => {
  const { index, item } = props

  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {
        (innerRef) => {
          return <Container ref={innerRef}><Item>
            {
              item?.title
            }
            ({item.id})
          </Item>
          </Container>
        }
      }
    </Draggable>
  )
})