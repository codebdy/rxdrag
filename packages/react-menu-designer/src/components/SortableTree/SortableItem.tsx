import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const ItemContainer = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token.colorBorder};
  background-color: ${props => props.theme.token.colorBgContainer};
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 8px;
  margin: 4px 0;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem
  }
) => {
  const { item } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ItemContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.title}
    </ItemContainer>
  )
})