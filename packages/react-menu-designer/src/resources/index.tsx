import { createId } from "@rxdrag/shared";
import { IMenuItemResource, MenuItemType } from "../interfaces";

export const menuResources: IMenuItemResource[] = [
  {
    name: MenuItemType.text,
    title: "文本",
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        title: "文本"
      }
    },
  },
  {
    name: MenuItemType.link,
    title: "链接",
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.link,
        title: "链接"
      }
    },
  }
]