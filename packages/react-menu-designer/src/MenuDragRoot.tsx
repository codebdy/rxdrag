import React, { useCallback, memo } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const MenuDragRoot = memo((
  props: {
    children: React.ReactNode
  }
) => {

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      // if (destination?.droppableId) {
      //   let draggedNode: IMenuNode | undefined;
      //   if (draggableId === COLLAPSE_GROUP_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Group,
      //         title: t("Menu.CollapseGroup"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (draggableId === DIVIDER_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Divider,
      //         title: t("Menu.Divider"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (draggableId === CUSTOMIZED_LINK_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Link,
      //         title: t("Menu.CustomizedLink"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (source.droppableId.startsWith(PAGE_LIST_ID)) {
      //     const page: IPage | undefined = getPage(draggableId);
      //     if (page) {
      //       draggedNode = {
      //         meta: {
      //           uuid: createUuid(),
      //           type: MenuItemType.Item,
      //           title: page.title,
      //           route: { pageUuid: page.uuid },
      //         },
      //         childIds: [],
      //       };
      //     }
      //   } else {
      //     draggedNode = getNode(draggableId);
      //   }

      //   if (draggedNode) {
      //     insertAt(draggedNode, destination?.droppableId, destination.index);
      //   }
      // }
    },
    []
  );


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        props.children
      }
    </DragDropContext>
  )
})

export default MenuDragRoot