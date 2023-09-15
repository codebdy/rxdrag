import { createId } from "@rxdrag/shared";
import { MenuItemResources, MenuItemType } from "../interfaces";

export const menuResources: MenuItemResources = {
  [MenuItemType.text]: {
    type: MenuItemType.text,
    title: "文本",
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        title: "文本"
      }
    }
  },
  [MenuItemType.link]: {
    type: MenuItemType.link,
    title: "链接",
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.link,
        title: "链接"
      }
    }
  }
}