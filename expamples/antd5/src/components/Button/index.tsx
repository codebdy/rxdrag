import { Button as AntdButton } from "antd"
import { mapComponent } from "runner/ComponentRender/hocs/mapComponent"

export const Button = mapComponent(AntdButton, { title: 'children' })