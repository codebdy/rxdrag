import { createId } from "@rxdrag/shared";
import { IMenuItem, IMenuItemResource, MenuItemType } from "../interfaces";

export const menuResources: IMenuItemResource[] = [
  {
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        title: "文本"
      }
    },
    isSameSoure: (menuItem: IMenuItem) => {
      return menuItem.type === MenuItemType.text
    }
  },
  {
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.link,
        title: "链接"
      }
    },
    isSameSoure: (menuItem: IMenuItem) => {
      return menuItem.type === MenuItemType.link
    }
  }
]