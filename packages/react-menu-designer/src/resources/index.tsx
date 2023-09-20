import { createId } from "@rxdrag/shared";
import { IMenuItemResource, MenuItemType } from "../interfaces";
import { Divider } from "antd";

export const menuResources: IMenuItemResource[] = [
  {
    name: MenuItemType.text,
    title: "文本",
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        title: "新建文本"
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
        title: "新建链接"
      }
    },
  },
  {
    name: MenuItemType.divider,
    title: "分隔符",
    render: () => {
      return <Divider />
    },
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.divider,
        title: "分隔符"
      }
    },
  }
]