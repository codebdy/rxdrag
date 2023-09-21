import { memo, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { LeftDrawer } from "./LeftDrawer"
import { List } from "antd"
import styled from "styled-components"

const ListItem = styled(List.Item)`
  cursor: pointer;
  padding: 0 16px !important;
  height: 40px;
  display: flex;
  align-items: center;
  &:hover{
    background-color: ${props => props.theme?.token?.colorBorderSecondary};
  }

  &.selected{
    background-color: ${props => props.theme?.token?.colorInfoBgHover};
  }
`

export const MenusDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { title, open, onOpenChange } = props
  const { menuId } = useParams()
  const appFront = useAppFrontend()
  const navigate = useNavigate()

  const handleSelect = useCallback((id: string) => {
    navigate("menu/" + id)
    onOpenChange?.(false)
  }, [navigate, onOpenChange]);

  return (
    <LeftDrawer
      title={title}
      open={open}
      onOpenChange={onOpenChange}
    >
      <List
        bordered={false}
        dataSource={appFront?.menus || []}
        renderItem={(item) => (
          <ListItem
            className={menuId === item.id ? "selected" : "undefined"}
            onClick={() => handleSelect(item.id)}
          >
            {item.title}
          </ListItem>
        )}
      />
    </LeftDrawer>
  )
})