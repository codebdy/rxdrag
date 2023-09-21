import { IMenuItemMeta, IMenuItemResource, MenuItemType, SelectorOption } from "@rxdrag/react-menu-designer"
import { createId } from "@rxdrag/shared"
import { Divider } from "antd"
import { GroupSetter } from "./setters/GroupSetter"
import { LinkSetter } from "./setters/LinkSetter"
import styled from "styled-components"
import { IIconableConfig } from "./types"
import { IconView } from "@rxdrag/react-antd-icons"

const SytleIcon = styled(IconView)`
  margin-right: 16px;
`

export const iconableRender = (item?: IMenuItemMeta<IIconableConfig>) => {
  return <>
    {
      item?.config?.icon &&
      <SytleIcon icon={item?.config?.icon} />
    }
    {
      item?.config?.title
    }
  </>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseMenuResources: IMenuItemResource<any>[] = [
  {
    id: createId(),
    title: "折叠组",
    configSetter: GroupSetter,
    render: iconableRender,
    createMenuItem: () => {
      return {
        id: createId(),
        type: MenuItemType.text,
        config: {
          title: "新建组",
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
    render: iconableRender,
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