import { MenuItemMaterials, MenuItemType } from "../interfaces";

export const menuMaterials: MenuItemMaterials = {
  [MenuItemType.group]: {
    type: MenuItemType.group,
    group: true,
    title: "分组",
  },
  [MenuItemType.link]: {
    type: MenuItemType.link,
    group: false,
    title: "链接",
  }
}