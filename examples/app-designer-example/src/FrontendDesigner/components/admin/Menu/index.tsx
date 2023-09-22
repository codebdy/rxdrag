import { forwardRef, memo, useCallback, useMemo } from "react"
import { Menu as AntdMenu, MenuRef } from "antd"
import styled from "styled-components"
import { ID } from "@rxdrag/shared"
import { useMenu } from "../../../../hooks/useMenu"
import { IMenuItem } from "@rxdrag/react-menu-designer"
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems"
import { IconView } from "@rxdrag/react-antd-icons"
import { IIconableConfig } from "../../../NavigationDesigner/types"

const PlaceHolder = styled.div`
  min-height: 100px;
  &.dark{
    color: white;
  }
`

export type MenuProps = {
  theme?: 'dark' | 'light',
  menuId?: ID
}

export const Menu = memo(forwardRef<MenuRef, MenuProps>((props, ref) => {
  const { menuId, theme = "dark", ...rest } = props;

  const menu = useMenu(menuId)
  const getOneItem = useCallback((item: IMenuItem<IIconableConfig>): ItemType<MenuItemType> => {
    return {
      key: item.id,
      label: item.config?.title,
      icon: item.config?.icon ? <IconView icon={item.config?.icon} /> : undefined,
      children: item.children?.length ? item.children?.map(child => getOneItem(child)) : undefined,
    }
  }, [])

  const items = useMemo(() => {
    return menu?.items?.map(item => getOneItem(item))
  }, [getOneItem, menu?.items])

  return (
    menu?.items?.length
      ? <AntdMenu
        ref={ref}
        theme={theme}
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        {...rest}
      />
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : <PlaceHolder ref={ref as any}
        className={theme}
      >
        Please add menu or menu item
      </PlaceHolder>
  )
}))