import { MenuItemMaterials, MenuItemType } from "../interfaces";

export const menuMaterials: MenuItemMaterials = {
  [MenuItemType.text]: {
    type: MenuItemType.text,
    title: "文本",
  },
  [MenuItemType.link]: {
    type: MenuItemType.link,
    title: "链接",
  }
}