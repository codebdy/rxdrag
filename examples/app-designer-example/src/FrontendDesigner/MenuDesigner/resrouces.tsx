import { IMenuItemResource, MenuItemType, SelectorOption } from "@rxdrag/react-menu-designer"
import { createId } from "@rxdrag/shared"
import { Divider } from "antd"
import { TextSetter } from "./setters/TextSetter"
import { LinkSetter } from "./setters/LinkSetter"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseMenuResources: IMenuItemResource<any>[] = [
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.text
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.link
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
    selector: (option?: SelectorOption) => {
      return option?.type === MenuItemType.divider
    }
  }
]