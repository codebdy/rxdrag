import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";

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
  console.log("==>SortableItem", item)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.id}
    </div>
  )
})