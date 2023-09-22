import { useCallback } from "react";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { DropTarget, PostionType } from "../types";
import { IMenuItemSchema, IMenuSchema } from "../interfaces/schema";
import { useGetItem } from "./useGetItem";

export function useMoveItem() {
  const [menuSchema, setMenuSchema] = useMenuSchemaState()
  const getItem = useGetItem()

  const move = useCallback((itemSchema: IMenuItemSchema, target: DropTarget) => {
    const itemId = itemSchema.meta.id
    //先删除
    const newSchema: IMenuSchema = {
      rootIds: menuSchema.rootIds.filter(rootId => rootId != itemId),
      items: menuSchema.items.filter(item => item.meta.id !== itemId)
        .map(itm => itm.children?.find(child => child === itemId) ? { ...itm, children: itm.children?.filter(child => child !== itemId) } : itm)
    }
    //添加到根下
    if (target.targetId === null && target.position === PostionType.in) {
      const newItem: IMenuItemSchema = { ...itemSchema, parentId: null }
      newSchema.rootIds = [itemId, ...newSchema.rootIds]
      newSchema.items.push(newItem)
      setMenuSchema(newSchema)
    } else if (target.targetId) {
      //插入子元素
      if (target.position === PostionType.in) {
        //附加父元素
        const newItem: IMenuItemSchema = { ...itemSchema, parentId: target.targetId }
        newSchema.items.push(newItem)
        newSchema.items = newSchema.items.map(item => item.meta.id === target.targetId ? { ...item, children: [itemId, ...item.children || []] } : item)
        setMenuSchema(newSchema)
      } else {//插入兄弟元素后面
        const item = getItem(target.targetId)
        const parent = getItem(item?.parentId)
        //没有父节点，插入根目录
        if (!parent) {
          //删除父元素
          const newItem: IMenuItemSchema = { ...itemSchema, parentId: null }
          newSchema.items.push(newItem)
          const newIds = [...newSchema.rootIds]
          newIds.splice(newIds.indexOf(target.targetId) + 1, 0, itemId)
          newSchema.rootIds = newIds
        } else {
          //附加父元素
          const newItem: IMenuItemSchema = { ...itemSchema, parentId: parent.meta.id }
          newSchema.items.push(newItem)
          //先删除，不知道为什么之前清理干净
          const newIds = parent.children?.filter(child => child !== itemId) || []
          newIds.splice(newIds.indexOf(target.targetId) + 1, 0, itemId)
          newSchema.items = newSchema.items.map(item => item.meta.id === parent.meta.id ? { ...item, children: newIds } : item)
        }
        setMenuSchema(newSchema)
      }

    } else {
      console.error("Item target error")
    }

  }, [getItem, menuSchema.items, menuSchema.rootIds, setMenuSchema])

  return move
}