import { createId } from "@rxdrag/shared";
import { IMenuItemResource, MenuItemType, SelectorOption } from "../interfaces";
import { Divider } from "antd";
import { TextSetter } from "./TextSetter";
import { LinkSetter } from "./LinkSetter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultMenuResources: IMenuItemResource<any>[] = [
  {
    id: createId(),
    title: MenuItemType.text,
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.text
    }
  },
  {
    id: createId(),
    title: MenuItemType.link,
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.link
    }
  },
  {
    id: createId(),
    title: MenuItemType.divider,
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.divider
    }
  }
]