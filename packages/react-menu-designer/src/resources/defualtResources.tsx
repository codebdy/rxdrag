import { createId } from "@rxdrag/shared";
import { IMenuItem, IMenuItemResource, MenuItemType } from "../interfaces";
import { Divider } from "antd";
import { TextSetter } from "./TextSetter";
import { LinkSetter } from "./LinkSetter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultMenuResources: IMenuItemResource<any>[] = [
  {
    id: createId(),
    title: "文本",
    configSetter: TextSetter,
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        config: {
          title: "新建文本",
        }
      }
    },
    selector: (item?: IMenuItem) => {
      return item?.type === MenuItemType.text
    }
  },
  {
    id: createId(),
    title: "链接",
    configSetter: LinkSetter,
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.link,
        config: {
          title: "新建链接",
        }
      }
    },
    selector: (item?: IMenuItem) => {
      return item?.type === MenuItemType.link
    }
  },
  {
    id: createId(),
    title: "分隔符",
    childless: true,
    render: () => {
      return <Divider style={{ minWidth: 100 }} />
    },
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.divider,
      }
    },
    selector: (item?: IMenuItem) => {
      return item?.type === MenuItemType.divider
    }
  }
]